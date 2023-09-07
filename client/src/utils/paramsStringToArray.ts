export const paramsStringToArray = (str: string) => {
	const route = str;
	const routeSegments = route.split("/");
	return routeSegments;
};
