#!/bin/bash

BASE_URL="http://localhost:3000/api/v1"

echo "=========================================="
echo "Testing Theatre API Endpoints"
echo "=========================================="
echo ""

# Test 1: Create a theatre
echo "1. Creating a new theatre..."
CREATE_RESPONSE=$(curl -s -X POST "$BASE_URL/theatres" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "PVR Cinemas",
    "address": {
      "street": "123 Mall Road",
      "city": "Mumbai",
      "state": "Maharashtra",
      "zipCode": "400001",
      "country": "India"
    },
    "location": {
      "type": "Point",
      "coordinates": [72.8777, 19.0760]
    },
    "phone": "9876543210",
    "email": "pvr.mumbai@example.com",
    "screens": 8,
    "facilities": ["Parking", "Food Court", "3D", "IMAX", "Recliner Seats"],
    "owner": "PVR Limited"
  }')
echo "$CREATE_RESPONSE" | jq '.'
THEATRE_ID=$(echo "$CREATE_RESPONSE" | jq -r '.data._id')
echo "Theatre ID: $THEATRE_ID"
echo ""

# Test 2: Get all theatres
echo "2. Getting all theatres..."
curl -s -X GET "$BASE_URL/theatres" | jq '.'
echo ""

# Test 3: Get theatre by ID
echo "3. Getting theatre by ID ($THEATRE_ID)..."
curl -s -X GET "$BASE_URL/theatres/$THEATRE_ID" | jq '.'
echo ""

# Test 4: Get theatres by city
echo "4. Getting theatres in Mumbai..."
curl -s -X GET "$BASE_URL/theatres/city/Mumbai" | jq '.'
echo ""

# Test 5: Update theatre
echo "5. Updating theatre..."
curl -s -X PUT "$BASE_URL/theatres/$THEATRE_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "PVR Cinemas - Premium",
    "address": {
      "street": "123 Mall Road",
      "city": "Mumbai",
      "state": "Maharashtra",
      "zipCode": "400001",
      "country": "India"
    },
    "location": {
      "type": "Point",
      "coordinates": [72.8777, 19.0760]
    },
    "phone": "9876543210",
    "email": "pvr.mumbai@example.com",
    "screens": 10,
    "facilities": ["Parking", "Food Court", "3D", "IMAX", "Dolby Atmos", "Recliner Seats"],
    "owner": "PVR Limited"
  }' | jq '.'
echo ""

# Test 6: Get updated theatre
echo "6. Getting updated theatre..."
curl -s -X GET "$BASE_URL/theatres/$THEATRE_ID" | jq '.'
echo ""

# Test 7: Delete theatre
echo "7. Deleting theatre..."
curl -s -X DELETE "$BASE_URL/theatres/$THEATRE_ID" | jq '.'
echo ""

# Test 8: Verify deletion
echo "8. Verifying deletion (should return 404)..."
curl -s -X GET "$BASE_URL/theatres/$THEATRE_ID" | jq '.'
echo ""

echo "=========================================="
echo "Theatre API Testing Complete!"
echo "=========================================="
