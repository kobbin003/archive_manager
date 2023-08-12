import fs from "fs";
import path from "path";
export const calcDirSize = async (dirPath) => {
	const files = await fs.promises.readdir(dirPath);
	let dirSize = 0;
	for (const file of files) {
		const filePath = path.join(dirPath, file);
		const stat = fs.statSync(filePath);
		if (stat.isDirectory()) {
			// const nestedDirPath =
			const nestedDirSize = await calcDirSize(filePath);
			dirSize += nestedDirSize;
		} else if (stat.isFile()) {
			dirSize += stat.size;
		}
	}
	return dirSize;
};
