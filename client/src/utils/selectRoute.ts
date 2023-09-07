import { paramsStringToArray } from "./paramsStringToArray";

export const selectRoute = (str: string, currentSegment: string) => {
	const segmentArray = paramsStringToArray(str);
	const indexOfCurrentSegment = segmentArray.findIndex(
		(seg) => seg == currentSegment
	);
	const slicedArray = segmentArray.slice(0, indexOfCurrentSegment + 1);
	return slicedArray.join("/");
};
