import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import CacheSlice from "./CacheSlice";
import showSearchSuggestionsSlice from "./showSearchSuggestionsSlice";
import chatSlice from "./chatSlice";

const store = configureStore({
  reducer: {
    app: appSlice,
    searchSuggestionCache: CacheSlice,
    showSearchSuggestions: showSearchSuggestionsSlice,
    chat: chatSlice,
  },
});

export default store;
