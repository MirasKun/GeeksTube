import { createSlice } from "@reduxjs/toolkit";
import { fetchSearchResultsTC } from "../../thunks/spec/video/fetchSearchResults";

const initialState = {
  searchResults: [],
  currentQuery: "",
  loading: false,
  error: null,
};

const searchQuerySlice = createSlice({
  name: "searchQuery",
  initialState,
  reducers: {
    clearSearchResults(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResultsTC.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.searchResults = [];
      })
      .addCase(fetchSearchResultsTC.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload?.items ?? [];
        state.currentQuery = action.payload?.query ?? "";
      })
      .addCase(fetchSearchResultsTC.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearSearchResults } = searchQuerySlice.actions;
export default searchQuerySlice.reducer;
