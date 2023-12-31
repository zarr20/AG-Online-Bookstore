This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Instalasi Dependensi
```bash
npm install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Route API - Panduan Penggunaan

| URL API           | Metode | Query                 | Keterangan                                  |
| ----------------- | ------ | --------------------- | ------------------------------------------- |
| `/api/books/[id]` | GET    | `[id]`                | Mengambil detail buku berdasarkan ID.       |
| `/api/books`      | GET    | `page` (opsional)     | Mengambil data buku berdasarkan halaman.    |
|                   |        | `pageSize` (opsional) | Mengatur jumlah item per halaman.           |
|                   |        | `query` (opsional)    | Melakukan pencarian buku berdasarkan judul. |
| `/api/orders`     | GET    |                       | Mengambil daftar pesanan yang ada.          |
|                   | POST   |                       | Membuat pesanan baru.                       |
