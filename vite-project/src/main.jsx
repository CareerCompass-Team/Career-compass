import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CVpage from "./CV Page/CvCenter.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CVpage />
  </StrictMode>,
);
