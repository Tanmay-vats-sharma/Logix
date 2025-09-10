import { configureStore } from "@reduxjs/toolkit";
import teamReducer from "./features/teamSlice";
import roundsReducer from "./features/roundsSlice";

export const store = configureStore({
  reducer: {
    team: teamReducer,
    rounds: roundsReducer,
  },
});