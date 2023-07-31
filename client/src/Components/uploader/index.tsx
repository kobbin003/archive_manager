import {
	ChangeEvent,
	Dispatch,
	FC,
	MouseEvent,
	ReactNode,
	SetStateAction,
	useState,
} from "react";
import FileViewer from "../fileViewer";
import { ReceivedFile } from "./types";
import { Link } from "react-router-dom";

interface UploaderProps {
	setReceivedFile: Dispatch<SetStateAction<ReceivedFile | undefined>>;
}

const Uploader: FC<UploaderProps> = ({ setReceivedFile }) => {
	//* selectedfile from input.
	const [selectedFile, setSelectedFile] = useState<File>();

	//* disable/enable the upload button.
	const [isDisabled, setIsDisabled] = useState(true);

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setSelectedFile(e.target.files[0]);
		}
	};
	const handleChooseFileClick = () => {
		//* remove disabled on upload button
		setIsDisabled(false);
		//* remove any sessionId stored in localStorage
		const storedSessionId = localStorage.getItem("sessionId");
		if (storedSessionId) {
			const options = { method: "DELETE" };
			//* delete the previous sessionFolder in the server
			fetch(`http://localhost:3000/resetSession/${storedSessionId}`, options)
				.then((res) => res.json())
				.then((result) => console.log(result))
				.catch((err) => {
					console.error(err);
				});
			localStorage.removeItem("sessionId");
		}
	};
	const handleFileUploadClick = (e: MouseEvent<HTMLButtonElement>) => {
		const uploadOptions = {
			method: "POST",
			body: selectedFile, // selectedFile is the uploaded file by the user
		};
		fetch(`http://localhost:3000/upload`, uploadOptions)
			.then((res) => res.json())
			.then((result: ReceivedFile) => {
				setReceivedFile(result);
				console.log("recieved file", result);
				//* set the recieved sessionId in localStorage.
				const latestSessionId = result.sessionId;
				localStorage.setItem("sessionId", latestSessionId);
				//* mute the upload button
				setIsDisabled(true);
				console.log("upload-isdisabled", isDisabled);
			})
			.catch((err) => {
				console.error(err);
				localStorage.removeItem("sessionId"); //* since sometimes undefined gets set.
			});
	};
	return (
		<div>
			<div>
				<input
					type="file"
					onChange={handleFileChange}
					onClick={handleChooseFileClick}
				/>
				<button
					onClick={handleFileUploadClick}
					disabled={isDisabled}
				>
					<Link to={"/files"}>upload</Link>
				</button>
			</div>
		</div>
	);
};
export default Uploader;
//
