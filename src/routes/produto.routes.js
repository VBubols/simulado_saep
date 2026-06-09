import express from 'express';
import { listarProdutos, cadastrarProduto } from '../controllers/produto.controller.js';

const produtoRouter = express.Router();

produtoRouter.get('/', listarProdutos);
produtoRouter.post('/', cadastrarProduto)

export default produtoRouter;