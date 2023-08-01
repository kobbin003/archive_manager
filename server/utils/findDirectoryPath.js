import fs from "fs";
import path from "path";

// USING PROMISES:
export const findDirectoryPathAsync = async (
	startPath,
	targetDirectoryName,
	callback
) => {
	// read the files from the startpath
	try {
		const files = await fs.promises.readdir(startPath);
		for (const file of files) {
			const filePath = path.join(startPath, file);
			const stat = fs.statSync(filePath);
			if (stat.isDirectory()) {
				if (file === targetDirectoryName) {
					const targetDirectoryPath = filePath;
					return targetDirectoryPath;
				} else {
					const nestedPath = await findDirectoryPathAsync(
						filePath,
						targetDirectoryName
					);
					// const targetDirectoryPath = path.join(nestedPath, targetDirectory);
					return nestedPath;
				}
			}
		}
		// return targetDirectoryPath;
	} catch (error) {
		if (error) throw error;
	}
};
//* ---------------------------------------------------------------------
export const findDirectoryPath = (startPath, targetDirectoryName, callback) => {
	// read the files from the startpath
	fs.readdir(startPath, (err, files) => {
		if (err) throw err;
		// find the directory
		const targetDirectory = files.find((file) => {
			const filePath = path.join(startPath, file);
			const stat = fs.statSync(filePath);
			if (stat.isDirectory()) {
				// targetDirectory = file; if
				// condition 1: file is a directory
				if (file === targetDirectoryName) {
					//condition 2: file === targetDirectoryName
					return true;
				} else {
					// IF condition 2 not satisfied;
					// call the method again with startPath = filePath(line 10)
					return findDirectoryPath(filePath, targetDirectoryName, callback);
				}
			}
		});

		// call the callback function once we get the targetDirectory.
		if (targetDirectory) {
			const targetDirectoryPath = path.join(startPath, targetDirectory);
			callback(targetDirectoryPath);
		}
	});
};
