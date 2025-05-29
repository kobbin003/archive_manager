import { useLocation } from "react-router-dom";
import FileViewer from "../../Components/fileViewer";
import { useEffect, useState } from "react";
import { ReceivedFileNested } from "../../Components/uploader/types";
import ErrorComponent from "../../Components/error";
import { SERVER_BASE_URL } from "../../utils/env";

const NestedFolderContent = () => {
	const {
		state: { directoryName },
	} = useLocation();
	const [folderContent, setFolderContent] = useState<
		ReceivedFileNested | "loading"
	>();
	const [theError, setTheError] = useState();

	useEffect(() => {
		const sessionId = localStorage.getItem("sessionId");
		if (sessionId) {
			setFolderContent("loading");
			fetch(
				`${SERVER_BASE_URL}/readDirectory?directoryName=${directoryName}&sessionId=${sessionId}`
			)
				.then((res) => {
					return res.json();
				})
				.then((result) => {
					if (result.data) {
						setFolderContent({
							files: result.data.files,
							sessionId,
							parentFolderTree: result.data.parentFolderTree,
							error: null,
						});
					} else if (result.error) {
						setFolderContent({
							files: null,
							sessionId,
							parentFolderTree: null,
							error: result.error,
						});
					}
				})
				.catch((err) => {
					setTheError(err);
				});
		}
	}, [directoryName]);

	if (theError) return <p>Somthing went wrong. try again..</p>;

	if (folderContent && folderContent !== "loading" && folderContent.error) {
		return <ErrorComponent message={folderContent.error.message} />;
	}
	return (
		<>
			{folderContent ? (
				folderContent == "loading" ? (
					<h1 className="w-full text-center">Loading...</h1>
				) : (
					<FileViewer file={folderContent} />
				)
			) : (
				<></>
			)}
		</>
	);
};

export default NestedFolderContent;
