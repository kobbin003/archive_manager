import { useOutletContext } from "react-router-dom";
interface CompressedFileType {
	sessionId: string;
	compressedFile: { file: string; uploadFileName: string; fileType: string };
	action: string;
}
const CompressedFileView = () => {
	const context: CompressedFileType[] = useOutletContext();
	const { compressedFile, sessionId, action } = context[0];

	const downloadURL = `http://localhost:3000/download/compress/${compressedFile.fileType}?sessionId=${sessionId}`;

	console.log("context", action);
	return (
		<div className="flex-col w-3/4">
			<p className=" text-sm flex items-center p-3">
				Uploaded File&nbsp;: &nbsp;
				{action == "compressFolder" ? (
					<img
						src="/public/icons/folder.svg"
						alt=""
						height={25}
						width={25}
						className=" rounded-sm"
					/>
				) : (
					<img
						src="/public/icons/file.svg"
						alt=""
						height={25}
						width={25}
						className=" rounded-sm"
					/>
				)}
				&nbsp;
				<span className="text-green-400">{compressedFile.uploadFileName}</span>
				{action == "compressFolder" && <span>/</span>}
			</p>
			<div className="flex  justify-center bg-slate-900 p-3">
				<p className="flex-1 pl-2">{compressedFile.file}</p>

				<a
					href={downloadURL}
					target="_blank"
				>
					<button className="bg-green-600 h-6 flex items-center px-1 hover:scale-105 shadow shadow-black">
						{/* <button className="flex h-8 hover:after:content-['download'] hover:after:text-xs hover:after:absolute hover:after:border-2 hover:after:border-gray-300/50 hover:after:bg-slate-200/20 after:translate-x-1 after:translate-y-1"> */}
						<img
							src="/public/icons/download.svg"
							height={25}
							width={25}
							className=" "
						/>
						<p className="text-white pl-1">Save</p>
					</button>
				</a>
			</div>
		</div>
	);
};

export default CompressedFileView;
