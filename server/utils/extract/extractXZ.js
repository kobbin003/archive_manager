import lzma, { Decompressor } from "lzma-native";
import fs from "fs";
import path from "path";
export default function extractXZ(filePath, destinationPath) {
	if (!fs.existsSync(destinationPath)) {
		fs.mkdirSync(destinationPath, { recursive: true });
	}
	const filePathContentBuffer = fs.readFileSync(filePath);
	lzma.decompress(filePathContentBuffer, (decompressedData) => {
		const webpFileName = "image.webp";
		const webpFilePath = path.join(destinationPath, webpFileName);

		fs.writeFileSync(webpFilePath, decompressedData);
		console.log("WebP file extracted:", webpFilePath);
	});
}

export function compressXZ(filePath, destinationPath) {
	if (!fs.existsSync(destinationPath)) {
		fs.mkdirSync(destinationPath, { recursive: true });
	}
	const fileToCompressBuffer = fs.readFileSync(filePath);
	console.log(fileToCompressBuffer);
	lzma.compress(fileToCompressBuffer, 4, function (result) {
		const compressedFilePath = path.join(destinationPath, "photo.xz");

		if (result instanceof Buffer) {
			fs.writeFileSync(compressedFilePath, result);
			console.log("Compression successful.");
		} else {
			console.error("Compression failed.");
		}
	});
}
