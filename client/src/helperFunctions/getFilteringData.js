const getFilteringData = (arrayOfObjects, objectProperty) => {
	const noRepeatPropValues = [];
	arrayOfObjects.forEach(
		(object) =>
			!noRepeatPropValues.includes(object[objectProperty])
    && noRepeatPropValues.push(object[objectProperty])
	);
	return noRepeatPropValues;
};

export default getFilteringData;