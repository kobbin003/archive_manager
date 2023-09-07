import { useOutletContext } from "react-router-dom";
import FileViewer from "../../Components/fileViewer";
import { ReceivedFileRoot } from "../../Components/uploader/types";

const RootFolderContent = () => {
	const [receivedFiles]: ReceivedFileRoot[] = useOutletContext();
	return (
		<div>{receivedFiles.files && <FileViewer file={receivedFiles} />}</div>
	);
};

export default RootFolderContent;
