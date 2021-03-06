import React from "react";
import { createRoot } from "react-dom/client";

import { MantineProvider } from "@mantine/core";

import App from "./src/App";
import "./style.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider
      theme={{ fontFamily: "Roboto", colorScheme: "dark" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <App />
    </MantineProvider>
  </React.StrictMode>
);
