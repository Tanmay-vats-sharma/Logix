import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

// Fetch all teams
export const fetchTeams = createAsyncThunk("teams/fetchTeams", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/teams");
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to fetch teams");
    return rejectWithValue(error.response?.data?.message || "Failed to fetch teams");
  }
});

export const deleteTeam = createAsyncThunk("teams/deleteTeam", async (teamId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(`/teams/${teamId}`);
    toast.success("Team deleted successfully");
    return teamId;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to delete team");
    return rejectWithValue(error.response?.data?.message || "Failed to delete team");
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
      })
      .addCase(deleteTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.teams = state.teams.filter(team => team?._id !== action.payload);
      })
      .addCase(deleteTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default teamSlice.reducer;
