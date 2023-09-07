import _7z from "7zip-min";
import fs from "fs";
import path from "path";
import { compress7zMin } from "./compress7zMin.js";
import { compressXZ } from "./compressXZ.js";

/** for compressed tar files viz TAR.BZ2, TAR.XZ */

export async function compressTarXZ(filePath, destinationPath, fileName) {
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

	await compress7zMin(filePath, tempCompressedTarFolder, fileName, "tar");

	const compressedTarFilePath = path.join(
		tempCompressedTarFolder,
		`${fileName}.tar`
	);

	// now compress the tar file to xz type:
	await compressXZ(compressedTarFilePath, destinationPath, `${fileName}.tar`);
}
