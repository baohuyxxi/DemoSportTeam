import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "./assets/grid.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <CssBaseline />
    <App />
  </>
);
