// src/routes/scriptSnippet.routes.js
import { Router } from 'express';
import {
  getPublicScripts, listAll, upsertOne, deleteOne
} from '../controllers/scriptSnippet.controller.js';

const r = Router();

// Public cho FE load
r.get('/public', getPublicScripts);

// Admin (nhớ gắn middleware auth admin trước khi dùng thực tế)
r.get('/', listAll);
r.put('/:key', upsertOne);
r.delete('/:key', deleteOne);

export default r;
