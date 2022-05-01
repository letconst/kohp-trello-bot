import express from 'express';
import routes  from './src/routes';

const { LISTEN_PORT } = process.env;

const app = express();

app.set('view engine', 'ejs');

app.use(express.json());
app.use('/', routes);

app.listen(LISTEN_PORT, () => console.log('Server is ready!'));
