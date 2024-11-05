import { DataTypes, Model, InferAttributes, InferCreationAttributes } from "sequelize";
import db from "../../db/connection";

interface UserAttributes {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: string;
  phone?: string;
  googleId?: string;
  active: boolean;
}

class UserModel extends Model<UserAttributes> implements UserAttributes {
  public id?: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: string;
  public phone?: string;
  public googleId?: string;
  public active!: boolean;
}

UserModel.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // Tự động tạo UUID
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
  },
  googleId: {
    type: DataTypes.STRING,
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  sequelize: db,
  tableName: 'users',
  timestamps: true,
})

export default UserModel;