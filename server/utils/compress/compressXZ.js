import lzma, { Decompressor } from "lzma-native";
import fs from "fs";
import path from "path";
export function compressXZ(filePath, destinationPath, fileName) {
	if (!fs.existsSync(destinationPath)) {
		fs.mkdirSync(destinationPath, { recursive: true });
	}
	const fileToCompressBuffer = fs.readFileSync(filePath);
	console.log(fileToCompressBuffer);
	lzma.compress(fileToCompressBuffer, 4, function (result) {
		const compressedFilePath = path.join(destinationPath, `${fileName}.xz`);

		if (result instanceof Buffer) {
			fs.writeFileSync(compressedFilePath, result);
			console.log("Compression successful.");
		} else {
			console.error("Compression failed.");
		}
	});
}
