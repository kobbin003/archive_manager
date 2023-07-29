import React, { MouseEvent } from "react";
import { dateFormatter } from "@/utils/dateformatter";
import { ExtractedFile } from "../uploader/types";

const FileViewerRow = ({
	file,
	sessionId,
}: {
	file: ExtractedFile;
	sessionId: string;
}) => {
	//* use a's href instead of fetch for download.
	const fileName = file.file;
	const downloadURL = `http://localhost:3000/download/${fileName}?sessionId=${sessionId}`;

	return (
		<div className="flex flex-row">
			<div>
				<p>{file.file}</p>
			</div>
			<div>
				<p>
					{file.fileSize.fileSize}&nbsp;
					{file.isDir ? "items" : file.fileSize.unit}
				</p>
			</div>
			<div>
				<p>{file.fileType.mime}</p>
			</div>
			<div>
				<p>{dateFormatter(file.lastModified)}</p>
			</div>
			<div>
				<a
					href={downloadURL}
					target="_blank"
				>
					download
				</a>
			</div>
		</div>
	);
};

export default FileViewerRow;
