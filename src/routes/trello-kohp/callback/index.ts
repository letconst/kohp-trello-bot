import express  from 'express';
import { get }  from './get';
import { post } from './post';

const router = express.Router();

router.use(express.json());

router.get('/', get);
router.post('/', post);

export default router;
