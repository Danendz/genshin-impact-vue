const FilterArrays = (objectWithArrays, ObjectToCompare) => {
  return Object.keys(objectWithArrays.value.filter).reduce(
    (resultArray, key) => {
        console.log(resultArray, key)
      return resultArray.filter((element) =>
        objectWithArrays.value.filter[key].includes(element[key])
      );
    },
    [ObjectToCompare.value]
  );
};

export default FilterArrays