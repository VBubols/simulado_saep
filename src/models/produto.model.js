import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

export const Produto = sequelize.define('Produto', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome:           { type: DataTypes.STRING, allowNull: false },
    categoria:      { type: DataTypes.STRING, allowNull: false },
    quantidade:     { type: DataTypes.INTEGER, allowNull: false },
    valor_unitario: { type: DataTypes.FLOAT, allowNull: false }
}, {
    tableName: 'produto',
    timestamps: true
});

export default Produto;