import { DataTypes, Model } from "sequelize";
import db from "../../db/connection";

interface CartAttributes {
  id?: string;
  userId: string;
  items: ItemsCart[];
}

interface ItemsCart {
  productAttrId: string;
  quantity: number;
}

class CartModel extends Model<CartAttributes> implements CartAttributes {
  public id?: string;
  public userId!: string;
  public items!: ItemsCart[];
}

CartModel.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  items: {
    type: DataTypes.JSON,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: "carts",
  timestamps: false,
})

export default CartModel;