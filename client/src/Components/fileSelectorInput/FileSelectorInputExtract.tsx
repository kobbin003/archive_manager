import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { RecievedFileContext } from "../../App";
import { useNavigate } from "react-router-dom";

interface FileSelectorInputExtractProps {
	action: "extract" | "compress";
	typeSelected: string;
}

const FileSelectorInputExtract: FC<FileSelectorInputExtractProps> = ({
	typeSelected,
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
				setSelectedFile(e.target.files[0]);
			} else {
				//? a new file is selected from fresh
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
				.then((result) => {
					if (result.data) {
						setReceivedFile &&
							setReceivedFile({
								nameOfFile: selectedFile.name,
								sessionId: result.sessionId,
								files: result.data,
								error: null,
							});
					} else if (result.error) {
						setReceivedFile &&
							setReceivedFile({
								nameOfFile: selectedFile.name,
								sessionId: result.sessionId,
								files: null,
								error: result.error,
							});
					}
					//* set the recieved sessionId in localStorage.
					const latestSessionId = result.sessionId;
					localStorage.setItem("sessionId", latestSessionId);
					navigate("/view/files");
				})
				.catch(() => {
					localStorage.removeItem("sessionId"); //* since sometimes undefined gets set.
				});
		}
	}, [selectedFile]);

	/ hide the error message when type is selected /;
	useEffect(() => {
		setShowSelecteMessage(false);
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
				}  border-2 rounded-sm p-1 relative px-8 py-4 bg-orange-600 text-lg text-gray-950`}
				onClick={handleOnClickShowMsg}
			>
				choose your file
			</label>
			<p
				className={`${showSelecteMessage ? "block" : "hidden"}
				absolute top-2 left-full text-xs text-red-700 bg-white/15 whitespace-nowrap mx-2 rounded-sm px-1`}
			>
				* please select file type
			</p>
		</>
	);
};

export default FileSelectorInputExtract;
