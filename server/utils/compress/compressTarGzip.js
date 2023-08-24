import tar from "tar";
import fs from "fs";
import path from "path";

export const compressTarGz = (filePath, destinationPath, fileName) => {
	if (!fs.existsSync(destinationPath)) {
		fs.mkdirSync(destinationPath, { recursive: true });
	}
	// directory of the file
	const filePathDir = path.dirname(filePath);
	// content of the dir
	//* we cannot use fs.readFile
	//* Because "read below"
	const filesToCompress = fs.readdirSync(filePathDir);
	console.log(filesToCompress);
	tar
		.c(
			{
				gzip: true,
				file: `${destinationPath}/${fileName}.tar.gz`,
				cwd: filePathDir,
			},
			filesToCompress
		)
		.then((_) => console.log("file has been compressed"));
};

//* The fs.readFileSync function reads the content of a file
//* synchronously, returning the file content as a buffer.
//* However, the tar.c() function expects an array of file paths
//* or a stream to compress. You should use the fs.readdirSync
//* function to get the list of files in the directory and then
//* pass those file paths to the tar.c() function.
