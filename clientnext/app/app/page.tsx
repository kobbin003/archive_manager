"use client";
import React, { useContext } from "react";
import { FileContext } from "./layout";
import FileViewer from "@/components/fileViewer";

const Trial = () => {
	const { receivedFiles } = useContext(FileContext);
	console.log(receivedFiles);
	return <>{receivedFiles && <FileViewer file={receivedFiles} />}</>;
};

export default Trial;
