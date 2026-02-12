const express = require("express");
const axios = require("axios"); // you already installed it
let books = require("./booksdb.js");
const public_users = express.Router();

// -------------------- Task 10: Get all books (async/await) --------------------
public_users.get("/", async (req, res) => {
  try {
    // Simulate async call (or replace with real API if needed)
    const allBooks = await new Promise((resolve) => {
      setTimeout(() => resolve(books), 100); // fake async
    });
    res.status(200).json(allBooks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// -------------------- Task 11: Get book details by ISBN --------------------
public_users.get("/isbn/:isbn", async (req, res) => {
  try {
    const isbn = req.params.isbn;
    const book = await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (books[isbn]) resolve(books[isbn]);
        else reject(new Error("Book not found"));
      }, 100);
    });
    res.status(200).json(book);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// -------------------- Task 12: Get books by author --------------------
public_users.get("/author/:author", async (req, res) => {
  try {
    const author = req.params.author.toLowerCase();
    const authorBooks = await new Promise((resolve) => {
      setTimeout(() => {
        const filtered = Object.values(books).filter(
          (b) => b.author.toLowerCase() === author
        );
        resolve(filtered);
      }, 100);
    });
    if (authorBooks.length === 0) throw new Error("No books found for this author");
    res.status(200).json(authorBooks);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// -------------------- Task 13: Get books by title --------------------
public_users.get("/title/:title", async (req, res) => {
  try {
    const title = req.params.title.toLowerCase();
    const titleBooks = await new Promise((resolve) => {
      setTimeout(() => {
        const filtered = Object.values(books).filter(
          (b) => b.title.toLowerCase() === title
        );
        resolve(filtered);
      }, 100);
    });
    if (titleBooks.length === 0) throw new Error("No books found with this title");
    res.status(200).json(titleBooks);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

module.exports.general = public_users;
