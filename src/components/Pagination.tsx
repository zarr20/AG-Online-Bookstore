import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = [];

  // Menambahkan tombol "Previous" jika tidak berada di halaman pertama
  if (currentPage > 1) {
    pages.push(
      <button
        key="prev"
        onClick={() => onPageChange(currentPage - 1)}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        Sebelumnya
      </button>
    );
  }

  // Menambahkan tombol halaman
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        className={`${
          i === currentPage
            ? "bg-blue-500 text-white"
            : "bg-gray-300 text-gray-700"
        } hover:bg-blue-600 hover:text-white py-2 px-4 rounded`}
      >
        {i}
      </button>
    );
  }

  // Menambahkan tombol "Next" jika tidak berada di halaman terakhir
  if (currentPage < totalPages) {
    pages.push(
      <button
        key="next"
        onClick={() => onPageChange(currentPage + 1)}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        Selanjutnya
      </button>
    );
  }

  return <div className="flex space-x-2">{pages}</div>;
};

export default Pagination;
