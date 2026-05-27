const express = require("express");
const axios = require("axios");
let books = require("./booksdb.js");
let users = require("./auth_users.js").users;

const public_users = express.Router();

/* -------------------- TASK 1 -------------------- */
public_users.get('/', function (req, res) {
    res.send(JSON.stringify(books, null, 4));
});


/* -------------------- TASK 2 -------------------- */
public_users.get('/isbn/:isbn', function (req, res) {

    const isbn = req.params.isbn;
    const book = books[isbn];

    if (book) {
        return res.json(book);
    }

    return res.status(404).json({
        message: "Book not found"
    });
});


/* -------------------- TASK 3 -------------------- */
public_users.get('/author/:author', function (req, res) {

    const author = req.params.author.toLowerCase();

    const filteredBooks = Object.keys(books)
        .filter(key =>
            books[key].author.toLowerCase() === author
        )
        .reduce((result, key) => {
            result[key] = books[key];
            return result;
        }, {});

    return res.json(filteredBooks);
});


/* -------------------- TASK 4 -------------------- */
public_users.get('/title/:title', function (req, res) {

    const title = req.params.title.toLowerCase();

    const filteredBooks = Object.keys(books)
        .filter(key =>
            books[key].title.toLowerCase() === title
        )
        .reduce((result, key) => {
            result[key] = books[key];
            return result;
        }, {});

    return res.json(filteredBooks);
});


/* -------------------- TASK 5 -------------------- */
public_users.get('/review/:isbn', function (req, res) {

    const isbn = req.params.isbn;

    return res.json(books[isbn].reviews);
});


/* -------------------- TASK 6 -------------------- */
public_users.post("/register", (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: "Username and password required"
        });
    }

    const userExists = users.some(
        user => user.username === username
    );

    if (userExists) {
        return res.status(409).json({
            message: "User already exists"
        });
    }

    users.push({
        username,
        password
    });

    return res.status(200).json({
        message: "User registered successfully"
    });
});


/* -------------------- TASK 10 -------------------- */
public_users.get('/async', async function (req, res) {

    try {

        const data = await new Promise((resolve) => {
            resolve(books);
        });

        return res.json(data);

    } catch (err) {

        return res.status(500).json({
            message: err.message
        });
    }
});


/* -------------------- TASK 11 -------------------- */
public_users.get('/async/isbn/:isbn', async function (req, res) {

    try {

        const isbn = req.params.isbn;

        const data = await new Promise((resolve, reject) => {

            if (books[isbn]) {
                resolve(books[isbn]);
            } else {
                reject("Book not found");
            }
        });

        return res.json(data);

    } catch (err) {

        return res.status(404).json({
            message: err
        });
    }
});


/* -------------------- TASK 12 -------------------- */
public_users.get('/async/author/:author', async function (req, res) {

    try {

        const author = req.params.author.toLowerCase();

        const data = await new Promise((resolve) => {

            const filteredBooks = Object.keys(books)
                .filter(key =>
                    books[key].author.toLowerCase() === author
                )
                .reduce((result, key) => {
                    result[key] = books[key];
                    return result;
                }, {});

            resolve(filteredBooks);
        });

        return res.json(data);

    } catch (err) {

        return res.status(500).json({
            message: err.message
        });
    }
});


/* -------------------- TASK 13 -------------------- */
public_users.get('/async/title/:title', async function (req, res) {

    try {

        const title = req.params.title.toLowerCase();

        const data = await new Promise((resolve) => {

            const filteredBooks = Object.keys(books)
                .filter(key =>
                    books[key].title.toLowerCase() === title
                )
                .reduce((result, key) => {
                    result[key] = books[key];
                    return result;
                }, {});

            resolve(filteredBooks);
        });

        return res.json(data);

    } catch (err) {

        return res.status(500).json({
            message: err.message
        });
    }
});

module.exports.general = public_users;
