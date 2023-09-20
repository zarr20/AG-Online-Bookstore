// searching books
import { NextApiRequest, NextApiResponse } from "next";
import { Op } from "sequelize"; // Import Op (operator) dari Sequelize
import Book from "../../../models/Book";
import db from "../../../db";
import sequelize from "../../../db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      // Mengambil halaman buku berdasarkan query parameter "page" (default: 1)
      const page = parseInt(req.query.page as string) || 1;

      // Mengambil jumlah item per halaman berdasarkan query parameter "pageSize" (default: semua jika tidak diset)
      const pageSize = parseInt(req.query.pageSize as string) || undefined;

      // Menyiapkan objek opsi query untuk Sequelize
      const queryOptions: any = {
        offset: (page - 1) * (pageSize || 0),
        limit: pageSize || undefined, // Mengatur batas limit ke undefined jika pageSize tidak diset
      };

      var totalBooks = 0;
      var books = null;

      // Jika ada query parameter "query", tambahkan kondisi pencarian berdasarkan judul buku
      if (req.query.query) {
        const searchQuery = req.query.query as string;
        // Hapus limit jika ada parameter query
        delete queryOptions.offset;
        delete queryOptions.limit;
        // Menambahkan kondisi pencarian berdasarkan judul buku (case-insensitive)
        queryOptions.where = {
          [Op.and]: [
            // Menggunakan `Sequelize.literal` untuk mencapai pencarian case-insensitive
            db.literal(`LOWER(title) LIKE LOWER('%${searchQuery}%')`),
          ],
        };

        // Mengambil data buku dari database (misalnya, dari Sequelize)
        books = await Book.findAll(queryOptions);

        // Menghitung jumlah total buku dalam database sesuai dengan kondisi pencarian
        totalBooks = await Book.count({ where: queryOptions });
      } else {
        // Mengambil data buku dari database tanpa kondisi pencarian
        books = await Book.findAll(queryOptions);

        // Menghitung jumlah total buku dalam database
        totalBooks = await Book.count();
      }

      // Menghitung jumlah total halaman berdasarkan total buku dan pageSize
      const totalPages = Math.ceil(totalBooks / (pageSize || totalBooks));

      // Mengembalikan data dalam format yang diinginkan
      res.json({
        data: books,
        totalPages: totalPages,
      });

      // res.json(books);
    } catch (error) {
      console.error("Error fetching books: Kesalahan mengambil data buku:", error);
      res.status(500).json({ message: "Internal Server Error: Kesalahan Internal Server" });
    }
  } else {
    res.status(405).end(); // Metode Tidak Diizinkan (Method Not Allowed)
  }
};

export default handler;
