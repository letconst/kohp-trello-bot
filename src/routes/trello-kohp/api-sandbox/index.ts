import express        from 'express'
import apiSandboxPost from './apiSandboxPost';

const router = express.Router();

router.use(express.urlencoded({ extended: true }));

router.post('/', apiSandboxPost);

export default router;
