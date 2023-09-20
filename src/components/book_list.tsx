import React from 'react';

interface Book {
    id: number;
    title: string;
    author: string;
    description: string;
}

interface BookListProps {
    books: Book[];
    searchQuery: string;
    onBookClick: (book: Book) => void;
}

const BookList: React.FC<BookListProps> = ({ books, searchQuery, onBookClick }) => {
    const filteredBooks = books ? books.filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];

    return (
        <div className="grid grid-cols-4 gap-4">
            {filteredBooks.map((book) => (
                <div
                    key={book.id}
                    onClick={() => onBookClick(book)}
                    className="cursor-pointer border rounded-lg shadow-lg hover:bg-gray-100"
                >
                    <div className="bg-black h-0 aspect-[7/9]"></div>
                    <div className="p-4">
                        <h2 className="text-xl font-semibold">{book.title}</h2>
                        <p className="text-gray-600">Penulis: {book.author}</p>
                        <p className="text-gray-700">{book.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BookList;
