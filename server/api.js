import { Router } from "express";
import { getClient } from "./db";
import mongodb from "mongodb";

const router = new Router();

router.get("/", (_, res, next) => {
	const client = getClient();

	client.connect((err) => {
		if (err) {
			return next(err);
		}
		res.json({ message: "Hello, world!" });
		client.close();
	});
});

const client = getClient();

client.connect(function () {

	const db = client.db("feedback-tracker");

	router.get("/students", (_, res) => {
		const collection = db.collection("students");

		collection
			.find()
			.toArray(function(error, result) {
				res.send(error || result);
			});
	});

	router.get("/students/:id", (req, res) => {
		const collection = db.collection("students");

		// check if the id is valid if not -> 404
		if (!mongodb.ObjectID.isValid(req.params.id)) {
			return res.send(404);
		}

		// define id (mongodb.ObjectID)
		const id = new mongodb.ObjectID(req.params.id);
		const queryObject = { _id: id };

		collection.findOne(queryObject, (error, result) => {
			if (error) {
				return res.status(500).send(error);
			}
			// if no record ->
			if (!result) {
				return res.sendStatus(404);
			}
			// if record -> send the data (200 default)
			return res.send(result);
		});

	});

	// request body is the whole areasOfFocus object/state
	router.put("/students/:id/areas-of-focus", (req, res) => {

		const collection = db.collection("students");

		const data = req.body;
		// validation should happen here

		// check if the id is valid if not -> 404
		if (!mongodb.ObjectID.isValid(req.params.id)) {
			return res.send(404);
		}

		// define id (mongodb.ObjectID)
		const id = new mongodb.ObjectID(req.params.id);
		const queryObject = { _id: id };
		const options = { returnOriginal: false }; // send back the UPDATED record
		const sendErrorOrResult = (error, result) => {
			if (error) {
				return res.status(500).send(error);
			}
			return res.send(result.value); // result.value === result.ops[0]

		};

		collection.updateOne(
			queryObject,
			{ $set : { "areasOfFocus" : data } },
			options,
			sendErrorOrResult
		);

		return res.json({ status: "success", areasOfFocusUpdated: req.body });
	});


	// To post new feedback or area of focus
	router.put("/students/:id", (req, res) => {

		const collection = db.collection("students");

		const data = req.body;
		// validation should happen here

		// check if the id is valid if not -> 404
		if (!mongodb.ObjectID.isValid(req.params.id)) {
			return res.send(404);
		}

		// define id (mongodb.ObjectID)
		const id = new mongodb.ObjectID(req.params.id);
		const queryObject = { _id: id };

		const options = { returnOriginal: false }; // send back the UPDATED record

		const sendErrorOrResult = (error, result) => {
			if (error) {
				return res.status(500).send(error);
			}
			return res.send(result.value); // result.value === result.ops[0]

		};

		// if there are missing mandatory properties then return an error message to the API user and stop
		function findMissingFields(data, mandatoryFields) {
			return mandatoryFields.filter((field) => !data.hasOwnProperty(field));
		}

		const missingFields = findMissingFields(data, ["id", "title", "module", "mentor", "text"]);

		if (missingFields.length > 0) {
			const errorInfo = {
				error: {
					description: "Missing Fields",
					missingFields: missingFields,
				},
			};
			return res.status(400).send(errorInfo);
		}

		collection.updateOne(
			queryObject,
			{ $push : { "allFeedback" : data } },
			options,
			sendErrorOrResult
		);

		return res.json({ status: "success", feedbackAdded: req.body });
	});

	// deleting a previous feedback
	router.delete("/students/:id/:feedbackId", function(req, res) {

		const collection = db.collection("students");

		const id = new mongodb.ObjectID(req.params.id);
		const queryObject = { _id: id };

		const feedbackId = req.params.feedbackId;

		const options = { multi:true };

		collection.updateOne(
			queryObject,
			{ $pull: { "allFeedback" : { id: feedbackId } } },
			options
		);
		res.send({ status:"success" });
	});

	router.put("/students/:studentId/feedback/:feedbackId", (req, res) => {
		const collection = db.collection("students");
		// check if the id is valid if not -> 404
		const data = req.body;
		if (!mongodb.ObjectID.isValid(req.params.studentId)) {
			return res.send(404);
		}
		//define id (mongodb.ObjectID)
		const studentId = new mongodb.ObjectID(req.params.studentId);
		const queryObject = { _id: studentId };
		const options = { returnOriginal: false }; // send back the UPDATED record

		collection.findOne(queryObject, (error, result) => {
			if (error) {
				return res.status(500).send(error);
			}
			// if no record ->
			if (!result) {
				return res.sendStatus(404);
			}
			// if record -> send the data (200 default)
			const updatedFeedback = result.allFeedback;
			updatedFeedback.forEach((feedback) => {
				if(feedback.id === req.params.feedbackId){
					feedback.module = data.module;
					feedback.title = data.title;
					feedback.text = data.text;
					feedback.mentor = data.mentor;
				}
			});

			collection.findOneAndUpdate(queryObject, { $set : { "allFeedback" : updatedFeedback } }, options, (err, result) => {
				if(result.value){
					return res.send(err || result.value);
				} else {
					return res.sendStatus(404);
				}
			});
		});
	});
});

export default router;
