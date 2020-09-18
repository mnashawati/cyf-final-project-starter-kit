const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { DefinePlugin } = require("webpack");
require("dotenv").config();

module.exports = {
	entry: "./client/src/index.js",
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader?cacheDirectory",
			},
			{
				test: /\.(png|svg|jpe?g|gif)$/,
				loader: "file-loader",
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
		],
	},
	output: {
		publicPath: "/",
	},
	plugins: [
		new HtmlWebpackPlugin({
			favicon: "./client/src/favicon.ico",
			template: "./client/src/index.html",
		}),
		new DefinePlugin({
			"process.env.FIREBASE_KEY": JSON.stringify(process.env.FIREBASE_KEY),
			"process.env.FIREBASE_DOMAIN": JSON.stringify(process.env.FIREBASE_DOMAIN),
			"process.env.FIREBASE_DATABASE": JSON.stringify(process.env.FIREBASE_DATABASE),
			"process.env.FIREBASE_PROJECT_ID": JSON.stringify(process.env.FIREBASE_PROJECT_ID),
			"process.env.FIREBASE_STORAGE_BUCKET": JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
			"process.env.FIREBASE_SENDER_ID": JSON.stringify(process.env.FIREBASE_SENDER_ID),
			"process.env.FIREBASE_APP_ID": JSON.stringify(process.env.FIREBASE_APP_ID),
			"process.env.FIREBASE_MEASUREMENT_ID": JSON.stringify(process.env.FIREBASE_MEASUREMENT_ID),
		}),
	],
};
