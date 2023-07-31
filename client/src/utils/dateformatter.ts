export const dateFormatter = (dateString: string) => {
	const date = new Date(dateString);
	const day = date.getDay().toString().padStart(2, "0");
	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const monthNumber = date.getMonth();
	const month = monthNames[monthNumber];
	const year = date.getFullYear();
	const hour = date.getHours().toString().padStart(2, "0");
	const min = date.getMinutes().toString().padStart(2, "0");
	return `${day} ${month} ${year}, ${hour}:${min}`;
};
