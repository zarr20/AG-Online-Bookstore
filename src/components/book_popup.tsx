import React from 'react';

interface PopUpProps {
  book: {
    title: string;
    author: string;
    description: string;
  };
  onClose: () => void;
}

const PopUp: React.FC<PopUpProps> = ({ book, onClose }) => {
  return (
    <div className="bg-[#00000094] fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white w-96 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-2">{book.title}</h2>
        <p className="text-gray-600">Penulis: {book.author}</p>
        <p className="text-gray-700">{book.description}</p>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-600"
        >
          Tutup
        </button>
      </div>
    </div>
  );
};

export default PopUp;
