// src/controllers/boardController.js
import { StatusCodes } from 'http-status-codes';

// Interop: chạy được với cả ESM (named/default) lẫn CJS (module.exports)
import * as boardServiceNS from '../services/boardService.js';
const boardService =
  boardServiceNS.boardService ?? boardServiceNS.default ?? boardServiceNS;

/**
 * POST /api/boards
 * Body: tuỳ theo schema boardService.createNew xử lý
 */
export async function createNew(req, res, next) {
  try {
    const createdBoard = await boardService.createNew(req.body);
    return res.status(StatusCodes.CREATED).json(createdBoard);
  } catch (error) {
    return next(error);
  }
}

// Cho phép import cả default lẫn named
export default { createNew };
