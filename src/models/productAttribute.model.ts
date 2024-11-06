import { DataTypes, Model } from "sequelize";
import db from "../../db/connection";
import ProductModel from "./product.model";

interface ProductAttribute {
  id?: string;
  product_id: string;
  size: string;
  color: string;
  quantity: number;
  image_color_url: string;
}

class ProductAttributeModel extends Model<ProductAttribute> implements ProductAttribute {
  public id?: string;
  public product_id!: string;
  public size!: string;
  public color!: string;
  public quantity!: number;
  public image_color_url!: string;
}

ProductAttributeModel.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  product_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: ProductModel,
      key: "id",
    },
  },
  size: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image_color_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: "product_attributes",
  timestamps: false,
})

export default ProductAttributeModel;