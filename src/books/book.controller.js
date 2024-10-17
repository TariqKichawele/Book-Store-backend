import Book from "./book.model.js";


export async function getAllBooks(req, res) {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        res.status(200).send(books);
    } catch (error) {
        console.error("Error fetching books", error);
        res.status(500).send({ message: "Failed to fetch books" })
    }
}
export async function postABook(req, res) {
    try {
        const newBook = new Book({...req.body});
        await newBook.save();
        res.status(201).send({ message: "Book created successfully", book: newBook });
    } catch (error) {
        console.error("Error creating book", error);
        res.status(500).send({message: "Failed to create book"})
    }
}
export async function getSingleBook(req, res) {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        if(!book) return res.status(404).send({ message: "Book not found" });

        res.status(200).send(book);
    } catch (error) {
        console.error("Error fetching book", error);
        res.status(500).send({ message: "Failed to fetch book" })
    }
}
export async function updateBook(req, res) {
    try {
        const { id } = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
        if(!updatedBook) return res.status(404).send({ message: "Book not found" });

        res.status(200).send({
            message: "Book updated successfully",
            book: updatedBook
        })
    } catch (error) {
        console.error("Error updating book", error);
        res.status(500).send({ message: "Failed to update book" })
    }
}
export async function deleteBook(req, res) {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if(!deletedBook) return res.status(404).send({ message: "Book not found" });

        res.status(200).send({
            message: "Book deleted successfully",
            book: deletedBook
        })
    } catch (error) {
        console.error("Error deleting book", error);
        res.status(500).send({ message: "Failed to delete book" })
    }
}