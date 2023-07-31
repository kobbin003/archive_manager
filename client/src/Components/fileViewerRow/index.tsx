import React, { MouseEvent } from "react";
import { ExtractedFile } from "../uploader/types";
import { dateFormatter } from "../../utils/dateformatter";
import { Link } from "react-router-dom";

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
	const handleOnClickDir = () => {
		//TODO: //*!set the directorypath according to url

		const directoryPath = "";
		fetch(`http://localhost:3000/readDirectory/${directoryPath}`)
			.then((res) => res.json())
			.then((result) => {
				console.log(result);
			})
			.catch((err) => {
				console.error(err);
			});
	};
	return (
		<div className="flex flex-row justify-between bg-slate-700 text-zinc-400">
			<div>
				{file.isDir ? (
					<Link
						to={`/files/${file.id}`}
						// onClick={handleOnClickDir}
						className="underline decoration-sky-400"
					>
						{file.file}
					</Link>
				) : (
					<p>{file.file}</p>
				)}
			</div>
			<div>
				<p>
					{file.fileSize.fileSize}&nbsp;
					{file.isDir ? `${file.fileSize} items` : file.fileSize.unit}
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
