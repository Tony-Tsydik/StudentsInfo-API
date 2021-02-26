import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import initConfig from './config';
import initAPIRouter from './router';

const app = express();

const config = initConfig();
const apiRouter = initAPIRouter();

app.use(bodyParser.json());

app.use(cors({ origin: true, credentials: true }));

app.use('/api', apiRouter);

app.listen(config.get('applicationConfig').port, () => {
    console.log(`Express server listening on port: ${config.get('applicationConfig').port}`);
});