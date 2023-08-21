import tar from "tar";
import fs from "fs";

export const compressTarGz = (filePath, destinationPath, fileName) => {
	if (!fs.existsSync(destinationPath)) {
		fs.mkdirSync(destinationPath, { recursive: true });
	}
	const filesToCompress = fs.readdirSync(filePath);
	tar
		.c(
			{
				gzip: true,
				file: `${destinationPath}/${fileName}.tar.gz`,
				cwd: filePath,
			},
			filesToCompress
		)
		.then((_) => console.log("file has been compressed"));
};

// export const extractTar = (filePath, destinationPath) => {
// 	if (!fs.existsSync(destinationPath)) {
// 		fs.mkdirSync(destinationPath, { recursive: true });
// 	}
// 	tar
// 		.x({ file: filePath, cwd: destinationPath })
// 		.then(() => console.log("tar file has been extracted"));
// };
