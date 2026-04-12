import { createSlice } from "@reduxjs/toolkit";

const CACHE_MAX = 50;

const CacheSlice = createSlice({
  name: "searchSuggestionCache",
  initialState: {
    cache: {},
  },
  reducers: {
    addToCache: (state, action) => {
      const key = Object.keys(action.payload)[0];
      if (key === undefined) return;
      state.cache[key] = action.payload[key];
      const keys = Object.keys(state.cache);
      if (keys.length > CACHE_MAX) {
        delete state.cache[keys[0]];
      }
    },
  },
});

export default CacheSlice.reducer;

export const { addToCache } = CacheSlice.actions;
