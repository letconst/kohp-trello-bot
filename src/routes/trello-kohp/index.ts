import express    from 'express';
import callback   from './callback';
import apiSandbox from './api-sandbox';

const { NODE_ENV } = process.env;

const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
    res.render('trelloKohp', { NODE_ENV });
});

router.use('/callback', callback);

if (NODE_ENV === 'development') {
    router.use('/api-sandbox', apiSandbox);
}

export default router;
