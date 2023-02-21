import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Application from "./components/Application";

import "./style.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Application />
    </StrictMode>
);
