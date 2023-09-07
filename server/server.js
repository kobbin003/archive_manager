import express from "express";
import fs from "fs";
import path from "path";
import session from "express-session";
import cors from "cors";
import { findDirectoryPathAsync } from "./utils/findDirectoryPath.js";
import { readDirectory } from "./utils/readDirectory.js";
import { chooseExtractMethod } from "./utils/chooseExtractMethod.js";
import formidable from "formidable";
import { chooseCompressMethod } from "./utils/chooseCompressMethod.js";
import { findFilePath } from "./utils/findFilePath.js";

const app = express();
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:3001"] }));

app.use(
	session({
		// It holds the secret key for session
		secret: "Your_Secret_Key",

		// Forces the session to be saved
		// back to the session store
		resave: true,

		// Forces a session that is "uninitialized"
		// to be saved to the store
		saveUninitialized: true,
	})
);

export const __filename = new URL(import.meta.url).pathname;
export const __dirname = path.dirname(__filename);

/** store the file in "upload" folder
 * & extract the file's content in "extract" folder
 * & send the extracted files */
app.post("/upload/extract", async (req, res) => {
	const fileType = req.query.fileType;

	const sessionId = req.session.id;

	const uploadSessionDir = path.join("theFolder", sessionId);

	const uploadDir = path.join(__dirname, uploadSessionDir, "uploads");

	if (!fs.existsSync(uploadDir)) {
		try {
			//* use promise to wait for directory to be created
			//* OR
			//* use mkdirSync
			await fs.promises.mkdir(uploadDir, { recursive: true });
		} catch (error) {
			console.log(error);
			res
				.status(500)
				.json({ sessionId, error: { message: "Internal server Error" } });
		}
	}

	const filePath = path.join(uploadDir, `uploaded.${fileType}`);

	//* create a writestream to create a file
	const writeFileStream = fs.createWriteStream(filePath, {
		encoding: "binary",
	});

	//* Pipe the request stream to the writestream
	req.pipe(writeFileStream);

	//* Wait for the file stream to finish writing
	await new Promise((resolve, reject) => {
		writeFileStream.on("finish", () => {
			resolve();
		});

		writeFileStream.on("error", (error) => {
			// if it fails, send this error:
			res
				.status(500)
				.json({ sessionId, error: { message: "Internal Server Error" } });
			reject();
		});
	});

	//* extract the rar file & place it in 'uniqueDirPath'
	const extractPath = path.join(__dirname, uploadSessionDir, "extracts");

	try {
		await chooseExtractMethod(fileType, filePath, extractPath);

		//* read the extractedDir (ASYNC - AWAIT)
		const extractedFiles = await readDirectory(extractPath);

		//*  send the upload session to the user
		if (extractedFiles.data) {
			res.status(200);
		} else if (extractedFiles.error) {
			res.status(500);
		}

		res.json({ sessionId, ...extractedFiles });
	} catch (error) {
		res
			.status(500)
			.send({ sessionId, error: { message: "Internal server error" } });
	}
});

/** store the file in "upload" folder
 * & compress the file's content in "compressed" folder
 * & send the compressed file */
app.post("/upload/compress", async (req, res) => {
	const fileType = req.query.fileType;

	const uploadType = req.query.uploadType;

	const sessionId = req.session.id;

	const uploadSessionDir = path.join("theFolder", sessionId);

	const uploadDir = path.join(__dirname, uploadSessionDir, "uploads");

	if (!fs.existsSync(uploadDir)) {
		try {
			//* use promise to wait for directory to be created
			//* OR
			//* use mkdirSync
			await fs.promises.mkdir(uploadDir, { recursive: true });
		} catch (error) {
			console.error(error);
			res
				.status(500)
				.json({ sessionId, error: { message: "Internal server Error" } });
		}
	}

	/* Parse the files uploaded and save it to uploadDir(using formidable) */
	const form = formidable({
		uploadDir,
		keepExtensions: true,
		createDirsFromUploads: uploadType == "compressFolder",
		// Use it to control newFilename.
		filename: (name, ext, part, form) => {
			/**
			 * name: originalFileName
			 * ext: empty
			 * part: details of each files(stream)
			 * form: the form req
			 */
			return part.originalFilename; // Will be joined with options.uploadDir.
		},
	});

	try {
		await form.parse(req);
	} catch (error) {
		console.log("formidable error", error);
		res
			.status(500)
			.json({ sessionId, error: { message: "Internal server Error" } });
	}

	/** compress the file */
	let filePath = path.join(uploadDir);
	const file = fs.readdirSync(filePath);
	filePath = path.join(uploadDir, file[0]);

	const compressDestinationPath = path.join(
		__dirname,
		uploadSessionDir,
		"compressed"
	);

	try {
		await chooseCompressMethod(
			fileType,
			filePath,
			compressDestinationPath,
			"compressedFile"
		);

		/** read the directory where the compressed files are */
		const compressedFiles = fs.readdirSync(compressDestinationPath);

		/** finding the name of the directory */
		const uploadFiles = fs.readdirSync(uploadDir);
		const uploadFileName = uploadFiles[0];

		res.status(200).json({
			sessionId,
			data: { file: compressedFiles[0], uploadFileName, fileType },
		});
	} catch (error) {
		res
			.status(500)
			.json({ sessionId, error: { message: "Internal server Error" } });
	}
});

