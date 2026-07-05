import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { loadContent } from "./data/loadContent";
import "./index.css";

// Content is fetched (≤3s) before mount so scroll-driven animations measure
// the final text. On failure the bundled defaults render.
loadContent().finally(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
