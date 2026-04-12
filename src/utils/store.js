import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import CacheSlice from "./CacheSlice";
import showSearchSuggestionsSlice from "./showSearchSuggestionsSlice";

const store = configureStore({
  reducer: {
    app: appSlice,
    searchSuggestionCache: CacheSlice,
    showSearchSuggestions: showSearchSuggestionsSlice,
  },
});

export default store;
