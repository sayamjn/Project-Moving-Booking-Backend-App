#!/bin/bash

BASE_URL="http://localhost:3000/api/v1"

echo "=========================================="
echo "Testing Show API (BookMyShow Integration)"
echo "=========================================="
echo ""

# Step 1: Create a movie
echo "1. Creating a movie..."
MOVIE_RESPONSE=$(curl -s -X POST "$BASE_URL/movies" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Inception",
    "description": "A thief who steals corporate secrets through dream-sharing technology.",
    "casts": ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
    "trailerUrl": "https://www.youtube.com/watch?v=YoHD9XEInc0",
    "language": "English",
    "releaseDate": "2010-07-16",
    "releaseStatus": "RELEASED",
    "director": "Christopher Nolan",
    "rating": 8.8,
    "duration": 148,
    "genre": ["Sci-Fi", "Thriller"]
  }')
MOVIE_ID=$(echo "$MOVIE_RESPONSE" | jq -r '.data._id')
echo "Movie created with ID: $MOVIE_ID"
echo ""

# Step 2: Create a theatre
echo "2. Creating a theatre..."
THEATRE_RESPONSE=$(curl -s -X POST "$BASE_URL/theatres" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "INOX Megaplex",
    "address": {
      "street": "456 Cinema Street",
      "city": "Delhi",
      "state": "Delhi",
      "zipCode": "110001",
      "country": "India"
    },
    "phone": "9876543210",
    "email": "inox.delhi@example.com",
    "screens": 6,
    "facilities": ["Parking", "Food Court", "3D", "IMAX"],
    "owner": "INOX Leisure Limited"
  }')
THEATRE_ID=$(echo "$THEATRE_RESPONSE" | jq -r '.data._id')
echo "Theatre created with ID: $THEATRE_ID"
echo ""

# Step 3: Create a show
echo "3. Creating a show..."
TOMORROW=$(date -v+1d +%Y-%m-%d 2>/dev/null || date -d "+1 day" +%Y-%m-%d)
SHOW_RESPONSE=$(curl -s -X POST "$BASE_URL/shows" \
  -H "Content-Type: application/json" \
  -d "{
    \"movie\": \"$MOVIE_ID\",
    \"theatre\": \"$THEATRE_ID\",
    \"screenNumber\": 1,
    \"showDate\": \"$TOMORROW\",
    \"showTime\": \"18:30\",
    \"pricing\": {
      \"standard\": 250,
      \"premium\": 350,
      \"recliner\": 500
    },
    \"totalSeats\": 100,
    \"showType\": \"IMAX\",
    \"language\": \"English\"
  }")
echo "$SHOW_RESPONSE" | jq '.'
SHOW_ID=$(echo "$SHOW_RESPONSE" | jq -r '.data._id')
echo "Show ID: $SHOW_ID"
echo ""

# Step 4: Get all shows
echo "4. Getting all shows..."
curl -s -X GET "$BASE_URL/shows" | jq '.'
echo ""

# Step 5: Get show by ID
echo "5. Getting show by ID..."
curl -s -X GET "$BASE_URL/shows/$SHOW_ID" | jq '.'
echo ""

# Step 6: Get shows by movie
echo "6. Getting shows for the movie..."
curl -s -X GET "$BASE_URL/shows/movie/$MOVIE_ID" | jq '.'
echo ""

# Step 7: Get shows by theatre
echo "7. Getting shows for the theatre..."
curl -s -X GET "$BASE_URL/shows/theatre/$THEATRE_ID" | jq '.'
echo ""

# Step 8: Book seats
echo "8. Booking seats A1, A2, A3..."
curl -s -X POST "$BASE_URL/shows/$SHOW_ID/book" \
  -H "Content-Type: application/json" \
  -d '{
    "seats": ["A1", "A2", "A3"]
  }' | jq '.'
echo ""

# Step 9: Try booking same seats again (should fail)
echo "9. Trying to book already booked seats (should fail)..."
curl -s -X POST "$BASE_URL/shows/$SHOW_ID/book" \
  -H "Content-Type: application/json" \
  -d '{
    "seats": ["A1", "A4"]
  }' | jq '.'
echo ""

# Step 10: Book more seats
echo "10. Booking more seats B1, B2..."
curl -s -X POST "$BASE_URL/shows/$SHOW_ID/book" \
  -H "Content-Type: application/json" \
  -d '{
    "seats": ["B1", "B2"]
  }' | jq '.'
echo ""

# Step 11: Check updated show details
echo "11. Checking updated show details..."
curl -s -X GET "$BASE_URL/shows/$SHOW_ID" | jq '.'
echo ""

echo "=========================================="
echo "Show API Testing Complete!"
echo "=========================================="
