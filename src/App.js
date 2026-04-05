import "./App.css";
import Body from "./components/Body";
import store from "./utils/store";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import WatchPage from "./components/WatchPage";
import SearchResults from "./components/SearchResults";
import ChannelPage from "./components/ChannelPage";
import ShortsPage from "./components/ShortsPage";
import CategoryPage from "./components/CategoryPage";
import HistoryPage from "./components/HistoryPage";
import WatchLaterPage from "./components/WatchLaterPage";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      { path: "/", element: <MainContainer /> },
      { path: "watch", element: <WatchPage /> },
      { path: "results", element: <SearchResults /> },
      { path: "channel/:channelId", element: <ChannelPage /> },
      { path: "shorts", element: <ShortsPage /> },
      { path: "explore/:slug", element: <CategoryPage /> },
      { path: "history", element: <HistoryPage /> },
      { path: "watch-later", element: <WatchLaterPage /> },
    ],
  },
]);
function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={appRouter}></RouterProvider>
    </Provider>
  );
}

export default App;
