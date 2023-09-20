// models/Book.ts
import { Model, DataTypes } from 'sequelize';
import db from '../db'; // Sesuaikan dengan path ke instance Sequelize Anda

class Book extends Model {
  public id!: number;
  public title!: string;
  public author!: string;
  public price!: number;
  public availability!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    availability: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'Book',
    tableName: 'books', // Sesuaikan dengan nama tabel Anda
  }
);

export default Book;
