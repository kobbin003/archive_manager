import { extract7zMin } from "./extract7zMin.js";
import path from "path";
import fs from "fs";

export const extractTarGzip = async (filePath, destinationPath) => {
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
	await extract7zMin(filePath, tempExtractedTarFolder);

	// extract the file from the tar file:
	if (!fs.existsSync(destinationPath)) {
		fs.mkdirSync(destinationPath);
	}
	await extract7zMin(tempExtractedTarFolder, destinationPath);
};
