import { createRoot } from "react-dom/client";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import "./styles/globals.css";
import { StateContextProvisder } from "./context";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <ThirdwebProvider activeChain="goerli">
    <BrowserRouter>
      <StateContextProvisder>
        <App />
      </StateContextProvisder>
    </BrowserRouter>
  </ThirdwebProvider>
);
