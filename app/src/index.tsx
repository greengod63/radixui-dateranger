import React from "react";
import ReactDOM from "react-dom/client";
import App from "./ui/app/App";

const main = async () => {
  const root = ReactDOM.createRoot(document.getElementById("main"));
  root.render(<App />);
};

main();
