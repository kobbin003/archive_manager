import { ExtractedFile } from "../uploader/types";
import { dateFormatter } from "../../utils/dateformatter";
import { Link } from "react-router-dom";

const FileViewerRow = ({
	file,
	sessionId,
	parentFolderTree,
}: {
	file: ExtractedFile;
	sessionId: string;
	parentFolderTree?: string;
}) => {
	//* use a's href instead of fetch for download.
	const fileName = file.file;
	const downloadURL = `http://localhost:3000/download/${fileName}?sessionId=${sessionId}`;
	const column = "text-left pl-2 h-full  flex  items-center ";

	return (
		<div className="flex flex-row bg-slate-900 text-white whitespace-nowrap text-xs h-8">
			<div className="w-5/12  text-left pl-2 pr-2 h-full flex  items-center justify-between overflow-hidden">
				{file.isDir ? (
					<Link
						to={
							parentFolderTree
								? `/view/files/${parentFolderTree}/${file.file}`
								: `/view/files/${file.file}`
						}
						className="underline decoration-green-400 flex"
						state={{ directoryName: `${file.file}` }}
					>
						<img
							src="/public/icons/folder.svg"
							alt=""
							height={25}
							width={25}
							className="bg-stone-600/40 rounded-sm"
						/>
						<p className="pl-2 hover:decoration-green-100 hover:scale-105">
							{file.file}
						</p>
					</Link>
				) : (
					<div className="w-full flex justify-between items-center">
						<img
							src="/public/icons/file.svg"
							alt=""
							height={25}
							width={25}
							className="bg-stone-600/40 rounded-sm"
						/>
						<p className="flex-1 pl-2">{file.file}</p>
						{!file.isDir && (
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
						)}
					</div>
				)}
			</div>
			<div className={`${column} w-3/12 bg-slate-400/20 overflow-hidden`}>
				<p>
					{file.fileSize.fileSize}&nbsp;{file.fileSize.unit}&nbsp;
					{file.isDir && (
						<span className="italic">
							[&nbsp;
							{file.fileSize.items}{" "}
							{file.fileSize.items == 1 ? "item" : "items"}
							&nbsp;]
						</span>
					)}
				</p>
			</div>
			<div className={`${column} w-3/12 overflow-hidden`}>
				<p>{file.fileType.mime}</p>
			</div>
			<div className={`${column} w-3/12 bg-slate-400/20 overflow-hidden`}>
				<p>{dateFormatter(file.lastModified)}</p>
			</div>
		</div>
	);
};

export default FileViewerRow;
