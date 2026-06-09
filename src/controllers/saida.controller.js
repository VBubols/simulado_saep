import { Saida } from '../models/saida.model.js';
import { Produto } from '../models/produto.model.js';

export async function listarSaidas(req, res) {
    try {
        const saidas = await Saida.findAll({
            order: [['data_saida', 'DESC']]
        });
        return res.status(200).json(saidas);
    } catch (error) {
        return res.status(500).json({ erro: 'Erro ao listar saidas.', detalhe: error.message });
    }
}

export async function saidaProduto(req, res) {
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

        if(produto.quantidade < quantidade){
            return res.status(400).json({
                erro: 'Quantidade insuficiente',
                estoque_atual: produto.quantidade
            });
        }

        const saida = await Saida.create({
            produto_id,
            quantidade: Number(quantidade),
            data_saida: new Date()
        });

        await Produto.decrement('quantidade', {
            by: Number(quantidade),
            where: { id: produto_id }
        });

        return res.status(201).json({
            mensagem: 'Saída registrada com sucesso!',
            saida
        });
    } catch (error) {
        return res.status(500).json({ erro: 'Erro ao registrar saída', detalhe: error.message });
    }
};