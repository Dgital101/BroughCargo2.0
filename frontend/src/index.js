import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./nav.css";
import App from "./App";
import { StoreProvider } from "./Store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode style={{ backgroundColor: "#f5f8fa" }}>
    <StoreProvider>
      <HelmetProvider style={{ backgroundColor: "#f5f8fa" }}>
        {/* <PayPalScriptProvider deferLoading={true}> */}
        <App style={{ backgroundColor: "#f5f8fa" }} />
        {/* </PayPalScriptProvider> */}
      </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>
);
