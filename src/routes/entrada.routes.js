import express from 'express';
import { entradaProduto, listarEntradas } from '../controllers/entrada.controller.js';

const entradaRouter = express.Router();

entradaRouter.post('/registrar', entradaProduto);
entradaRouter.get('/', listarEntradas);

export default entradaRouter;