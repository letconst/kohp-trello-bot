import express          from 'express';
import { callbackGet }  from './callbackGet';
import { callbackPost } from './callbackPost';

const router = express.Router();

router.use(express.json());

router.get('/', callbackGet);
router.post('/', callbackPost);

export default router;
