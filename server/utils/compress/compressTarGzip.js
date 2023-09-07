// import _7z from "7zip-min";
// import fs from "fs";
// import path from "path";
// import { compress7zMin } from "./compress7zMin.js";

/** for compressed tar files viz TAR.BZ2, TAR.XZ */
/** ONLY works with files */
// export async function compressTarGz(filePath, destinationPath, fileName) {
// 	/** check if the "destination" folder exists or not
// 	 * IF not, create the "destination" folder
// 	 */
// 	if (!fs.existsSync(destinationPath)) {
// 		fs.mkdirSync(destinationPath, { recursive: true });
// 	}
// 	// create a temp folder to store the compressed tar file
// 	const tempCompressedTarFolder = path.join(
// 		destinationPath,
// 		"..",
// 		"tempCompdTar"
// 	);
// 	if (!fs.existsSync(tempCompressedTarFolder)) {
// 		fs.mkdirSync(tempCompressedTarFolder, { recursive: true });
// 	}

// 	await compress7zMin(filePath, tempCompressedTarFolder, fileName, "tar");

// 	// now compress the tar file to gzip type:
// 	await compress7zMin(filePath, destinationPath, fileName, "gzip");
// }

/** This only works for files */
import tar from "tar";
import fs from "fs";
import path from "path";

export const compressTarGz = (filePath, destinationPath, fileName) => {
	if (!fs.existsSync(destinationPath)) {
		fs.mkdirSync(destinationPath, { recursive: true });
	}
	// directory of the file
	const filePathDir = path.dirname(filePath);

	// content of the dir
	//* we cannot use fs.readFile
	//* Because "read below"
	const filesToCompress = fs.readdirSync(filePathDir);
	console.log(filesToCompress);
	tar
		.c(
			{
				gzip: true,
				file: `${destinationPath}/${fileName}.tar.gz`,
				cwd: filePathDir,
			},
			filesToCompress
		)
		.then((_) => console.log("file has been compressed"));
};

// //* The fs.readFileSync function reads the content of a file
// //* synchronously, returning the file content as a buffer.
// //* However, the tar.c() function expects an array of file paths
// //* or a stream to compress. You should use the fs.readdirSync
// //* function to get the list of files in the directory and then
// //* pass those file paths to the tar.c() function.
