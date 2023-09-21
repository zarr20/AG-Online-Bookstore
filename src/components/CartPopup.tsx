// components/Cart.tsx

import React, { useEffect, useState } from 'react';
import cart from '../utils/cart';

interface CartProps {
    onClose: () => void;
}

const CartPopup: React.FC<CartProps> = ({ onClose }) => {

    // State untuk menyimpan item dalam keranjang
    const [items, setItems] = useState(cart.getItems());
    // Fungsi untuk menghitung total harga
    const calculateTotalPrice = () => {
        return items.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);
    };

    // Fungsi untuk mengosongkan keranjang
    const clearCart = () => {
        cart.clearCart();
        // Setel state items menjadi array kosong untuk memperbarui tampilan
        setItems([]);
    };

    // Menggunakan useEffect untuk memperbarui state items saat komponen dimount ulang
    useEffect(() => {
        setItems(cart.getItems());
    }, []);

    const handleOrder = async () => {
        console.log(JSON.stringify(items));
        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(items), // Mengirim data item keranjang (cart) ke backend
            });

            if (response.ok) {
                // Pesanan berhasil dibuat, Anda dapat memberikan respons sesuai keinginan
                alert('Pesanan berhasil dibuat!');
                clearCart(); // Menghapus item keranjang setelah pesanan berhasil dibuat
            } else {
                console.error('Gagal membuat pesanan:', response.status);
            }
        } catch (error) {
            console.error('Terjadi kesalahan saat membuat pesanan:', error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4 text-center">Keranjang Belanja</h2>
                <ul>
                    {items.map((item, index) => (
                        <li
                            key={index}
                            className="mb-2 border-b pb-2 flex gap-4 justify-between items-center"
                        >
                            <div className='flex gap-4 items-center'>
                                <span className="font-semibold">{item.title}</span>
                                <span className="text-gray-500 text-sm">
                                    (Harga: {item.price})
                                </span>
                            </div>
                            <span className="font-semibold">Jumlah: {item.quantity}</span>
                        </li>
                    ))}
                </ul>
                <div className="mt-4 text-center">
                    <p className="text-lg font-semibold mt-2">
                        Total Harga: {calculateTotalPrice()} {/* Menampilkan total harga */}
                    </p>
                    <div className='flex gap-4'>
                        <button
                            onClick={clearCart} // Memanggil fungsi clearCart saat tombol ditekan
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg mt-4"
                        >
                            Hapus Keranjang
                        </button>

                        <button
                            onClick={handleOrder}
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg mt-4">
                            Order
                        </button>
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg mt-4"
                        >
                            Tutup
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CartPopup;
