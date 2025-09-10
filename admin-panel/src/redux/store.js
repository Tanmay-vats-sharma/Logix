import { configureStore } from "@reduxjs/toolkit";
import teamReducer from "./features/teamSlice";
import studentReducer from "./features/studentSlice";
export const store = configureStore({
  reducer: {
    team: teamReducer,
    students: studentReducer,
  },
});