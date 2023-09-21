import React from 'react';

import cart from '../utils/cart';

interface PopUpProps {
    book: {
        availability: any;
        price: any;
        id: any;
        title: string;
        author: string;
        description: string;
    };
    onClose: () => void;
}

const PopUp: React.FC<PopUpProps> = ({ book, onClose }) => {
    const handleAddToCart = (book: Book) => {
        // Memanggil addToCart dengan objek buku yang lengkap
        cart.addToCart(book, 1);
        alert(`Buku "${book.title}" ditambahkan ke keranjang.`);
    };
    return (
        <div className="bg-[#00000094] fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white w-96 p-6 rounded-lg shadow-md">
                <span style={{ color: book.availability ? 'black' : 'red' }}>
                    {book.availability ? 'Tersedia' : 'Tidak Tersedia'}
                </span>
                <h2 className="text-2xl font-semibold mb-2">{book.title}</h2>
                <p className="text-gray-600">Penulis: {book.author}</p>
                <p className="text-gray-600">Harga: {book.price}</p>
                <p className="text-gray-700">{book.description}</p>
                <div className='flex gap-4'>
                    <button
                        onClick={onClose}
                        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-600"
                    >
                        Tutup
                    </button>
                    {book.availability && <>
                        <button
                            onClick={() => handleAddToCart(book)}
                            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-600"
                        >
                            Tambahkan ke Keranjang
                        </button>
                    </>}

                </div>


            </div>
        </div>
    );
};

export default PopUp;
