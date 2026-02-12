#!/bin/bash
# ----------------------------
# Tasks 10-13: Async/Await or Promises with Axios
# ----------------------------

# Make sure Axios is installed
# npm install axios

USERNAME="newuser"
PASSWORD="12345"

# Task 10: Get all books
curl -s http://localhost:5000/ > getallbooks_async

# Task 11: Get book by ISBN (replace 1 with a valid ISBN)
curl -s http://localhost:5000/isbn/1 > getbooksbyISBN_async

# Task 12: Get books by Author (replace with actual author)
curl -s http://localhost:5000/author/Chinua%20Achebe > getbooksbyauthor_async

# Task 13: Get books by Title (replace with actual title)
curl -s http://localhost:5000/title/Things%20Fall%20Apart > getbooksbytitle_async

echo "✅ Tasks 10–13 completed. Check the files:"
echo "getallbooks_async, getbooksbyISBN_async, getbooksbyauthor_async, getbooksbytitle_async"
