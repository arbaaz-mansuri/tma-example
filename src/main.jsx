import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { http, createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { polygonAmoy, polygon } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";
import WebApp from "@twa-dev/sdk";

console.log(WebApp, "web app");

WebApp.ready();

const queryClient = new QueryClient();

export const config = createConfig({
  chains: [polygonAmoy, polygon],
  connectors: [metaMask()],
  transports: {
    [polygonAmoy.id]: http(),
    [polygon.id]: http(),
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
