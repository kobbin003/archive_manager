import fs from "fs";
import path from "path";

export const findDirectoryPath = (startPath, targetDirectoryName, callback) => {
	fs.readdir(startPath, (err, files) => {
		if (err) throw err;
		const targetDir = files.find((file) => {
			const filePath = path.join(startPath, file);
			const stat = fs.statSync(filePath);
			if (stat.isDirectory()) {
				if (file === targetDirectoryName) {
					return true;
				} else {
					return findDirectoryPath(filePath, targetDirectoryName, callback);
				}
			}
		});

		if (targetDir) {
			const targetDirPath = path.join(startPath, targetDir);
			callback(targetDirPath);
		}
	});
};
