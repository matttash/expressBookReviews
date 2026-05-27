#!/bin/bash
# ----------------------------
# Run Tasks 11-13 (Book Details with Async/Promises)
# ----------------------------

BASE_URL="http://localhost:5000"

# Task 11: Get book by ISBN
ISBN="1"
curl -s "$BASE_URL/isbn/$ISBN" -o getbooksbyISBN
echo "Saved output to getbooksbyISBN"

# Task 12: Get books by Author
AUTHOR="Chinua Achebe"
AUTHOR_ENCODED=$(echo $AUTHOR | sed 's/ /%20/g')
curl -s "$BASE_URL/author/$AUTHOR_ENCODED" -o getbooksbyauthor
echo "Saved output to getbooksbyauthor"

# Task 13: Get books by Title
TITLE="Things Fall Apart"
TITLE_ENCODED=$(echo $TITLE | sed 's/ /%20/g')
curl -s "$BASE_URL/title/$TITLE_ENCODED" -o getbooksbytitle
echo "Saved output to getbooksbytitle"

echo "✅ Tasks 11-13 completed."


