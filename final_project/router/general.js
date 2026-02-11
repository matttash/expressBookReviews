const express = require('express');
let books = require("./booksdb.js");
let regdUsers = require("./auth_users.js"); // import users array & isValid
const public_users = express.Router();

// -------------------- Task 6: Register --------------------
public_users.post("/register", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
    }

    if (regdUsers.isValid(username)) {
        return res.status(409).json({ message: "Username already exists" });
    }

    // Add user to users array in auth_users.js
    regdUsers.users.push({ username, password });

    return res.status(200).json({ message: "User registered successfully" });
});

// -------------------- Task 1: Get all books --------------------
public_users.get('/', function (req, res) {
    return res.status(200).json(books);
});

// -------------------- Task 2: Get book by ISBN --------------------
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    if (books[isbn]) {
        return res.status(200).json(books[isbn]);
    } else {
        return res.status(404).json({ message: "Book not found" });
    }
});

// -------------------- Task 3: Get books by author --------------------
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author.toLowerCase();
    const filteredBooks = Object.values(books).filter(book =>
        book.author.toLowerCase() === author
    );
    if (filteredBooks.length > 0) {
        return res.status(200).json(filteredBooks);
    } else {
        return res.status(404).json({ message: "No books found for this author" });
    }
});

// -------------------- Task 4: Get books by title --------------------
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title.toLowerCase();
    const filteredBooks = Object.values(books).filter(book =>
        book.title.toLowerCase() === title
    );
    if (filteredBooks.length > 0) {
        return res.status(200).json(filteredBooks);
    } else {
        return res.status(404).json({ message: "No books found with this title" });
    }
});

// -------------------- Task 5: Get book reviews --------------------
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    if (books[isbn]) {
        return res.status(200).json(books[isbn].reviews || {});
    } else {
        return res.status(404).json({ message: "Book not found" });
    }
});

module.exports.general = public_users;
