import { FC, useState } from "react";
import FileTypeSelector from "../fileTypeSelector";
import FileSelectorInputExtract from "../fileSelectorInput/FileSelectorInputExtract";
import ActionSelector from "../actionSelector/ActionSelector";
import FileSelectorInputCompress from "../fileSelectorInput/FileSelectorInputCompress";

interface UploaderProps {}

const Uploader: FC<UploaderProps> = () => {
	const [typeSelected, setTypeSelected] = useState<string>("");
	const [action, setAction] = useState<
		"extract" | "compressFile" | "compressFolder"
	>("extract");

	return (
		<div className="relative my-4 bg-white/5 flex flex-col md:flex-row gap-1">
			<ActionSelector setAction={setAction} />
			<FileTypeSelector
				setTypeSelected={setTypeSelected}
				action={action}
			/>
			{action == "extract" ? (
				<FileSelectorInputExtract
					typeSelected={typeSelected}
					action={action}
				/>
			) : (
				<FileSelectorInputCompress
					typeSelected={typeSelected}
					action={action}
				/>
			)}
		</div>
	);
};
export default Uploader;
//
