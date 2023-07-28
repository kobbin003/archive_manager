import express from "express";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { extractRarArchive } from "./utils/extractRar.js";
import path from "path";
import session from "express-session";
import cors from "cors";
import { createExtractorFromData } from "node-unrar-js";
import { readExtractedDir } from "./utils/readExtractedDir.js";

const app = express();
app.use(cors({ origin: "http://localhost:3001" }));
console.log(path.join("hi", "bye"));
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
// const __dirname = path.dirname(".");
const __filename = new URL(import.meta.url).pathname;
export const __dirname = path.dirname(__filename);
app.get("/", (req, res) => {
	// Access and modify session data
	req.session.views = req.session.views ? req.session.views + 1 : 1;

	// res.send(
	// 	`Hello! You(${req.session.id}) have visited this page ${req.session.views} times.`
	// );
	res.send({ id: req.session.id });
});

app.post("/upload", async (req, res) => {
	const uploadSession = req.session.id;
	const uploadDir = path.join(__dirname, uploadSession, "uploads");
	try {
		//* use promise to wait for directory to be created
		//* OR
		//* use mkdirSync
		await fs.promises.mkdir(uploadDir, { recursive: true });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Failed to create directory" });
	}
	const filePath = path.join(uploadDir, "uploaded.rar");
	//* create a writestream to create a file
	const fileStream = fs.createWriteStream(filePath, {
		encoding: "binary",
	});
	//* Pipe the request stream to the writestream
	req.pipe(fileStream);
	//* Wait for the file stream to finish writing
	await new Promise((resolve, reject) => {
		fileStream.on("finish", resolve);
		fileStream.on("error", reject);
	});

	console.log("File write completed.");

	//* extract the rar file & place it in 'uniqueDirPath'
	const extractRarPath = path.join(__dirname, uploadSession, "extracts");
	await extractRarArchive(filePath, extractRarPath);

	//* read the extractedDir (ASYNC - AWAIT)
	const extractedFiles = await readExtractedDir(extractRarPath);
	//  send the upload session to the user
	res.json({ sessionId: uploadSession, extractedFiles });

	//* read the extractedDir (ASYNC -  then())
	// readExtractedDir(extractRarPath).then((extractedFiles) =>
	// 	//* send the upload session to the user
	// 	res.json({ sessionId: uploadSession, extractedFiles })
	// );

	//* read the extractedDir ( CALLBACK : works for both async and non-async function )
	// readExtractedDir(extractRarPath, (extractedFiles) =>
	// 	res.json({ sessionId: uploadSession, extractedFiles })
	// );
});
app.post("/createFile", (req, res) => {
	//* JUST A DEMO ROUTE TO PRACTICE CREATING FILE FROM STREAMS
	console.log("/file");

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

const uniqueDirPath = `./dir_${uuidv4()}`;

//* use resetSession route to clean up folder i.e session  Folder
app.get("/resetSession/:id", (req, res) => {
	const sessionId = req.params.id;
	// Destroy the session to reset the visit count
	req.session.destroy(() => {
		fs.rmSync(sessionId, { recursive: true });

		res.send("Session Dorectory has been deleted.");
	});
});
//* API to download individual item
// app.get("/download/:id", async (req, res) => {
// 	const id = req.params.id;
// 	const queryPath = req.query.path;

// 	const filteredFile = items && items.filter((item) => item.id == id);
// 	const fileName = filteredFile[0].item;
// 	const filePath = queryPath
// 		? path.join(uniqueDirPath, queryPath, fileName)
// 		: path.join(uniqueDirPath, fileName);
// 	console.log("filePath", fileName, filePath);
// 	res.download(filePath, fileName, (err) => {
// 		if (err) {
// 			res.send("error");
// 			console.error(err);
// 		}
// 	});
// });
app.listen(3000, () => console.log("server running at 3000"));
