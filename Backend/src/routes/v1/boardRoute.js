import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { boardValidation } from '~/validations/boardValidation.js';
import { boardController } from '~/controllers/boardController';

const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'GET boards OK' })
  })
  .post(boardValidation.createNew, boardController.createNew)

export default router;
