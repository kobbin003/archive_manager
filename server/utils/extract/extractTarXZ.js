import extractXZ from "./extractXZ.js";
import path from "path";
import fs from "fs";
import { extract7zMin } from "./extract7zMin.js";
export const extractTarXZ = async (filePath, destinationPath) => {
	// create a temp folder to store the extracted tar file
	const tempExtractedTarFolder = path.join(
		destinationPath,
		"..",
		"tempExtractedTar"
	);
	// store the extracted tar file in temporary folder
	if (!fs.existsSync(tempExtractedTarFolder)) {
		fs.mkdirSync(tempExtractedTarFolder);
	}
	// extract7zMin(filePath, tempExtractedTarFolder);
	await extractXZ(filePath, tempExtractedTarFolder);

	// extract the file from the tar file:
	if (!fs.existsSync(destinationPath)) {
		fs.mkdirSync(destinationPath);
	}
	await extract7zMin(tempExtractedTarFolder, destinationPath);
};
