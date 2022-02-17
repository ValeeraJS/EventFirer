import json from "rollup-plugin-json";
import typescript from "rollup-plugin-typescript2";

export default {
	input: "src/index.ts",
	output: [
		{
			file: "build/EventDispatcher.legacy.js",
			format: "umd",
			indent: "\t",
			name: "EventDispatcher",
			sourcemap: true
		},
		{
			file: "build/EventDispatcher.legacy.module.js",
			format: "es",
			indent: "\t",
			sourcemap: false
		}
	],
	plugins: [
		json(),
		typescript({
			tsconfig: "./tsconfig.legacy.json"
		})
	]
};
