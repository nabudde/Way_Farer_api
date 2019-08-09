const express = require("express");
const bodyParser = require("body-parser");
const routes = require('./routes');
const app = express();
require('dotenv').config();
app.use(express.json());

bodyParser.json(app);

app.use('/api/v1', routes);

const port = process.env.PORT || 3000;
app.listen(port, () =>console.log(`Listening on port ${port}..`));