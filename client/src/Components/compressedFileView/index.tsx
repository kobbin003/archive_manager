import { useOutletContext } from "react-router-dom";
import { SERVER_BASE_URL } from "../../utils/env";
interface CompressedFileType {
	sessionId: string;
	files: { file: string; uploadFileName: string; fileType: string };
	action: string;
}
const CompressedFileView = () => {
	const context: CompressedFileType[] = useOutletContext();
	const { files, sessionId, action } = context[0];

	const downloadURL = `${SERVER_BASE_URL}/download/compress/${files.fileType}?sessionId=${sessionId}`;

	return (
		<div className="flex-col w-3/4">
			<p className=" text-sm flex items-center p-3">
				Uploaded File&nbsp;: &nbsp;
				{action == "compressFolder" ? (
					<img
						src="/icons/folder.svg"
						alt=""
						height={25}
						width={25}
						className=" rounded-sm"
					/>
				) : (
					<img
						src="/icons/file.svg"
						alt=""
						height={25}
						width={25}
						className=" rounded-sm"
					/>
				)}
				&nbsp;
				<span className="text-green-400">{files.uploadFileName}</span>
				{action == "compressFolder" && <span>/</span>}
			</p>
			<div className="flex flex-col sm:flex-row  justify-center items-center bg-slate-900 p-3 text-sm border-2 border-slate-500/80 rounded-sm">
				<p className="flex-1 pb-2 sm:pb-0">{files.file}</p>

				<a href={downloadURL}>
					<button className="bg-green-600 flex items-center py-1 px-2 hover:scale-105 shadow shadow-black rounded-sm">
						<img
							src="/icons/download.svg"
							height={25}
							width={25}
							className=" "
						/>
						<p className="text-white pl-1">Download</p>
					</button>
				</a>
			</div>
		</div>
	);
};

export default CompressedFileView;
