import { configureStore } from "@reduxjs/toolkit";
import teamReducer from "./features/teamSlice";
export const store = configureStore({
  reducer: {
    team: teamReducer,
  },
});