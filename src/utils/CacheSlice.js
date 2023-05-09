import { createSlice } from "@reduxjs/toolkit";
const CacheSlice = createSlice({
  name: `searchSuggestionCache`,
  initialState: {
    cache: {},
  },
  reducers: {
    addToCache: (state, action) => {
      const key = Object.keys(action.payload)[0];
      state.cache[key] = action.payload[key];
    },
  },
});

export default CacheSlice.reducer;

export const { addToCache } = CacheSlice.actions;
