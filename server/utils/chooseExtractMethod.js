import { extract7zMin } from "./extract/extract7zMin.js";
import { extractRarArchive } from "./extract/extractRar.js";
import { extractTarGzip } from "./extract/extractTarGzip.js";
import { extractTarXZ } from "./extract/extractTarXZ.js";
import extractXZ from "./extract/extractXZ.js";

export const chooseExtractMethod = async (fileType, filePath, extractPath) => {
	switch (fileType) {
		case "rar":
			await extractRarArchive(filePath, extractPath);
			return;
		case "zip":
			await extract7zMin(filePath, extractPath);
			return;
		case "7z":
			await extract7zMin(filePath, extractPath);
			return;
		case "tar":
			await extract7zMin(filePath, extractPath);
			return;
		case "gz":
			await extract7zMin(filePath, extractPath);
			return;
		case "bz":
			await extract7zMin(filePath, extractPath);
			return;
		case "tar.bz2":
			await extract7zMin(filePath, extractPath);
			return;
		case "tar.gz":
			await extractTarGzip(filePath, extractPath);
			return;
		case "tar.xz":
			await extractTarXZ(filePath, extractPath);
			return;
		case "xz":
			await extractXZ(filePath, extractPath);
			return;

		default:
			return;
	}
};
