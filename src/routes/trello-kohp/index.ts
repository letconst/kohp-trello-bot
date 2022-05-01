import express  from 'express';
import callback from './callback';

const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
    res.send('hello');
});

router.use('/callback', callback);

export default router;
