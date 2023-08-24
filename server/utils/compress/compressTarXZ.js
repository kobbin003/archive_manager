import _7z from "7zip-min";
import fs from "fs";
import path from "path";
import { compress7zMin } from "./extract7zMin.js";
import { compressXZ } from "./extractXZ.js";

/** for compressed tar files viz TAR.BZ2, TAR.XZ */

export function compressTarXZ(filePath, destinationPath, fileName) {
	/** check if the "destination" folder exists or not
	 * IF not, create the "destination" folder
	 */
	if (!fs.existsSync(destinationPath)) {
		fs.mkdirSync(destinationPath, { recursive: true });
	}
	// create a temp folder to store the compressed tar file
	const tempCompressedTarFolder = path.join(
		destinationPath,
		"..",
		"tempCompdTar"
	);
	if (!fs.existsSync(tempCompressedTarFolder)) {
		fs.mkdirSync(tempCompressedTarFolder, { recursive: true });
	}
	// _7z.pack(filePath, tempCompressedTarFolder, (err) => {
	// 	console.log("error", err);
	// });
	compress7zMin(filePath, tempCompressedTarFolder, fileName, "tar");

	const compressedTarFilePath = path.join(
		tempCompressedTarFolder,
		`${fileName}.tar`
	);

	// now compress the tar file to xz type:
	compressXZ(compressedTarFilePath, destinationPath, `${fileName}.tar`);
}
