// import _7z from "7zip-min";
// import fs from "fs";
// import path from "path";
// /**
//  * 7zip-min :
//  * 7z
//  * zip
//  * gzip
//  * bzip2
//  * tar.bz
//  * tar
//  */

// export function extract7zMin(filePath, destinationPath) {
// 	console.log("7min working");
// 	/** check if the "destination" folder exists or not
// 	 * IF not, create the "destination" folder
// 	 */
// 	if (!fs.existsSync(destinationPath)) {
// 		fs.mkdirSync(destinationPath, { recursive: true });
// 	}
// 	_7z.unpack(filePath, destinationPath, (err) => {
// 		console.log("error", err);
// 	});
// }

import fs from "fs";
import _7z from "7zip-min";

export async function extract7zMin(filePath, destinationPath) {
	// console.log("7min working");

	if (!fs.existsSync(destinationPath)) {
		fs.mkdirSync(destinationPath, { recursive: true });
	}

	return new Promise((resolve, reject) => {
		_7z.unpack(filePath, destinationPath, (err) => {
			if (err) {
				console.error("error", err);
				reject(err);
			} else {
				resolve();
			}
		});
	});
}
