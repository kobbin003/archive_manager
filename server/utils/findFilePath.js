import fs from "fs";
import path from "path";
export const findFilePath = async (dirToStart, fileName) => {
	try {
		const files = await fs.promises.readdir(dirToStart);
		for (const file of files) {
			const filePath = path.join(dirToStart, file);
			const stat = await fs.promises.stat(filePath);
			// console.log(`${file}`, file);
			if (stat.isFile()) {
				if (file === fileName) {
					return filePath;
				}
			} else if (stat.isDirectory()) {
				const nestedDirToStart = path.join(dirToStart, file);
				const nestedPath = await findFilePath(nestedDirToStart, fileName);
				if (nestedPath) {
					return nestedPath;
				}
			}
		}
	} catch (error) {
		console.log("error", error);
	}
};
