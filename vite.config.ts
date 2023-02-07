import { defineConfig } from "vite";
import path = require("path");
import uni from "@dcloudio/vite-plugin-uni";

// https://vitejs.dev/config/
/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig({
	build: {
		sourcemap: true
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src")
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@import "@/styles/global.scss";',
			},
		},
	},
  envDir: "./.env", //这里使用相对路径，绝对路径其实也可以
	plugins: [uni()]
});
