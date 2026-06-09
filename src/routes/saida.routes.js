import express from 'express';
import { saidaProduto, listarSaidas } from '../controllers/saida.controller.js';

const saidaRouter = express.Router();

saidaRouter.post('/registrar', saidaProduto);
saidaRouter.get('/', listarSaidas);

export default saidaRouter;