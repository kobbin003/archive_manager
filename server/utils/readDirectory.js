import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";
import { fileSizeConverter } from "./fileSizeConverter.js";
// import { v4 as uuidv4 } from "uuid";
import { fileTypeFromFile } from "file-type";

//* async function :
export const readDirectory = async (dirPath, callback) => {
	const files = await fs.promises.readdir(dirPath);
	let items = [];
	for (const file of files) {
		let isDir = false;
		console.log("file-length", file);
		const filePath = path.join(dirPath, file);
		const stat = fs.statSync(filePath);
		const fileSize = stat.size;
		const lastModified = stat.ctime;
		let fileType;

		if (stat.isDirectory()) {
			isDir = true;
			// items.push(true);
		} else if (stat.isFile) {
			// items.push(false);
			// fileType = "type";
			try {
				fileType = await fileTypeFromFile(file);
			} catch (error) {
				fileType = { ext: "", mime: "" };
			}
			if (path.extname(filePath) === ".txt") {
				//* file-type doesn't recognize .txt file
				fileType = { ext: ".txt", mime: "text/plain" };
			}
			isDir = false;
		}
		items.push({
			id: randomUUID(),
			file,
			isDir,
			fileSize: isDir ? file.length : fileSizeConverter(fileSize),
			lastModified,
			fileType: isDir ? { ext: "Folder", mime: "Folder" } : fileType,
		});
	}
	// * although both works better to return than use callback, because :
	// * 1. The use of callbacks is more common in traditional asynchronous functions
	// * 2. With async/await, you can simplify asynchronous code and avoid the callback hell by using the await keyword to wait for the result of a Promise.
	// * 3. So, can handle the result in a more synchronous-style manner.
	return items;
	// callback(items);
};
