const express = require('express');
const books = require("./booksdb.js");

const public_users = express.Router();

/* =========================
   TASK 6 - REGISTER USER SUPPORT
========================= */
let users = require("./auth_users.js").users;

/* =========================
   TASK 1 - GET ALL BOOKS
========================= */
public_users.get("/", (req, res) => {
  return res.json(books);
});

/* =========================
   TASK 2 - GET BY ISBN
========================= */
public_users.get("/isbn/:isbn", (req, res) => {
  const book = books[req.params.isbn];

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  return res.json(book);
});

/* =========================
   TASK 3 - GET BY AUTHOR
========================= */
public_users.get("/author/:author", (req, res) => {
  const result = Object.values(books).filter(
    b => b.author.toLowerCase() === req.params.author.toLowerCase()
  );

  return res.json(result);
});

/* =========================
   TASK 4 - GET BY TITLE
========================= */
public_users.get("/title/:title", (req, res) => {
  const result = Object.values(books).filter(
    b => b.title.toLowerCase() === req.params.title.toLowerCase()
  );

  return res.json(result);
});

/* =========================
   TASK 5 - GET REVIEWS
========================= */
public_users.get("/review/:isbn", (req, res) => {
  const book = books[req.params.isbn];

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  return res.json(book.reviews);
});

/* =========================
   TASK 6 - REGISTER USER
========================= */
public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  const exists = users.find(u => u.username === username);

  if (exists) {
    return res.status(409).json({ message: "User already exists" });
  }

  users.push({ username, password });

  return res.json({
    message: "User registered successfully"
  });
});

module.exports.general = public_users;
