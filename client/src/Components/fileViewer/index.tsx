import FileViewerRow from "../fileViewerRow";
import { ReceivedFile } from "../uploader/types";

const FileViewer = ({ file }: { file: ReceivedFile }) => {
	// console.log("fileViewer", file);
	return (
		<>
			{file.extractedFiles.map((item) => (
				<FileViewerRow
					file={item}
					key={item.id}
					sessionId={file.sessionId}
				/>
			))}
		</>
	);
};

export default FileViewer;
