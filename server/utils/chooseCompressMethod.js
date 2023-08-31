import { compress7zMin } from "./compress/compress7zMin.js";
import { compressTarGz } from "./compress/compressTarGzip.js";
import { compressTarXZ } from "./compress/compressTarXZ.js";
import { compressXZ } from "./compress/compressXZ.js";

export const chooseCompressMethod = async (
	fileType,
	filePath,
	compressPath,
	fileName
) => {
	switch (fileType) {
		case "zip":
			await compress7zMin(filePath, compressPath, fileName, "zip");
			return;
		case "7z":
			await compress7zMin(filePath, compressPath, fileName, "7z");
			return;
		case "tar":
			await compress7zMin(filePath, compressPath, fileName, "tar");
			return;
		case "gz":
			await compress7zMin(filePath, compressPath, fileName, "gzip");
			return;
		case "bz":
			await compress7zMin(filePath, compressPath, fileName, "bzip2");
			return;
		case "tar.bz2":
			await compress7zMin(filePath, compressPath, fileName, "tarbzip2");
			return;
		case "tar.gz":
			await compressTarGz(filePath, compressPath, fileName);
			return;
		case "tar.xz":
			await compressTarXZ(filePath, compressPath, fileName);
			return;
		case "xz":
			await compressXZ(filePath, compressPath, fileName);
			return;

		default:
			return;
	}
};
