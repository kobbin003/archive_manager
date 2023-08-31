import { createExtractorFromFile } from "node-unrar-js";
import fs from "fs";

export async function extractRarArchive(file, destination) {
	try {
		// create the "destination" folder
		fs.mkdir(destination, { recursive: true }, (err) => {
			if (err) throw err;
		});
		// Create the extractor with the file information (returns a promise)
		const extractor = await createExtractorFromFile({
			filepath: file,
			targetPath: destination,
		});

		// Extract the files
		[...extractor.extract().files];
	} catch (err) {
		// May throw UnrarError, see docs
		console.error(err);
	}
}

// Files are put directly into the destination
// The full path of folders are created if they are missing

// extractRarArchive("/path/to/archive.rar", "~/Desktop/files");

// -----------------------------------------------------

// import { createExtractorFromFile } from "node-unrar-js";
// import fs from "fs";

// export async function extractRarArchive(file, destination) {
// 	try {
// 		// create destination folder
// 		fs.mkdir(destination, { recursive: true }, (err) => {
// 			if (err) throw err;
// 		});
// 		// Create the extractor with the file information (returns a promise)
// 		const extractor = await createExtractorFromFile({
// 			filepath: file,
// 			targetPath: destination,
// 		});

// 		// Extract the files
// 		[...extractor.extract().files];
// 	} catch (err) {
// 		// May throw UnrarError, see docs
// 		console.error(err);
// 	}
// }

// // Files are put directly into the destination
// // The full path of folders are created if they are missing

// // extractRarArchive("./sample-1.rar", uniqueDir);
// // extractRarArchive("/path/to/archive.rar", "~/Desktop/files");
