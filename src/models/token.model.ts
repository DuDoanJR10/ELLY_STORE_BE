import { DataTypes, Model, InferAttributes, InferCreationAttributes } from "sequelize";
import db from '../../db/connection'

interface TokenAttributes {
  id?: string;
  token: string;
  userId: string;
  type: string;
  role: string;
  expire: Date;
}

class TokenModel extends Model<TokenAttributes> implements TokenAttributes {
  public id?: string;
  public token!: string;
  public userId!: string;
  public type!: string;
  public role!: string;
  public expire!: Date;
}

TokenModel.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  token: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expire: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize: db,
  tableName: 'tokens',
  timestamps: true,
})

export default TokenModel;