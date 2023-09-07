import {
	ChangeEvent,
	Dispatch,
	FC,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from "react";
import { disableOption } from "../../utils/disableOption";

const fileTypes = [
	"rar",
	"zip",
	"7z",
	"tar",
	"tar.gz",
	"tar.bz2",
	"tar.xz",
	"xz",
	"gz",
	"bz",
];
interface FileTypeSelectorProps {
	setTypeSelected: Dispatch<SetStateAction<string>>;
	action: "extract" | "compressFile" | "compressFolder";
}
const FileTypeSelector: FC<FileTypeSelectorProps> = ({
	setTypeSelected,
	action,
}) => {
	const [selectedValue, setSelectedValue] = useState<string>("callToAction");

	const selectRef = useRef<HTMLSelectElement>(null);

	const handleOnChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
		const currentSelectValue = e.currentTarget.value;
		setSelectedValue(currentSelectValue);
	};

	useEffect(() => {
		if (selectedValue !== "callToAction") {
			setTypeSelected(selectedValue); //? enable the file selector
		}
	}, [selectedValue]);

	useEffect(() => {
		// reset typeSelected when action is changed
		if (selectRef.current?.selectedIndex) {
			const el = selectRef.current as HTMLSelectElement;
			el.selectedIndex = 0;
		}
	}, [action]);

	return (
		<select
			name="fileType"
			id="fileType"
			onChange={handleOnChangeSelect}
			value={selectedValue}
			ref={selectRef}
			className={`border-2 border-gray-400  rounded-sm p-1 cursor-pointer `}
		>
			<option
				value="callToAction"
				disabled
				hidden={true}
				className="bg-orange-300 min-w-max"
			>
				Select type
			</option>
			{fileTypes.map((type) => (
				<option
					value={type}
					key={type}
					disabled={disableOption(type, action)}
				>
					{type}
				</option>
			))}
		</select>
	);
};

export default FileTypeSelector;
