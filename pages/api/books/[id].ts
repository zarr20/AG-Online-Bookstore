// Mengambil detail buku
import { NextApiRequest, NextApiResponse } from 'next';
import Book from '../../../models/Book';
import db from '../../../db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = parseInt(req.query.id as string, 10); // Mengkonversi id ke tipe data number

  if (req.method === 'GET') {
    try {
      const book = await Book.findByPk(id);
      if (!book) {
        res.status(404).json({ message: 'Buku tidak ditemukan' });
      } else {
        res.json(book);
      }
    } catch (error) {
      console.error('Kesalahan saat mencari buku berdasarkan ID:', error);
      res.status(500).json({ message: 'Kesalahan Server Internal' });
    }
  } else {
    res.status(405).end(); // Metode Tidak Diizinkan
  }
};

export default handler;
