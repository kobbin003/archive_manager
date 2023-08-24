import lzma, { Decompressor } from "lzma-native";
import fs from "fs";
import path from "path";
/**
 *
 * typically an XZ file holds only one compressed item.
 * Unlike some other archive formats like ZIP, which can contain multiple files and directories
 * The XZ format is primarily designed for compressing a single stream of data.
 * It doesn't inherently support multiple items or directories like some other archive formats.
 * If you need to work with multiple files or directories,
 * you might need to use a different archive format like ZIP or TAR,
 * which are designed to handle collections of files and directories.
 */
export default async function extractXZ(filePath, destinationPath) {
	if (!fs.existsSync(destinationPath)) {
		fs.mkdirSync(destinationPath, { recursive: true });
	}
	const filePathContentBuffer = fs.readFileSync(filePath);
	return new Promise((resolve, reject) => {
		lzma.decompress(filePathContentBuffer, (decompressedData, err) => {
			if (err) {
				console.log("XZ-Error", err);
				reject(err);
			}
			const webpFileName = "image.webp";
			const webpFilePath = path.join(destinationPath, webpFileName);

			fs.writeFileSync(webpFilePath, decompressedData);
			// console.log("WebP file extracted:", webpFilePath);
			resolve();
		});
	});
}
//* This code uses callbacks within the lzma.decompress function.
//* In the 2nd code(code muted below) you're returning promises from within those callbacks.
//* these return statements "within the callbacks" don't affect the outer async function.
//* The outer async function(extractXZ) will still resolve with undefined(SINCE no return statement)
//* because it doesn't wait for the callbacks to complete.

//* In the 1st code (above and working ), the decompress method is carried out
//* within the new promise that is returned, and the outer async function (extractXZ)
//* does not returns untill resolve() or reject().

// export default async function extractXZ(filePath, destinationPath) {
// 	if (!fs.existsSync(destinationPath)) {
// 		fs.mkdirSync(destinationPath, { recursive: true });
// 	}
// 	const filePathContentBuffer = fs.readFileSync(filePath);
// 	lzma.decompress(filePathContentBuffer, (decompressedData, err) => {
// 		const webpFileName = "image.webp";
// 		const webpFilePath = path.join(destinationPath, webpFileName);

// 		fs.writeFileSync(webpFilePath, decompressedData);
// 		if (decompressedData) {
// 			return;
// 		}
// 		if (err) {
// 			return Promise.reject(err);
// 		}
// 	});
// }
