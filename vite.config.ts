/*
 * @Author: TuXunJia
 * @Date: 2025-06-12 10:32:11
 * @LastEditors: TuXunJia
 * @LastEditTime: 2025-06-12 12:21:29
 */
import { defineConfig } from "vite";

export default defineConfig({
	build: {
		lib: {
			entry: "./lib/index.ts",
			name: "bigdata-utils-vue",
			fileName: "bigdata-utils-vue",
		},
		rollupOptions: {
			external: ["ant-design-vue", "vue", "vue-request"],
			output: {
				globals: {
					"ant-design-vue": "ant-design-vue",
					vue: "vue",
					"vue-request": "vue-request",
				},
			},
		},
	},
});
