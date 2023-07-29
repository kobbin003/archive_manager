import useUploadFile from "@/hooks/useUploadFile";
import React, { memo, useState } from "react";
import FileViewerRow from "../fileViewerRow";
import { ReceivedFile } from "../uploader/types";

const FileViewer = memo(({ file }: { file: ReceivedFile }) => {
	// useUploadFile(file);
	// console.log("fileViewer", file);
	return (
		<div className="flex-col">
			<div className="flex flex-row">
				<div>Name</div>
				<div>Size</div>
				<div>Type</div>
				<div>Modified</div>
			</div>
			<>
				{file.extractedFiles.map((item) => (
					<FileViewerRow
						file={item}
						key={item.id}
						sessionId={file.sessionId}
					/>
				))}
			</>
		</div>
	);
});

export default FileViewer;
