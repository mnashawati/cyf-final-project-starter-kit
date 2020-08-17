
import { Router } from "express";

import { getClient } from "./db";


const mongodb = require("mongodb");
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

router.get("/:id", (req, res, next) => {
	const client = getClient();
	client.connect((err) => {
		if (err) {
			return next(err);
		}
		const db = client.db("feedback-tracker");
		const collection = db.collection("students");
		let id;
		const searchedId = req.params.id;

		if (mongodb.ObjectID.isValid(searchedId)){
			id = new mongodb.ObjectID(searchedId);
		} else {
			client.close(); return res.send(400);
		}
		const searchObject = { _id: id };

		collection
			.findOne(searchObject,
				function(error, student) {
					res.send(error || student);
					client.close();
				});
	});
});

export default router;
