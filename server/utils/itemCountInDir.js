import fs from "fs";
export const itemCountInDir = async (pathname) => {
	const files = await fs.promises.readdir(pathname);
	let itemCount = 0;
	files.forEach((file) => itemCount++);
	return itemCount;
};
