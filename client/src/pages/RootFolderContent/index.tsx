import { useOutletContext } from "react-router-dom";
import FileViewer from "../../Components/fileViewer";

const RootFolderContent = () => {
	const [receivedFiles]: any[] = useOutletContext();
	console.log("extractLayout");
	return <>{receivedFiles && <FileViewer file={receivedFiles} />}</>;
};

export default RootFolderContent;
