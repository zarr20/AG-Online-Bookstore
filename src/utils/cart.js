// cart.js

// Fungsi untuk mendapatkan keranjang dari localStorage
function getCart() {
    const cartJSON = localStorage.getItem('cart');
    return cartJSON ? JSON.parse(cartJSON) : [];
}

// Fungsi untuk menyimpan keranjang ke localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Fungsi untuk menambahkan item ke keranjang
function addToCart(book, quantity) {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === book.id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        const cartItem = {
            id: book.id,
            title: book.title,
            price: book.price,
            quantity: quantity,
        };

        cart.push(cartItem);
    }

    saveCart(cart);
}

// Fungsi untuk menghapus item dari keranjang
function removeFromCart(bookId) {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.id !== bookId);
    saveCart(updatedCart);
}

// Fungsi untuk mendapatkan seluruh item dalam keranjang
function getItems() {
    return getCart();
}

// Fungsi untuk mengosongkan keranjang
function clearCart() {
    localStorage.removeItem('cart');
}

export default {
    addToCart,
    removeFromCart,
    getItems,
    clearCart
};