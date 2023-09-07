import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";
import { fileSizeConverter } from "./fileSizeConverter.js";
import { fileTypeFromFile } from "file-type";
import { itemCountInDir } from "./itemCountInDir.js";
import { calcDirSize } from "./calcDirSize.js";
//* async function :
export const readDirectory = async (dirPath, callback) => {
	try {
		const files = await fs.promises.readdir(dirPath);
		let items = [];
		for (const file of files) {
			let isDir = false;
			const filePath = path.join(dirPath, file);
			const stat = await fs.promises.stat(filePath);
			const fileSize = stat.size;
			const lastModified = stat.ctime;
			let fileType;
			let dirItemCount;
			let dirSize;
			if (stat.isDirectory()) {
				isDir = true;
				dirSize = await calcDirSize(filePath);
				dirItemCount = await itemCountInDir(filePath);
			} else if (stat.isFile()) {
				try {
					fileType = await fileTypeFromFile(filePath);
					if (fileType == undefined) {
						fileType = { ext: "", mime: "" };
					}
				} catch (error) {
					console.log("error", error);
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
				fileSize: isDir
					? { ...fileSizeConverter(dirSize), items: dirItemCount }
					: fileSizeConverter(fileSize),
				lastModified,
				fileType: isDir ? { ext: "Folder", mime: "Folder" } : fileType,
			});
		}
		// * although both works better to return than use callback, because :
		// * 1. The use of callbacks is more common in traditional asynchronous functions
		// * 2. With async/await, you can simplify asynchronous code and avoid the callback hell by using the await keyword to wait for the result of a Promise.
		// * 3. So, can handle the result in a more synchronous-style manner.
		return { data: items };
	} catch (error) {
		return { error: { message: "file Not found" } };
	}
};
