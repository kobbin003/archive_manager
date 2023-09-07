export const fileSizeConverter = (fileSizeInBytes) => {
	// use: toFixed()
	// to: round numbers to a fixed number of decimals.
	const fileSizeInKB = (fileSizeInBytes / 1024).toFixed(2);
	const fileSizeInMB = (fileSizeInKB / 1024).toFixed(2);
	const fileSizeInGB = (fileSizeInMB / 1024).toFixed(2);

	const fileSize =
		fileSizeInBytes < 100
			? { fileSize: fileSizeInBytes, unit: "bytes" }
			: fileSizeInKB < 1000
			? { fileSize: fileSizeInKB, unit: "kb" }
			: fileSizeInMB < 1000
			? { fileSize: fileSizeInMB, unit: "MB" }
			: { fileSize: fileSizeInGB, unit: "GB" };
	return fileSize;
};
