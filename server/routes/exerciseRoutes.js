import express from 'express';
import authenticate from '../middlewares/authenticate.js';
import exerciseController from '../controllers/exerciseController.js';

const router = express.Router();

router.get('/', authenticate, exerciseController.getAllExercises);
router.post('/', authenticate, exerciseController.createEsercise);
// router.put();
// router.delete();

export default router;
