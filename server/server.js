import express from "express";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { extractRarArchive } from "./utils/extractRar.js";
import path from "path";
import session from "express-session";
import cors from "cors";
const app = express();
app.use(cors({ origin: "http://localhost:3001" }));
const __dirname = path.dirname("./");
console.log(path.join("hi", "bye"));
app.use(
	session({
		// It holds the secret key for session
		secret: "Your_Secret_Key",

		// Forces the session to be saved
		// back to the session store
		resave: true,

		// Forces a session that is "uninitialized"
		// to be saved to the store
		saveUninitialized: true,
	})
);

app.get("/", (req, res) => {
	console.log("id", req.session.id);
	// Access and modify session data
	req.session.views = req.session.views ? req.session.views + 1 : 1;

	res.send(`Hello! You have visited this page ${req.session.views} times.`);
});

app.listen(3000, () => console.log("server running at 3000"));
