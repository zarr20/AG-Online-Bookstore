

import { NextApiRequest, NextApiResponse } from 'next';
import Order from '../../../models/orders';
// import Order from '../../../models/Order'; // Sesuaikan dengan lokasi model Anda

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const orders = await Order.findAll();
      res.status(200).json(orders);
    } catch (error) {
      console.error('Kesalahan saat mengambil daftar pesanan:', error);
      res.status(500).json({ message: 'Kesalahan Server Internal' });
    }
  } else if (req.method === 'POST') {
    try {
        console.log(req.body);
        // const { cartItems } = req.body;

      const orderData = {
        customer_name: 'Nama Pelanggan',
        order_date: new Date(),
        cartItems: req.body,
      };

      const order = await Order.create(orderData);
      res.status(201).json(order);
    } catch (error) {
      console.error('Kesalahan saat membuat pesanan:', error);
      res.status(500).json({ message: 'Kesalahan Server Internal' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed jika bukan metode GET atau POST
  }
};
