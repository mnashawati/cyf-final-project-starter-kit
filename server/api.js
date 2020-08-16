
import { Router } from "express";

import { getClient } from "./db";

const router = new Router();

// router.get("/", (_, res, next) => {
// 	const client = getClient();

// 	client.connect((err) => {
// 		if (err) {
// 			return next(err);
// 		}
// 		res.json({ message: "Hello, world!" });
// 		client.close();
// 	});
// });

router.get("/", (_, res, next) => {
	const client = getClient();
	client.connect((err) => {
		if (err) {
			return next(err);
		}
		const db = client.db("feedback-tracker");
		const collection = db.collection("students");
		// const searchObject = {};
		collection
			.find()
			.toArray(function(error, students) {
				res.send(error || students);
				client.close();
			});
	});
});

router.get("/:id", (_, res, next) => {
	const client = getClient();
	client.connect((err) => {
		if (err) {
			return next(err);
		}
		const db = client.db("feedback-tracker");
		const collection = db.collection("students");
		collection
			.find()
			.toArray(function(error, students) {
				res.send(error || students);
				client.close();
			});
	});
});

export default router;
