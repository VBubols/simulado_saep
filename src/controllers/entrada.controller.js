import { Entrada } from '../models/entrada.model.js';
import { Produto } from '../models/produto.model.js';

export async function listarEntradas(req, res) {
    try {
        const entradas = await Entrada.findAll();
        return res.status(200).json(entradas);
    } catch (error) {
        return res.status(500).json({ erro: 'Erro ao listar entradas.', detalhe: error.message });
    }
}

export async function entradaProduto(req, res) {
    try {
        const { produto_id, quantidade } = req.body;

        if (!produto_id) {
            return res.status(400).json({ erro: 'produto_id é obrigatório.' });
        }

        if (!quantidade || !Number.isInteger(Number(quantidade)) || Number(quantidade) <= 0) {
            return res.status(400).json({ erro: 'Quantidade deve ser um inteiro maior que zero.' });
        }

        const produto = await Produto.findByPk(produto_id);
        if (!produto) {
            return res.status(404).json({erro: 'Produto não encontrado'});
        }

        const entrada = await Entrada.create({
            produto_id,
            quantidade: Number(quantidade),
            data_entrada: new Date()
        });

        await Produto.increment('quantidade', {
            by: Number(quantidade),
            where: { id: produto_id }
        });

        return res.status(201).json({
            mensagem: 'Entrada registrada com sucesso!',
            entrada
        });
    } catch (error) {
        return res.status(500).json({ erro: 'Erro ao registrar entrada', detalhe: error.message });
    }
};