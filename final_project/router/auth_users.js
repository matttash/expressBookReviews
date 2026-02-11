const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

// Store registered users as objects {username, password}
let users = [];

// -------------------- Helper Functions --------------------

// Check if username exists
const isValid = (username) => {
    return users.some(user => user.username === username);
};

// Check if username and password match
const authenticatedUser = (username, password) => {
    return users.some(user => user.username === username && user.password === password);
};

// -------------------- Task 7: Login --------------------
regd_users.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    if (!isValid(username)) {
        return res.status(404).json({ message: "Username does not exist" });
    }

    if (!authenticatedUser(username, password)) {
        return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const accessToken = jwt.sign(
        { username: username },
        "jwtSecret",
        { expiresIn: "1h" }
    );

    // Save token in session
    req.session.authorization = { accessToken };

    return res.status(200).json({ message: "User logged in successfully", accessToken });
});

// -------------------- Task 8: Add/Modify Review --------------------
regd_users.put("/auth/review/:isbn", (req, res) => {
    const username = req.user.username; // from JWT middleware
    const isbn = req.params.isbn;
    const review = req.query.review;

    if (!books[isbn]) {
        return res.status(404).json({ message: "Book not found" });
    }

    if (!review) {
        return res.status(400).json({ message: "Review text is required" });
    }

    if (!books[isbn].reviews) {
        books[isbn].reviews = {};
    }

    // Add or modify review
    books[isbn].reviews[username] = review;

    return res.status(200).json({ message: "Review added/modified successfully", reviews: books[isbn].reviews });
});

// -------------------- Task 9: Delete Review --------------------
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const username = req.user.username; // from JWT middleware
    const isbn = req.params.isbn;

    if (!books[isbn]) {
        return res.status(404).json({ message: "Book not found" });
    }

    if (!books[isbn].reviews || !books[isbn].reviews[username]) {
        return res.status(404).json({ message: "No review found for this user" });
    }

    delete books[isbn].reviews[username];

    return res.status(200).json({ message: "Review deleted successfully", reviews: books[isbn].reviews });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
