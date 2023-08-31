import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { RecievedFileContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { ReceivedFile } from "../uploader/types";

interface FileSelectorInputExtractProps {
	action: "extract" | "compress";
	typeSelected: string;
}

const FileSelectorInputExtract: FC<FileSelectorInputExtractProps> = ({
	typeSelected,
	action,
}) => {
	const setReceivedFile = useContext(RecievedFileContext);
	const [selectedFile, setSelectedFile] = useState<File | undefined>();
	const [showSelecteMessage, setShowSelecteMessage] = useState(false);
	const navigate = useNavigate();

	//* handle file choose
	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			if (selectedFile && selectedFile != e.target.files[0]) {
				//? if a new file (e.target.files[0]) is selected
				//?"over" an old selected file (selectedFile).
				// setSelectedFile(e.target.files[0]);
				// console.log("filechanged-old");
				// const selectedFile = e.target.files[0];
				setSelectedFile(e.target.files[0]);
			} else {
				//? a new file is selected from fresh
				// console.log("filechanged-new");
				setSelectedFile(e.target.files[0]);
				if (setReceivedFile) {
					setReceivedFile("loading");
				}
			}
		}
	};

	//* remove any sessionId stored in localStorage
	const handleChooseFileClick = () => {
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

	//* show type required message
	const handleOnClickShowMsg = () => {
		if (!typeSelected) {
			setShowSelecteMessage(true);
		}
	};

	/ fetch when file is selected/;
	useEffect(() => {
		// console.log("selectedFile", selectedFile);
		const uploadOptions = {
			method: "POST",
			body: selectedFile, // selectedFile is the uploaded file by the user
		};
		if (selectedFile) {
			fetch(
				`http://localhost:3000/upload/extract?fileType=${typeSelected}`,
				uploadOptions
			)
				.then((res) => {
					return res.json();
				})
				.then((result: ReceivedFile) => {
					if (setReceivedFile) {
						setReceivedFile({ ...result, nameOfFile: selectedFile.name });
					} // console.log("recieved file", result);
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
	}, [selectedFile]);

	/ hide the error message when type is selected /;
	useEffect(() => {
		setShowSelecteMessage(false);
		// console.log(typeSelected);
	}, [typeSelected]);
	return (
		<>
			<input
				id="file"
				type="file"
				onChange={handleFileChange}
				onClick={handleChooseFileClick}
				className="hidden relative"
				disabled={!typeSelected}
				accept={`.${typeSelected}`}
			/>
			<label
				htmlFor="file"
				className={`${
					!typeSelected
						? "cursor-default"
						: "cursor-pointer hover:bg-orange-600"
				}  border-0 rounded-sm p-1 relative px-8 py-4 bg-orange-600 text-lg text-gray-950`}
				// style={{ width: "600px" }}
				onClick={handleOnClickShowMsg}
			>
				choose your file
			</label>
			<p
				// className="block absolute top-0 left-full text-xs whitespace-nowrap border-2 border-red-950 mx-2"
				className={`${showSelecteMessage ? "block" : "hidden"}
				absolute top-2 left-full text-xs text-red-700 bg-white/15 whitespace-nowrap mx-2 rounded-sm px-1`}
			>
				* please select file type
			</p>
		</>
	);
};

export default FileSelectorInputExtract;