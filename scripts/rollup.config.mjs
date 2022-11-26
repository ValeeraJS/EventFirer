import json from "rollup-plugin-json";
import typescript from "rollup-plugin-typescript2";

export default {
	input: "src/index.ts",
	output: [
		{
			file: "build/EventFirer.js",
			format: "umd",
			indent: "\t",
			name: "EventFirer",
			sourcemap: true
		},
		{
			file: "build/EventFirer.module.js",
			format: "es",
			indent: "\t",
			sourcemap: false
		}
	],
	plugins: [
		json(),
		typescript({
			tsconfig: "./tsconfig.json"
		})
	]
};
