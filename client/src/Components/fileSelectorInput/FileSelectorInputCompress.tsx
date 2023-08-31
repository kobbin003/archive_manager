import {
	ChangeEvent,
	FC,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { RecievedFileContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { ReceivedFile } from "../uploader/types";
declare module "react" {
	interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
		// extends React's HTMLAttributes
		directory?: string;
		webkitdirectory?: string;
		mozdirectory?: string;
	}
}

interface FileSelectorInputCompressProps {
	action: "extract" | "compressFile" | "compressFolder";
	typeSelected: string;
}

const FileSelectorInputCompress: FC<FileSelectorInputCompressProps> = ({
	typeSelected,
	action,
}) => {
	const setReceivedFile = useContext(RecievedFileContext);
	const [selectedFile, setSelectedFile] = useState<FileList>();
	const [showSelecteMessage, setShowSelecteMessage] = useState(false);
	const navigate = useNavigate();
	const chooseFileRef = useRef<HTMLInputElement>(null);

	//* handle file choosing
	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			if (selectedFile && selectedFile != e.target.files) {
				//? if a new file (e.target.files[0]) is selected
				//?"over" an old selected file (selectedFile).
				// setSelectedFile(e.target.files[0]);
				// console.log("filechanged-old");
				// const selectedFile = e.target.files[0];
				setSelectedFile(e.target.files);
			} else {
				//? a new file is selected from fresh
				// console.log("filechanged-new");
				setSelectedFile(e.target.files);
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

	/ conditionally add & remove directory attribute /;
	useEffect(() => {
		const el = chooseFileRef.current as HTMLInputElement;
		if (action === "compressFolder") {
			el.setAttribute("directory", "");
			el.setAttribute("webkitdirectory", "");
			el.setAttribute("mozdirectory", "");
		} else {
			el.removeAttribute("directory");
			el.removeAttribute("webkitdirectory");
			el.removeAttribute("mozdirectory");
		}
	}, [action]);

	/ fetch when file is selected/;
	useEffect(() => {
		const formData = new FormData();

		if (selectedFile instanceof FileList) {
			for (let i = 0; i < selectedFile.length; i++) {
				formData.append(selectedFile[i].name, selectedFile[i]);
			}
		}

		const uploadOptions = {
			method: "POST",
			// body: selectedFile, // selectedFile is the uploaded file by the user
			body: formData, // selectedFile is the uploaded file by the user
		};
		if (selectedFile) {
			// console.log("selectedFile", selectedFile);
			fetch(
				`http://localhost:3000/upload/compress?fileType=${typeSelected}&uploadType=${action}`,
				uploadOptions
			)
				.then((res) => {
					return res.json();
				})
				.then((result: ReceivedFile) => {
					// console.log("received", result);
					if (setReceivedFile) {
						setReceivedFile({ ...result, action });
					}
					// console.log(result);
					// //* set the recieved sessionId in localStorage.
					const latestSessionId = result.sessionId;
					localStorage.setItem("sessionId", latestSessionId);
					navigate("/compress");
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
				accept="*"
				ref={chooseFileRef}
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

export default FileSelectorInputCompress;

/** The FileList object is a collection of File objects, typically obtained
 * from an input element of type file with the multiple attribute set.
 * While you can't directly send a FileList object as the body of an
 * HTTP request, you can iterate through the FileList and append each
 * File to a FormData object for proper uploading. */
