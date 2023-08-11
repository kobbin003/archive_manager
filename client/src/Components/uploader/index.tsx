import {
	ChangeEvent,
	Dispatch,
	FC,
	MouseEvent,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from "react";
import { ReceivedFile } from "./types";
import { Link, useNavigate } from "react-router-dom";

interface UploaderProps {
	setReceivedFile: Dispatch<SetStateAction<ReceivedFile | undefined>>;
}

const Uploader: FC<UploaderProps> = ({ setReceivedFile }) => {
	const navigate = useNavigate();
	//*
	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			// setSelectedFile(e.target.files[0]);
			const selectedFile = e.target.files[0];
			console.log("upload clicked", selectedFile);
			const uploadOptions = {
				method: "POST",
				body: selectedFile, // selectedFile is the uploaded file by the user
			};
			fetch(`http://localhost:3000/upload`, uploadOptions)
				.then((res) => res.json())
				.then((result: ReceivedFile) => {
					setReceivedFile(result);
					// console.log("recieved file", result);
					//* set the recieved sessionId in localStorage.
					const latestSessionId = result.sessionId;
					localStorage.setItem("sessionId", latestSessionId);
					// window.location.href = "/view/files";
					navigate("/view/files");
				})
				.catch((err) => {
					console.error(err);
					localStorage.removeItem("sessionId"); //* since sometimes undefined gets set.
				});
		}
	};
	const handleChooseFileClick = (e: MouseEvent<HTMLInputElement>) => {
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
	return (
		<div>
			<div>
				<input
					id="file"
					type="file"
					onChange={handleFileChange}
					onClick={handleChooseFileClick}
					className="hidden"
				/>
				<label
					htmlFor="file"
					className="cursor-pointer border-2 p-2 rounded-md"
				>
					choose your file
				</label>
			</div>
		</div>
	);
};
export default Uploader;
//
