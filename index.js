import express from 'express';
import bodyParser from 'body-parser';
import routes from './server/routes/index';
const app = express();
app.use(express.json());

bodyParser.json(app);

app.use('/api/v1', routes);


const port = process.env.PORT || 5000;
app.listen(port, () =>console.log(`Listening on port ${port}..`));
export default app;