/** read a directory
 * return: directory content & it's parent directory name
 */
app.get("/readDirectory", async (req, res) => {
	const directoryName = req.query.directoryName;

	const sessionId = req.query.sessionId;

	const startPath = path.join(__dirname, "theFolder", sessionId, "extracts");

	try {
		const dirPath = await findDirectoryPathAsync(startPath, directoryName);

		const startPathLength = startPath.length;

		const parentFolderTree = dirPath.substring(startPathLength + 1); //* "+ 1" because want to get rid of the initial "/"

		const directoryContent = await readDirectory(dirPath);

		if (directoryContent.data) {
			res
				.status(200)
				.send({ data: { files: directoryContent.data, parentFolderTree } });
		} else if (directoryContent.error) {
			res.status(500).send({ data: { message: "Internal Server Error" } });
		}
	} catch (error) {
		res.send({ data: { message: "Internal Server Error" } });
	}
});

/** download compressed files */
app.get("/download/compress/:fileType", async (req, res) => {
	const fileType = req.params.fileType;

	const sessionId = req.query.sessionId;

	const filePath = path.join(
		__dirname,
		"theFolder",
		sessionId,
		"compressed",
		`compressedFile.${fileType}`
	);

	// Set the content-disposition header to trigger the download
	res.setHeader(
		"Content-Disposition",
		`attachment; filename=compressedFile.${fileType}`
	);

	res.download(filePath, (err) => {
		if (err) {
			console.error(err);
			res.status(500).send({ error: { message: "Internal Server Error" } });
		} else {
			res.status(200);
		}
	});
});

/** download extracted files */
app.get("/download/extract/:fileName", async (req, res) => {
	const fileName = req.params.fileName;

	const sessionId = req.query.sessionId;

	const dirPathToStart = path.join(
		__dirname,
		"theFolder",
		sessionId,
		"extracts"
	);

	/**find the file in "extracts" */
	const filePath = await findFilePath(dirPathToStart, fileName);

	/** Set the content-disposition header to trigger the download */
	res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

	res.download(filePath, (err) => {
		if (err) {
			console.error("eror", err);
			res.status(500).send({ error: { message: "Internal Server Error" } });
		}
	});
});

/** preview extracted files */
app.get("/preview/extract/:fileName", async (req, res) => {
	const fileName = req.params.fileName;

	const sessionId = req.query.sessionId;

	const dirPathToStart = path.join(
		__dirname,
		"theFolder",
		sessionId,
		"extracts"
	);

	/**find the file in "extracts" */
	const filePath = await findFilePath(dirPathToStart, fileName);

	/** set the Content-Disposition to preview */
	res.setHeader("Content-Disposition", "inline");

	res.sendFile(filePath, (err) => {
		console.log("file sending error:", err);
		if (err) {
			res.status(500).send({ error: { message: "Internal Server Error" } });
		} else {
			res.status(200);
		}
	});
});

/** use resetSession route to clean up folder i.e session  Folder */
app.delete("/resetSession/:id", (req, res) => {
	const sessionId = req.params.id;

	// Destroy the session to reset the visit count
	const filePath = path.join("theFolder", sessionId);

	if (filePath) {
		req.session.destroy(() => {
			fs.rmSync(filePath, { recursive: true });

			res.status(200).json({ msg: "DELETE SUCCESS" });
		});
	}
});

//* JUST A DEMO ROUTE TO PRACTICE CREATING FILE FROM STREAMS
app.post("/createFile", (req, res) => {
	//* WAY - 1 [creates file from "data" event of req's "on" method]
	let chunks = [];
	req.on("data", (data) => {
		console.log("data", data);
		chunks.push(data);
	});
	req.on("end", () => {
		const payload = Buffer.concat(chunks);
		console.log("payload", payload);
		fs.writeFileSync("frombufferrar.rar", payload);
	});

	//* WAY - 2 [creates file from stream]
	const fileStream = fs.createWriteStream("output.rar", { encoding: "binary" });
	// Pipe the request stream to the file stream
	req.pipe(fileStream);
	// res.download(req.body);
});

//* JUST A DEMO ROUTE TO TRY OUT SESSION
app.get("/sessionTrial", (req, res) => {
	// Access and modify session data
	req.session.views = req.session.views ? req.session.views + 1 : 1;

	res.send(
		`Hello! You(${req.session.id}) have visited this page ${req.session.views} times.`
	);
});
app.listen(3000, () => console.log("server running at 3000"));
