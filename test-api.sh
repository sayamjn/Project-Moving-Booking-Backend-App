#!/bin/bash

BASE_URL="http://localhost:3000/api/v1"

echo "=========================================="
echo "Testing Movie API Endpoints"
echo "=========================================="
echo ""

# Test 1: Create a movie
echo "1. Creating a new movie..."
CREATE_RESPONSE=$(curl -s -X POST "$BASE_URL/movies" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "The Shawshank Redemption",
    "description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    "casts": ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
    "trailerUrl": "https://www.youtube.com/watch?v=6hB3S9bIaco",
    "language": "English",
    "releaseDate": "1994-09-23",
    "releaseStatus": "RELEASED",
    "director": "Frank Darabont",
    "rating": 9.3,
    "duration": 142,
    "genre": ["Drama", "Crime"]
  }')
echo "$CREATE_RESPONSE" | jq '.'
MOVIE_ID=$(echo "$CREATE_RESPONSE" | jq -r '.data._id')
echo "Movie ID: $MOVIE_ID"
echo ""

# Test 2: Get all movies
echo "2. Getting all movies..."
curl -s -X GET "$BASE_URL/movies" | jq '.'
echo ""

# Test 3: Get movie by ID
echo "3. Getting movie by ID ($MOVIE_ID)..."
curl -s -X GET "$BASE_URL/movies/$MOVIE_ID" | jq '.'
echo ""

# Test 4: Update movie
echo "4. Updating movie..."
curl -s -X PUT "$BASE_URL/movies/$MOVIE_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "The Shawshank Redemption (Updated)",
    "description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency. A masterpiece!",
    "casts": ["Tim Robbins", "Morgan Freeman", "Bob Gunton", "William Sadler"],
    "trailerUrl": "https://www.youtube.com/watch?v=6hB3S9bIaco",
    "language": "English",
    "releaseDate": "1994-09-23",
    "releaseStatus": "RELEASED",
    "director": "Frank Darabont",
    "rating": 9.5,
    "duration": 142,
    "genre": ["Drama", "Crime"]
  }' | jq '.'
echo ""

# Test 5: Get updated movie
echo "5. Getting updated movie..."
curl -s -X GET "$BASE_URL/movies/$MOVIE_ID" | jq '.'
echo ""

# Test 6: Delete movie
echo "6. Deleting movie..."
curl -s -X DELETE "$BASE_URL/movies/$MOVIE_ID" | jq '.'
echo ""

# Test 7: Verify deletion
echo "7. Verifying deletion (should return 404)..."
curl -s -X GET "$BASE_URL/movies/$MOVIE_ID" | jq '.'
echo ""

echo "=========================================="
echo "API Testing Complete!"
echo "=========================================="
