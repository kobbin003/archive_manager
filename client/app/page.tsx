import Image from "next/image";
import Uploader from "../Components/uploader/page";
import { useState } from "react";
import { ReceivedFile } from "@/Components/uploader/types";
import FileViewer from "@/Components/fileViewer";

export default function Home() {
	//* recievedfile from request.
	const [receivedFiles, setReceivedFile] = useState<ReceivedFile>();
	//* show/hide the <FileViewer/> component.
	const [showFileViewer, setShowFileViewer] = useState(false);
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<Uploader
				setReceivedFile={setReceivedFile}
				setShowFileViewer={setShowFileViewer}
			/>
			{showFileViewer && receivedFiles && (
				<FileViewer
					file={receivedFiles}
					key={receivedFiles.sessionId}
				/>
			)}
		</main>
	);
}
