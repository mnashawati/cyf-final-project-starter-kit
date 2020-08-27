import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();

const dbUri = process.env.MONGODB_URI || "mongodb://localhost:27017/cyf";
if (!dbUri) {
	throw "Missing MONGODB_URI env variable";
}

const configuration = { useNewUrlParser: true, useUnifiedTopology: true };

export const getClient = () => new MongoClient(dbUri, configuration);
