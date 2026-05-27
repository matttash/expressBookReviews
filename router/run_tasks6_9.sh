#!/bin/bash

# ----------------------------
# Lab: Tasks 6–9 Automation
# ----------------------------

# User credentials
USERNAME="newuser"
PASSWORD="12345"
ISBN="1"
REVIEW="Amazing book"

# File names for AI submission
REGISTER_FILE="register"
LOGIN_FILE="login"
REVIEW_ADD_FILE="reviewadded"
REVIEW_DELETE_FILE="deletereview"

# ----------------------------
# 1️⃣ Register user (Task 6)
# ----------------------------
echo "curl -X POST http://localhost:5000/customer/register -H 'Content-Type: application/json' -d '{\"username\":\"$USERNAME\",\"password\":\"$PASSWORD\"}'" > $REGISTER_FILE
curl -s -X POST http://localhost:5000/customer/register \
-H "Content-Type: application/json" \
-d "{\"username\":\"$USERNAME\",\"password\":\"$PASSWORD\"}" >> $REGISTER_FILE
echo -e "\n[Saved registration output to $REGISTER_FILE]"

# ----------------------------
# 2️⃣ Login user (Task 7) & save session cookie
# ----------------------------
echo "curl -c cookies.txt -X POST http://localhost:5000/customer/login -H 'Content-Type: application/json' -d '{\"username\":\"$USERNAME\",\"password\":\"$PASSWORD\"}'" > $LOGIN_FILE
curl -s -c cookies.txt -X POST http://localhost:5000/customer/login \
-H "Content-Type: application/json" \
-d "{\"username\":\"$USERNAME\",\"password\":\"$PASSWORD\"}" >> $LOGIN_FILE
echo -e "\n[Saved login output to $LOGIN_FILE]"

# ----------------------------
# 3️⃣ Add / Modify Review (Task 8)
# ----------------------------
echo "curl -b cookies.txt -X PUT 'http://localhost:5000/customer/auth/review/$ISBN?review=$REVIEW'" > $REVIEW_ADD_FILE
curl -s -b cookies.txt -X PUT "http://localhost:5000/customer/auth/review/$ISBN?review=$REVIEW" >> $REVIEW_ADD_FILE
echo -e "\n[Saved add/modify review output to $REVIEW_ADD_FILE]"

# ----------------------------
# 4️⃣ Delete Review (Task 9)
# ----------------------------
echo "curl -b cookies.txt -X DELETE 'http://localhost:5000/customer/auth/review/$ISBN'" > $REVIEW_DELETE_FILE
curl -s -b cookies.txt -X DELETE "http://localhost:5000/customer/auth/review/$ISBN" >> $REVIEW_DELETE_FILE
echo -e "\n[Saved delete review output to $REVIEW_DELETE_FILE]"

# ----------------------------
# Done
# ----------------------------
echo "✅ Tasks 6–9 completed. Check the files:"
echo "$REGISTER_FILE, $LOGIN_FILE, $REVIEW_ADD_FILE, $REVIEW_DELETE_FILE"

