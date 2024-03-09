import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import CartContextProvider from "./contexts/CartContext.jsx";
import { BrowserRouter } from "react-router-dom";
import "./assets/index.scss"
import "./assets/grid.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CartContextProvider>
    <CssBaseline />
    <App />
  </CartContextProvider>
);
