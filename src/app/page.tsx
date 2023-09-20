'use client';
// pages/index.tsx
import React, { useState, useEffect, useRef } from 'react';
import BookList from '@/components/book_list';
import PopUp from '@/components/book_popup';
import Pagination from '@/components/Pagination';

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState(4);

  const showBookDetail = (book: Book) => {
    setSelectedBook(book);
  };

  const hideBookDetail = () => {
    setSelectedBook(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {


    const fetchBooks = async () => {
      try {
        const response = await fetch(`/api/books?query=${searchQuery}&page=${currentPage}&pageSize=${pageSize}`);
        if (response.ok) {
          const data = await response.json();
          setBooks(data.data); // Mengambil data buku dari properti 'data' dalam respons
          if (data.totalPages) {
            setTotalPages(data.totalPages); // Setel totalPages jika tersedia dalam respons
          } else {
            setTotalPages(null); // Setel totalPages menjadi null jika tidak tersedia
          }
        } else {
          console.error('Failed to fetch books:', response.status);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, [searchQuery, currentPage, pageSize]);

  return (
    <div className="container mx-auto p-4">

      <div className="flex gap-4 items-center">
        <h1 className="text-3xl font-semibold mb-4 text-center py-4">
          Online Bookstore
        </h1>
        <input
          type="text"
          placeholder="Cari buku..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border rounded-full py-2 px-4 mb-4 text-xl max-w-[300px]"
        />
      </div>
      <BookList books={books} searchQuery={searchQuery} onBookClick={showBookDetail} />
      {selectedBook && (
        <PopUp book={selectedBook} onClose={hideBookDetail} />
      )}
      {totalPages !== null && (
        <div className='flex justify-end py-5'>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />

        </div>
      )}
    </div>
  );
}
