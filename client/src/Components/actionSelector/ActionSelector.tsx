import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
interface ActionSelector {
	setAction: Dispatch<
		SetStateAction<"extract" | "compressFile" | "compressFolder">
	>;
}
const ActionSelector: FC<ActionSelector> = ({ setAction }) => {
	const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const selectEl = e.currentTarget;
		if (
			selectEl.value == "extract" ||
			selectEl.value == "compressFile" ||
			selectEl.value == "compressFolder"
		) {
			setAction(selectEl.value);
		}
	};
	return (
		<>
			<select
				name="actionType"
				id="actionType"
				className="border-2 border-gray-400 rounded-sm p-1 cursor-pointer"
				onChange={handleOnChange}
			>
				<option value="extract">Extract</option>
				<option value="compressFile">Compress File</option>
				<option value="compressFolder">Compress Folder</option>
			</select>
		</>
	);
};

export default ActionSelector;
