import { DataTypes, Model } from "sequelize";
import db from "../../db/connection";
import CategoryModel from "./category.model"; // Đảm bảo đường dẫn chính xác

interface IProduct {
  id?: string;
  name: string;
  description: string;
  price: number;
  thumbnail: string;
  image_urls: string[];
  category_id: string;
}

class ProductModel extends Model<IProduct> implements IProduct {
  public id?: string;
  public name!: string;
  public description!: string;
  public price!: number;
  public thumbnail!: string;
  public image_urls!: string[];
  public category_id!: string;
}

ProductModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_urls: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: CategoryModel, // Khóa ngoại tham chiếu đến CategoryModel
        key: "id",
      },
    },
  },
  {
    sequelize: db,
    modelName: "products",
    tableName: "products",
    timestamps: false,
  }
);

export default ProductModel;
