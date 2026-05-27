#!/bin/bash
# ----------------------------
# Task 10: Test Book Routes using Promises/Async-Await
# ----------------------------

# Server URL
BASE_URL="http://localhost:5000"

# 1️⃣ Get all books
echo "Fetching all books..."
curl -s "$BASE_URL/" > getallbooks_task10.json
echo "Saved output to getallbooks_task10.json"

# 2️⃣ Get book by ISBN (replace 1 with a valid ISBN)
echo "Fetching book by ISBN..."
curl -s "$BASE_URL/isbn/1" > getbooksbyISBN_task10.json
echo "Saved output to getbooksbyISBN_task10.json"

# 3️⃣ Get books by Author
echo "Fetching books by Author..."
curl -s "$BASE_URL/author/Chinua%20Achebe" > getbooksbyauthor_task10.json
echo "Saved output to getbooksbyauthor_task10.json"

# 4️⃣ Get books by Title
echo "Fetching books by Title..."
curl -s "$BASE_URL/title/Things%20Fall%20Apart" > getbooksbytitle_task10.json
echo "Saved output to getbooksbytitle_task10.json"

echo "✅ Task 10 completed. Check the JSON files for output."



