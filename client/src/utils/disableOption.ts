export const disableOption = (optionValue: string, action: string): boolean => {
	if (action == "compress file") {
		if (optionValue == "rar") {
			return true;
		} else return false;
	}
	if (action == "compress folder") {
		if (
			optionValue == "rar" ||
			optionValue == "xz" ||
			optionValue == "gz" ||
			optionValue == "tar.gz"
		) {
			return true;
		} else return false;
	}
	return false;
};
