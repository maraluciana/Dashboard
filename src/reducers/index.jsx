import { combineReducers } from "redux";
import currentDateReducer from "./currentDateReducer";
import usersReducer from "./usersReducer";

const rootReducer = combineReducers({
  currentDate: currentDateReducer,
  users: usersReducer,
});

export default rootReducer;