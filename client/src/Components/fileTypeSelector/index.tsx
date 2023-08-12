import React, { ChangeEvent, useState } from "react";

const FileTypeSelector = () => {
	const [selectedValue, setSelectedValue] = useState<string | undefined>(
		"callToAction"
	);
	const handleOnChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
		// console.log(e.currentTarget.value, e.currentTarget.options);
		const currentSelectValue = e.currentTarget.value;
		const optionsCollection = e.currentTarget.options;
		const optionsArray = Array.from(optionsCollection);
		const selectedOption = optionsArray.find(
			(option) => option.value == currentSelectValue
		);
		setSelectedValue(selectedOption?.value);
		// console.log(currentSelectValue, optionsArray, selectedOption);
	};
	return (
		<select
			name="fileType"
			id="fileType"
			onChange={handleOnChangeSelect}
			value={selectedValue}
			className="border border-gray-400 rounded-sm p-1"
		>
			<option
				value="callToAction"
				disabled
				hidden
			>
				Select file type
			</option>
			<option value="rar">rar</option>
			<option value="zip">zip</option>
			<option value="7z">7z</option>
			<option value="tar">tar</option>
			<option value="tar.gz">tar.gz</option>
			<option value="tar.bz2">tar.bz2</option>
			<option value="tar.xz">tar.xz</option>
			<option value="xz">xz</option>
			<option value="dmg">dmg</option>
			<option value="gzip">gzip</option>
			<option value="bzip2">bzip2</option>
			<option value="cab">cab</option>
			<option value="iso">iso</option>
			<option value="jar">jar</option>
		</select>
	);
};

export default FileTypeSelector;
