function isEmptyObject(obj: {}) {
	return (
		obj !== null && typeof obj === "object" && Object.keys(obj).length === 0
	);
}
// console.log(isEmptyObject({ x: "q" }));
export default isEmptyObject;
