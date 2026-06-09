import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';
import { Produto } from './produto.model.js';

export const Entrada = sequelize.define('Entrada', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    data_entrada: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    produto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'produto', key: 'id' }
    }
}, {
    tableName: 'entrada',
    timestamps: false
});

Entrada.belongsTo(Produto, { foreignKey: 'produto_id' });
Produto.hasMany(Entrada, { foreignKey: 'produto_id' });