import express    from 'express';
import trelloKohp from './trello-kohp';

const router = express.Router();

router.use('/trello-kohp', trelloKohp);

export default router;
