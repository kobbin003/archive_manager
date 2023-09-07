export interface ReceivedFile {
	nameOfFile: string;
	sessionId: string;
	extractedFiles: ExtractedFile[];
}

export interface ReceivedFileRoot {
	nameOfFile: string;
	sessionId: string;
	files: ExtractedFile[] | null;
	error: { message: string } | null;
	action?: string;
}

export interface ReceivedFileNested {
	sessionId: string;
	files: ExtractedFile[] | null;
	error: { message: string } | null;
	parentFolderTree: string | null;
}

export interface ExtractedFile {
	id: string;
	file: string;
	isDir: boolean;
	fileSize: { fileSize: number; unit: string; items?: number };
	lastModified: string;
	fileType: {
		ext: string;
		mime: string;
	};
}

export interface CompressFile {
	file: string;
	type: string;
}
