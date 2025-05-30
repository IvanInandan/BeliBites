import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

// Import Mantine UI
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <MantineProvider theme={{ primaryColor: "red" }} defaultColorScheme="dark">
      <App />
    </MantineProvider>
  </Router>
);
