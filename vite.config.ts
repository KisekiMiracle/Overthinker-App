import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		{
			name: "reload", // via: https://stackoverflow.com/questions/77461040/can-i-get-vite-to-reload-the-browser-on-every-html-change
			configureServer(server) {
				const { ws, watcher } = server;
				watcher.on("change", (file) => {
					if (
						file.endsWith(".tsx") ||
						file.endsWith(".css") ||
						file.endsWith(".ts") ||
						file.endsWith(".md")
					) {
						ws.send({
							type: "full-reload",
						});
					}
				});
			},
		},
	],
});
