
import { Router } from "express";

import { getClient } from "./db";

import mongodb from "mongodb";

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
				// client.close();
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

		if (mongodb.ObjectID.isValid(searchedId)) {
			id = new mongodb.ObjectID(searchedId);
		} else {
			client.close();
			return res.send(400);
		}
		const searchObject = { _id: id };

		collection.findOne(searchObject, function (
			error,
			student
		) {
			res.send(error || student);
			client.close();
		});
	});
});

router.post("/", (req, res, next) => {
	const client = getClient();
	client.connect((err) => {
		if (err) {
			return next(err);
		}
		const db = client.db("feedback-tracker");
		const collection = db.collection("feedback");
		const data = req.body;

		collection
			.insertOne(data, (error, result) => {
			// if everything is not ok -> send error response (500)
				if (error) {
					console.log(error);
					return res.sendStatus(500);
				}
				// if everything is ok -> send returned record (a bit tricky to find it...)
				return res.status(201).send(result.ops[0]);
			});
	});
});

export default router;
