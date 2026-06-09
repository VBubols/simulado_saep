import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';
import { Produto } from './Produto.js';

export const Saida = sequelize.define('Saida', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  data_saida: {
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
  tableName: 'saida',
  timestamps: false
});

Saida.belongsTo(Produto, { foreignKey: 'produto_id' });
Produto.hasMany(Saida,   { foreignKey: 'produto_id' });