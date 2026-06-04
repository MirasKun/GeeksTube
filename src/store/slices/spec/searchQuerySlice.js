import { createSlice } from "@reduxjs/toolkit";
import { fetchSearchResultsTC } from "../../thunks/spec/fetchSearchResults";

const initialState = {
  searchResults: [],
  nextPageToken: "",
  loading: false,
  error: null,
};

const searchQuerySlice = createSlice({
  name: "searchQuery",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResultsTC.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResultsTC.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload?.items ?? [];
      })
      .addCase(fetchSearchResultsTC.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default searchQuerySlice.reducer;
