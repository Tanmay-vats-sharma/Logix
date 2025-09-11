import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

// Fetch all teams
export const fetchTeams = createAsyncThunk("teams/fetchTeams", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/teams");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch teams");
  }
});

const teamSlice = createSlice({
  name: "teams",
  initialState: {
    loading: false,
    teams: [],
    event: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.loading = false;
        state.teams = action.payload.teams;
        state.event = action.payload.event;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default teamSlice.reducer;
