import lzma from "lzma-native";
import fs from "fs";
import path from "path";
export async function compressXZ(filePath, destinationPath, fileName) {
	if (!fs.existsSync(destinationPath)) {
		fs.mkdirSync(destinationPath, { recursive: true });
	}
	const fileToCompressBuffer = fs.readFileSync(filePath);
	// console.log(fileToCompressBuffer);
	return new Promise((resolve, reject) => {
		lzma.compress(fileToCompressBuffer, 4, function (result, err) {
			const compressedFilePath = path.join(destinationPath, `${fileName}.xz`);

			if (result instanceof Buffer) {
				fs.writeFileSync(compressedFilePath, result);
				resolve();
				console.log("Compression successful.");
			}
			if (err) {
				reject(err);
				console.error("Compression failed.");
			}
		});
	});
}
