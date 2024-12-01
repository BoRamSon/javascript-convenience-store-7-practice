export const convertObjArr = (input) => {
  const parseInputToArray = input.split(",");
  const chageObjectArray = parseInputToArray.map((arr) => {
    const [name, quantity] = arr.replace(/\[|\]/g, "").split("-");
    return { name: name, quantity: Number(quantity) };
  });
  return chageObjectArray;
};
