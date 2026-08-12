import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CVpage from "./ApplicationPage/ApplicationsBoard.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CVpage />
  </StrictMode>,
);
