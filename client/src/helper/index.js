// Higher Order Function
// Define key and then takes state object and return opposite boolean
export const toggleState = key => {
  return state => {
    return { [key]: !state[key] };
  };
};

export const updateObjById = key => {
  return (id, update) => {
    return state => {
      console.log(
        `Object is ${key}. Item ID is ${id}. Data to update is ${update}. State is ${state}`
      );
    };
  };
};
