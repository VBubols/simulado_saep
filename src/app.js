import 'dotenv/config';
import express from 'express';
import sequelize from './config/database.js';
import produtoRouter from './routes/produto.routes.js';
import entradaRouter from './routes/entrada.routes.js';
import saidaRouter from './routes/saida.routes.js';

const app = express();
app.use(express.json());

app.use('/produtos', produtoRouter);
app.use('/entradas', entradaRouter);
app.use('/saidas', saidaRouter);

sequelize.sync({ alter: true }).then( () => {
    app.listen(process.env.PORT, () => {
        console.log(`Rodando o servidor na porta: ${process.env.PORT}`)
    });
});