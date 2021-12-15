const cors = require("cors");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: "application/vnd.api+json" }));
app.use(cors());

const landing_page = require("./routes/landing_page");
app.use(landing_page);

const app_page = require("./routes/app");
app.use(app_page);

const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log("Listen on :", port);
});
