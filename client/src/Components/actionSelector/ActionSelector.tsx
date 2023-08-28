import React, {
	ChangeEvent,
	Dispatch,
	FC,
	MouseEvent,
	SetStateAction,
} from "react";
interface ActionSelector {
	setAction: Dispatch<
		SetStateAction<"extract" | "compress file" | "compress folder">
	>;
}
const ActionSelector: FC<ActionSelector> = ({ setAction }) => {
	const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const selectEl = e.currentTarget;
		if (
			selectEl.value == "extract" ||
			selectEl.value == "compress file" ||
			selectEl.value == "compress folder"
		) {
			setAction(selectEl.value);
			// console.log(selectEl.value);
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
				<option value="compress file">Compress File</option>
				<option value="compress folder">Compress Folder</option>
			</select>
		</>
	);
};

export default ActionSelector;
