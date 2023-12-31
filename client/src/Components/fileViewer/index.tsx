import FileViewerRow from "../fileViewerRow";
import { ReceivedFileNested, ReceivedFileRoot } from "../uploader/types";

const FileViewer = ({
	file,
}: {
	file: ReceivedFileRoot | ReceivedFileNested;
}) => {
	return (
		<div className="w-full h-fit">
			{file.files &&
				file.files.map((item) => (
					<FileViewerRow
						file={item}
						key={item.id}
						sessionId={file.sessionId}
						//* typeGuard to check whether type is ...Root or ...Nested
						parentFolderTree={
							"parentFolderTree" in file && file.parentFolderTree
								? file.parentFolderTree
								: undefined
						}
					/>
				))}
		</div>
	);
};

export default FileViewer;
