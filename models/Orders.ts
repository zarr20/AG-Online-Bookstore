import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

interface OrderAttributes {
  id: number;
  customer_name: string;
//   quantity: number;
  order_date: Date;
  cartItems: Array<object>;
}

class Order extends Model<OrderAttributes> implements OrderAttributes {
  public id!: number;
  public customer_name!: string;
//   public quantity!: number;
  public order_date!: Date;
  public cartItems!: Array<object>;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customer_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // quantity: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    order_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    cartItems: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Order',
    tableName: 'orders', // Jika nama tabel berbeda, sesuaikan di sini
  }
);

export default Order;
