import _7z from "7zip-min";
import fs from "fs";

export function extract7Zip(filePath, destinationPath) {
	/** check if the "destination" folder exists or not
	 * IF not , create the "destination" folder
	 */
	if (!fs.existsSync(destinationPath)) {
		fs.mkdirSync(destinationPath, { recursive: true });
	}
	_7z.unpack(filePath, destinationPath, (err) => {
		console.log("error", err);
	});
}
