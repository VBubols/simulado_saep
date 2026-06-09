import { Produto } from '../models/produto.model.js';
import { Sequelize } from 'sequelize';

export async function listarProdutos(req, res) {
    try {
        const produtos = await Produto.findAll();
        return res.status(200).json(produtos);
    } catch (error) {
        return res.status(500).json({ erro: 'Erro ao listar produtos.', detalhe: error.message });
    }
};

export async function cadastrarProduto(req, res) {
    try {
        const { nome, categoria, quantidade, valor_unitario } = req.body;

        if (!categoria) {
            return res.status(400).json({ erro: 'Categoria é obrigatória!' })
        }

        if (quantidade === undefined || quantidade === null) {
            return res.status(400).json({erro: 'Quantidade é obrigatória.'});
        } else if (!Number.isInteger(Number(quantidade)) || Number(quantidade) < 0) {
            return res.status(400).json({erro: 'Quantidade deve ser um número inteiro não negativo.'});
        }

        if (valor_unitario === undefined || valor_unitario === null) {
            return res.status(400).json({erro: 'Valor unitário é obrigatório.'});
        } else if (isNaN(Number(valor_unitario)) || Number(valor_unitario) <= 0) {
            return res.status(400).json({erro: 'Valor unitário deve ser um número maior que zero.'});
        }

        const produto = await Produto.create({
            nome,
            categoria: categoria.trim(),
            quantidade: Number(quantidade),
            valor_unitario: Number(valor_unitario)
        });
        return res.status(201).json(produto);
    } catch (error) {
        return res.status(500).json({ erro: 'Erro ao cadastrar produto.', detalhe: error.message });
    }
};

export async function listarPorCategoria(req, res) {
    try {
        const resultado = await Produto.findAll({
            attributes: [
                'categoria',
                [Sequelize.fn('SUM', Sequelize.col('quantidade')), 'quantidade_total'],
                [Sequelize.fn('SUM', Sequelize.literal('quantidade * valor_unitario')), 'valor_total']
            ],
            group: ['categoria'],
            order: [['categoria', 'ASC']]
        });
        return res.status(200).json(resultado);
    } catch (error) {
        return res.status(500).json({ erro: 'Erro ao listar por categoria', detalhe: error.message });
    }
};

export async function listarProdutosLimites(req, res) {
    try {
        const produtos = await Produto.findAll();

        const resultado = produtos.map(p => {
            const percentual = (p.quantidade / 100) * 100;
            let status = null;

            if(p.quantidade <= 0) status = 'MÍNIMO';
            else if(p.quantidade >= 100) status = 'MÁXIMO';

            return status ? {
                id: p.id,
                nome: p.nome,
                categoria: p.categoria,
                quantidade: p.quantidade,
                percentual_nivel: `${percentual.toFixed(0)}%`,
                status
            } : null;
        }).filter(Boolean);
        return res.status(200).json(resultado);
    } catch (error) {
        return res.status(500).json({ erro: 'Erro ao verificar limites', detalhe: error.message });
    }
};
