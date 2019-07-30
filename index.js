const express = require("express");
const bodyParser = require("body-parser");
const routes = require('./routes');
const app = express();

app.use(express.json());

bodyParser.json(app);

app.use('/api/v1', routes);

app.listen(7000, () => console.log("Listening on port 7000"));