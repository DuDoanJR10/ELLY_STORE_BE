import { DataTypes, Model } from "sequelize";
import db from "../../db/connection";

interface CategoryAttributes {
  id?: string;
  name: string;
}

class CategoryModel extends Model<CategoryAttributes> implements CategoryAttributes {
  public id?: string;
  public name!: string;
}

CategoryModel.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: "categories",
  timestamps: false,
});

export default CategoryModel;