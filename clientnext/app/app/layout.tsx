"use client";
import Uploader from "@/components/uploader/page";
import { ReceivedFile } from "@/components/uploader/types";
import React, { ReactNode, useState, createContext } from "react";

export const FileContext = createContext<{
	receivedFiles: ReceivedFile | undefined;
}>({
	receivedFiles: undefined,
});
const Layout = ({ children }: { children: ReactNode }) => {
	//* recievedfile from request.
	const [receivedFiles, setReceivedFile] = useState<ReceivedFile>();
	return (
		<div className="bg-sky-950 h-screen w-screen">
			<Uploader setReceivedFile={setReceivedFile} />
			{receivedFiles ? (
				<div className="flex-col">
					<div className="flex flex-row justify-between">
						<div>Name</div>
						<div>Size</div>
						<div>Type</div>
						<div>Modified</div>
						<div>&nbsp;&nbsp; &nbsp;&nbsp;</div>
					</div>
					<FileContext.Provider value={{ receivedFiles }}>
						{children}
					</FileContext.Provider>
				</div>
			) : (
				<p>Upload a file to extract</p>
			)}
		</div>
	);
};

export default Layout;
