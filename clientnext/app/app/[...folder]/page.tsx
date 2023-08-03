"use client";
import { FC, ReactNode } from "react";
interface FolderProps {
	children: ReactNode;
	params: { folder: string };
}
const Folder: FC<FolderProps> = ({ children, params }) => {
	console.log("hiiii", params.folder);
	return (
		<div>
			<div>Folder: {params.folder}</div>
		</div>
	);
};
export default Folder;
