import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Set up react-router
import { BrowserRouter as Router } from "react-router-dom";

// Set up global state management
import { Provider } from "react-redux";
import store from "./store";

// Import Mantine UI
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <MantineProvider defaultColorScheme="dark">
        <App />
      </MantineProvider>
    </Router>
  </Provider>
);
