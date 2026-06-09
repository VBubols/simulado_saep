import express from 'express';
import { listarProdutos, cadastrarProduto, listarPorCategoria, listarProdutosLimites } from '../controllers/produto.controller.js';

const produtoRouter = express.Router();

produtoRouter.get('/limites', listarProdutosLimites);
produtoRouter.get('/categorias', listarPorCategoria);
produtoRouter.get('/', listarProdutos);
produtoRouter.post('/', cadastrarProduto);

export default produtoRouter;