#!/bin/bash

# ----------------------------
# Lab: Tasks 6–9 Automation (Fixed)
# ----------------------------

# Output files
REGISTER_FILE="register"
LOGIN_FILE="login"
REVIEW_ADD_FILE="reviewadded"
DELETE_REVIEW_FILE="deletereview"

# Clean old files
> $REGISTER_FILE
> $LOGIN_FILE
> $REVIEW_ADD_FILE
> $DELETE_REVIEW_FILE

# User credentials
USERNAME="newuser"
PASSWORD="12345"

# ----------------------------
# Task 6: Register user
# ----------------------------
echo "curl -s -X POST http://localhost:5000/register -H 'Content-Type: application/json' -d '{\"username\":\"$USERNAME\",\"password\":\"$PASSWORD\"}'" >> $REGISTER_FILE
curl -s -X POST http://localhost:5000/register \
-H "Content-Type: application/json" \
-d "{\"username\":\"$USERNAME\",\"password\":\"$PASSWORD\"}" >> $REGISTER_FILE

# ----------------------------
# Task 7: Login user
# ----------------------------
echo -e "\ncurl -c cookies.txt -X POST http://localhost:5000/customer/login -H 'Content-Type: application/json' -d '{\"username\":\"$USERNAME\",\"password\":\"$PASSWORD\"}'" >> $LOGIN_FILE
curl -s -c cookies.txt -X POST http://localhost:5000/customer/login \
-H "Content-Type: application/json" \
-d "{\"username\":\"$USERNAME\",\"password\":\"$PASSWORD\"}" >> $LOGIN_FILE

# Save accessToken from login
TOKEN=$(curl -s -X POST http://localhost:5000/customer/login \
-H "Content-Type: application/json" \
-d "{\"username\":\"$USERNAME\",\"password\":\"$PASSWORD\"}" | jq -r '.accessToken')

# ----------------------------
# Task 8: Add/Modify book review
# ----------------------------
echo -e "\ncurl -b cookies.txt -X PUT 'http://localhost:5000/customer/auth/review/1?review=Amazing book'" >> $REVIEW_ADD_FILE
curl -s -b cookies.txt -X PUT "http://localhost:5000/customer/auth/review/1?review=Amazing book" >> $REVIEW_ADD_FILE

# ----------------------------
# Task 9: Delete book review
# ----------------------------
echo -e "\ncurl -b cookies.txt -X DELETE 'http://localhost:5000/customer/auth/review/1'" >> $DELETE_REVIEW_FILE
curl -s -b cookies.txt -X DELETE "http://localhost:5000/customer/auth/review/1" >> $DELETE_REVIEW_FILE

# ----------------------------
echo "✅ Tasks 6–9 completed. Check the files:"
echo "$REGISTER_FILE, $LOGIN_FILE, $REVIEW_ADD_FILE, $DELETE_REVIEW_FILE"



