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
	const downloadURL = `http://localhost:3000/download/extract/${fileName}?sessionId=${sessionId}`;
	const previewURL = `http://localhost:3000/preview/extract/${fileName}?sessionId=${sessionId}`;
	const column = "text-left p-2 w-fit flex items-center  ";

	return (
		<div className="flex flex-col md:flex-row bg-slate-900 text-white whitespace-nowrap text-xs  w-full mb-1 rounded-sm border-2 border-slate-500">
			{/** file name*/}
			<div className=" text-left p-2 flex flex-1 items-center justify-between overflow-hidden">
				{file.isDir ? (
					<Link
						to={
							parentFolderTree
								? `/view/files/${parentFolderTree}/${file.file}`
								: `/view/files/${file.file}`
						}
						className="underline underline-offset-4 decoration-green-400 flex"
						state={{ directoryName: `${file.file}` }}
					>
						<img
							src="/icons/folder.svg"
							alt=""
							height={25}
							width={25}
							// className="bg-stone-600/40 rounded-sm"
							// className="bg-stone-600/40 rounded-sm"
						/>
						<p className="pl-2 hover:decoration-green-100 hover:scale-105">
							{file.file}
						</p>
					</Link>
				) : (
					<div className="w-full flex  items-center">
						<img src="/icons/file.svg" alt="" height={25} width={25} />
						<p className="flex-1 pl-2 block truncate">
							{/* <p className="flex-1 pl-2 block bg-green-300 max-w-[30%] truncate"> */}
							{file.file}
						</p>
					</div>
				)}
			</div>
			{/** file size bg-slate-400/20*/}
			<div className={`${column}  overflow-hidden`}>
				{file.fileSize.fileSize}&nbsp;{file.fileSize.unit}&nbsp;
				{file.isDir && (
					<span className="italic">
						[&nbsp;
						{file.fileSize.items} {file.fileSize.items == 1 ? "item" : "items"}
						&nbsp;]
					</span>
				)}
			</div>
			{/** file type */}
			{!file.isDir && (
				<div className={`${column} flex-[0.3] overflow-hidden `}>
					<p className="truncate">
						{/* <p className="bg-yellow-300 max-w-[200px] truncate"> */}
						{file.fileType.mime}
					</p>
				</div>
			)}
			{/** modified date */}
			{!file.isDir && (
				<div className={`${column}   overflow-hidden`}>
					<p>{dateFormatter(file.lastModified)}</p>
				</div>
			)}

			{/** preview and save buttons */}
			<div className={`${column}`}>
				{!file.isDir && (
					<div className="flex">
						<a href={previewURL} target="_blank" className="px-1">
							<button className="bg-green-600 flex items-center py-1 px-2 hover:scale-105 shadow shadow-black rounded-sm">
								<img
									src="/icons/preview.svg"
									height={25}
									width={25}
									className=" "
								/>
								<p className="text-white pl-1">Preview</p>
							</button>
						</a>
						<a href={downloadURL} className="px-1">
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
				)}
			</div>
		</div>
	);
};

export default FileViewerRow;
