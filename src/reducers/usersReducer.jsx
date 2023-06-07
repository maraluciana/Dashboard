const initialState = [
  {
    id: 1,
    name: "Mara Belu",
    location: "Home",
    totalFreeDays: 5,
    remainingFreeDays: 5,
    selectedFreeDays: [],
  },
  {
    id: 2,
    name: "Radu Grigore",
    location: "Office",
    totalFreeDays: 15,
    remainingFreeDays: 15,
    selectedFreeDays: [],
  },
];

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_USERS_DATA":
      return action.payload;
    default:
      return state;
  }
};

export default usersReducer;


