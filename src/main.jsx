import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

window.addEventListener("DOMContentLoaded", () => {
	const parsedUrl = new URL(window.location);
	const sharedTitle = parsedUrl.searchParams.get("title");
	const sharedText = parsedUrl.searchParams.get("text");

	// Do something with the parsed data
});

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
