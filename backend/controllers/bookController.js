const Book = require('../models/books.js');
const { findById } = require('../models/books');

// Get Books
const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    }
    catch (error) {
        res.status(500).json({ message: 'server eroor' });
    }
};

// Get Book by ID

const getBookbyId = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    }
    catch (error) {
        res.status(500).json({ message: 'server error due to '+ error });
    }
};

// Create Book

const createBook = async (req, res) => {
    const { Name, Author_Name, Categories, isPhysical, isEbook, Availability, ImageUrl, DownloadUrl } = req.body;
    try {
        const newBook = new Book({
            Name,
            Author_Name,
            Categories,
            isPhysical,
            isEbook,
            Availability,
            ImageUrl,
            DownloadUrl,
        });
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    }
    catch (error) {
        res.status(500).json({ message: 'server error due to'+ error });
    }
};

// Update Book

const updateBook = async (req, res) => {
    const { Name, Author_Name, Categories, isPhysical, isEbook, Downloads, Availability, ImageUrl, DownloadUrl } = req.body;
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        book.Name = Name || book.Name;
        book.Author_Name = Author_Name || book.Author_Name;
        book.Categories = Categories || book.Categories;
        book.isPhysical = isPhysical || book.isPhysical;
        book.isEbook = isEbook || book.isEbook;
        book.Availability = Availability || book.Availability;
        book.ImageUrl = ImageUrl || book.ImageUrl;
        book.DownloadUrl = DownloadUrl || book.DownloadUrl;

        const updatedBook = await book.save();
        res.status(200).json({updatedBook});
    }
    catch (error) {
        res.status(500).json({ message: 'server error'+ error });
    }
};

// delete Book 

const deleteBook = async(req,res)=>{
    try{
        const book = await Book.findById(req.params.id);
        if(!book){
            return res.status(404).json({message:"Book not found"});
        }
        let deletedBook = await book.deleteOne();
        res.status(200).json(deletedBook);
    }
    catch(error){
        res.status(500).json({message:'server error'+ error});
    }
}

module.exports = {
    getBooks,
    getBookbyId,
    createBook,
    updateBook,
    deleteBook,
};