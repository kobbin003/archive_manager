export interface ReceivedFile {
	sessionId: string;
	extractedFiles: ExtractedFile[];
}
export interface ReceivedFileRoot {
	sessionId: string;
	extractedFiles: ExtractedFile[];
}
export interface ReceivedFileNested {
	sessionId: string;
	extractedFiles: ExtractedFile[];
	parentFolderTree: string;
}
export interface ExtractedFile {
	id: string;
	file: string;
	isDir: boolean;
	fileSize: { fileSize: number; unit: string };
	lastModified: string;
	fileType: {
		ext: string;
		mime: string;
	};
}
