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
      const updatedState = state[key].map(e => (e.id === id ? (e = { ...e, ...update }) : e));
      state[key] = updatedState;
      return { ...state };
    };
  };
};
