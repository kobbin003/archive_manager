import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";
import { fileSizeConverter } from "./fileSizeConverter.js";
// import { v4 as uuidv4 } from "uuid";

export const readExtractedDir = (dirPath, callback) => {
	fs.readdir(dirPath, (err, files) => {
		if (err) throw err;
		let items = [];
		files.map((file) => {
			let isDir = false;
			const filePath = path.join(dirPath, file);
			const stat = fs.statSync(filePath);
			const fileSize = stat.size;
			if (stat.isDirectory()) {
				isDir = true;
			} else if (stat.isFile) {
				isDir = false;
			}
			items.push({
				id: randomUUID(),
				file,
				isDir,
				fileSize: fileSizeConverter(fileSize),
			});
		});

		callback(items);
	});
};
