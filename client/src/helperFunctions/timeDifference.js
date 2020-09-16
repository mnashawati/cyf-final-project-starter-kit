const timeDifference = (current, previous) => {
	const ms_Min = 60 * 1000; // milliseconds in a Minute
	const ms_Hour = ms_Min * 60; // milliseconds in an Hour
	const ms_Day = ms_Hour * 24; // milliseconds in a Day
	const ms_Week = ms_Day * 7; // milliseconds in a Week

	const diff = current - previous; //difference between dates.

	return diff < ms_Min
		? `Posted ${Math.round(diff / 1000)} seconds ago`
		: diff < ms_Hour
			? Math.round(diff / ms_Min) == 1
				? `Posted ${Math.round(diff / ms_Min)} minute ago`
				: `Posted ${Math.round(diff / ms_Min)} minutes ago`
			: diff < ms_Day
				? Math.round(diff / ms_Hour) == 1
					? `Posted ${Math.round(diff / ms_Hour)} hour ago`
					: `Posted ${Math.round(diff / ms_Hour)} hours ago`
				: diff < ms_Week
					? Math.round(diff / ms_Day) == 1
						? `Posted ${Math.round(diff / ms_Day)} day ago`
						: `Posted ${Math.round(diff / ms_Day)} days ago`
					: Math.round(diff / ms_Week) == 1
						? `Posted ${Math.round(diff / ms_Week)} week ago`
						: `Posted ${Math.round(diff / ms_Week)} weeks ago`;
};

export default timeDifference;