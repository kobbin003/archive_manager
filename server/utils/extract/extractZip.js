import AdmZip from "adm-zip";
import fs from "fs";
import path from "path";
export function extractZip(filePath, destinationPath) {
	const zip = new AdmZip(filePath);
	const zipEntries = zip.getEntries(); /** an array of file records */

	/** check if the "destination" folder exists or not
	 * IF not , create the "destination" folder
	 */
	if (!fs.existsSync(destinationPath)) {
		fs.mkdirSync(destinationPath, { recursive: true });
	}

	/** loop over the contents of zipEntries */
	for (const entry of zipEntries) {
		const file = entry;
		const isDir = file.isDirectory;
		if (!isDir) {
			const fileLocation = file.entryName; // entryName gives the path of file inside the zip file
			const saveFilePath = path.join(destinationPath, fileLocation); // path of the file
			const saveFilePathDir = path.dirname(saveFilePath); // directory where the file is located

			/** check if the "saveFilePathDir" folder exists or not
			 * IF not , create the "saveFilePathDir" folder
			 */
			if (!fs.existsSync(saveFilePathDir)) {
				fs.mkdirSync(saveFilePathDir, { recursive: true });
			}

			/** write the file content in path of the file i.e "saveFilePath" */
			fs.writeFileSync(saveFilePath, file.getData());
		}
	}
}
