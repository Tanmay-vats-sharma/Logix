import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import roundsService from '../../services/roundsService';

// Async thunk to fetch all rounds
export const getAllRounds = createAsyncThunk(
  'rounds/getAllRounds',
  async (_, { rejectWithValue }) => {
    try {
      const response = await roundsService.getAllRounds();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const roundsSlice = createSlice({
  name: 'rounds',
  initialState: {
    rounds: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllRounds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllRounds.fulfilled, (state, action) => {
        state.loading = false;
        state.rounds = action.payload;
      })
      .addCase(getAllRounds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default roundsSlice.reducer;