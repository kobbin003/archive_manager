import { useLocation } from "react-router-dom";
import FileViewer from "../../Components/fileViewer";
import { useEffect, useState } from "react";
import { ReceivedFileNested } from "../../Components/uploader/types";

const NestedFolderContent = () => {
	const {
		state: { directoryName },
	} = useLocation();
	const [folderContent, setFolderContent] = useState<ReceivedFileNested>();
	const [theError, setTheError] = useState();
	useEffect(() => {
		const sessionId = localStorage.getItem("sessionId");
		if (sessionId) {
			fetch(
				`http://localhost:3000/readDirectory?directoryName=${directoryName}&sessionId=${sessionId}`
			)
				.then((res) => res.json())
				.then((result) => {
					// if (id) {
					// console.log(result);
					setFolderContent({
						extractedFiles: result.directoryContent,
						sessionId,
						parentFolderTree: result.parentFolderTree,
					});
					// }
				})
				.catch((err) => {
					// console.error(err);
					setTheError(err);
				});
		}
	}, [directoryName]);
	if (theError) return <p>Somthing went wrong. try again..</p>;
	return (
		<>
			{folderContent ? (
				<>
					<FileViewer
						file={folderContent}
						key={folderContent.parentFolderTree}
					/>
				</>
			) : (
				<p>nada</p>
			)}
		</>
	);
};

export default NestedFolderContent;
