import _7z from "7zip-min";
import fs from "fs";
import path from "path";
/**
 * 7zip-min :
 * 7z
 * zip
 * gzip
 * bzip2
 * tar.bz
 * tar
 */

export function extract7zMin(filePath, destinationPath) {
	/** check if the "destination" folder exists or not
	 * IF not, create the "destination" folder
	 */
	if (!fs.existsSync(destinationPath)) {
		fs.mkdirSync(destinationPath, { recursive: true });
	}
	_7z.unpack(filePath, destinationPath, (err) => {
		console.log("error", err);
	});
}

export function compress7zMin(filePath, destinationPath, fileName, fileType) {
	/** check if the "destination" folder exists or not
	 * IF not, create the "destination" folder
	 */
	if (!fs.existsSync(destinationPath)) {
		fs.mkdirSync(destinationPath, { recursive: true });
	}
	let ext;

	switch (fileType) {
		case "7z":
			ext = "7z";
			break;
		case "bzip2":
			ext = "bz";
			break;
		case "tarbzip2":
			ext = "tar.bz";
			break;
		case "gzip":
			ext = "gz";
			break;
		case "tar":
			ext = "tar";
			break;

		case "zip":
			ext = "zip";
			break;
		default:
			break;
	}
	// const name = path.join(`${destinationPath}.${ext}`);
	// const name = path.join(destinationPath, `some.7z`);
	const name = path.join(destinationPath, `${fileName}.${ext}`);

	_7z.pack(filePath, name, (err) => {
		console.log("error", err);
	});
}
