import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";
import { fileSizeConverter } from "./fileSizeConverter.js";
// import { v4 as uuidv4 } from "uuid";
import { fileTypeFromFile } from "file-type";

//* async function :
export const readExtractedDir = async (dirPath, callback) => {
	const files = await fs.promises.readdir(dirPath);
	let items = [];
	for (const file of files) {
		let isDir = false;
		const filePath = path.join(dirPath, file);
		const stat = fs.statSync(filePath);
		const fileSize = stat.size;
		const lastModified = stat.ctime;
		const fileType = await fileTypeFromFile(file);
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
			lastModified,
			fileType,
		});
	}
	//* although both works better to return than use callback, because :
	//* 1. The use of callbacks is more common in traditional asynchronous functions
	//* 2. With async/await, you can simplify asynchronous code and avoid the callback hell by using the await keyword to wait for the result of a Promise.
	//* 3. So, can handle the result in a more synchronous-style manner.
	return items;
	// callback(items);
};

//* for..of loop instead of map(cause we have to use await fileTypeFrom)
// export const readExtractedDir = (dirPath, callback) => {
// 	fs.readdir(dirPath, async (err, files) => {
// 		if (err) throw err;
// 		let items = [];
// 		for (const file of files) {
// 			let isDir = false;
// 			const filePath = path.join(dirPath, file);
// 			const stat = fs.statSync(filePath);
// 			const fileSize = stat.size;
// 			const lastModified = stat.ctime;
// 			const fileType = await fileTypeFromFile(file);
// 			if (stat.isDirectory()) {
// 				isDir = true;
// 			} else if (stat.isFile) {
// 				isDir = false;
// 			}
// 			items.push({
// 				id: randomUUID(),
// 				file,
// 				isDir,
// 				fileSize: fileSizeConverter(fileSize),
// 				lastModified,
// 				fileType,
// 			});
// 		}
//		//* only callback will work(since we are inside of readdir callback)
// 		callback(items);
// 	});
// };

//* CAN"T USE await fileTypeFrom,
//* BECAUSE Array.map() does not support asynchronous operations.
// export const readExtractedDir = (dirPath, callback) => {
// 	fs.readdir(dirPath, async (err, files) => {
// 		if (err) throw err;
// 		let items = [];
// 		files.map((file) => {
// 			let isDir = false;
// 			const filePath = path.join(dirPath, file);
// 			const stat = fs.statSync(filePath);
// 			const fileSize = stat.size;
// 			const lastModified = stat.ctime;
// 			// const fileType = fileTypeFromFile(file);
// 			if (stat.isDirectory()) {
// 				isDir = true;
// 			} else if (stat.isFile) {
// 				isDir = false;
// 			}
// 			items.push({
// 				id: randomUUID(),
// 				file,
// 				isDir,
// 				fileSize: fileSizeConverter(fileSize),
// 				lastModified,
// 				fileType,
// 			});
// 		});
// 		//* only callback will work(since we are inside of readdir callback)
// 		callback(items);
// 	});
// };
