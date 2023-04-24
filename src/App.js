import "./index.css";
import {Provider} from "react-redux"
import Head from "./components/Head";
import Body from "./components/Body";
import store from "./utils/store";

function App() {
  return (
    <>
    <Provider store={store}>
      <div>
        <Head />
        <Body />
      </div>
      </Provider>
    </>
  );
}

export default App;
