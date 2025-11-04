# Playing Card API

Develop a REST API for playing card collection using Express.js routes.

## Overview

This is a comprehensive REST API for managing a collection of playing cards. Built with Express.js and MongoDB, it provides full CRUD (Create, Read, Update, Delete) operations for playing cards with advanced filtering and search capabilities.

## Features

- ✅ Complete CRUD operations for playing cards
- ✅ Advanced search and filtering by suit and rank
- ✅ Pagination support for retrieving large datasets
- ✅ MongoDB integration with Mongoose ODM
- ✅ Express.js REST API framework
- ✅ CORS enabled for cross-origin requests
- ✅ Environment variables support using dotenv
- ✅ Error handling and validation
- ✅ Modular architecture (Models, Controllers, Routes)

## Project Structure

```
playing-card-api/
├── models/
│   └── Card.js           # Mongoose Card schema
├── controllers/
│   └── cardController.js # CRUD operations logic
├── routes/
│   └── cardRoutes.js     # Express route definitions
├── app.js                # Express app setup and configuration
├── package.json          # Dependencies and scripts
└── README.md             # Documentation
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/akashsinhamahapatra78-cmd/playing-card-api.git
cd playing-card-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```
MONGODB_URI=mongodb://localhost:27017/playing-card-api
PORT=3000
```

4. Start the server:
```bash
# Development with auto-reload
npm run dev

# Production
npm start
```

## API Endpoints

### Card Schema

Each card contains:
- `suit` (String): Hearts, Diamonds, Clubs, or Spades
- `rank` (String): Ace, 2-10, Jack, Queen, King
- `value` (Number): Numerical value of the card
- `description` (String): Optional description
- `createdAt` (Date): Timestamp of creation
- `updatedAt` (Date): Timestamp of last update

### Endpoints

#### Create a Card
**POST** `/api/cards`

Request body:
```json
{
  "suit": "Hearts",
  "rank": "Ace",
  "value": 1,
  "description": "Ace of Hearts"
}
```

#### Get All Cards
**GET** `/api/cards?page=1&limit=10&suit=Hearts&rank=Ace`

Query parameters:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Records per page (default: 10)
- `suit` (optional): Filter by suit
- `rank` (optional): Filter by rank

Response:
```json
{
  "cards": [...],
  "pagination": {
    "total": 52,
    "page": 1,
    "limit": 10,
    "pages": 6
  }
}
```

#### Get a Card by ID
**GET** `/api/cards/:id`

Response:
```json
{
  "_id": "...",
  "suit": "Hearts",
  "rank": "Ace",
  "value": 1,
  "description": "Ace of Hearts",
  "createdAt": "...",
  "updatedAt": "..."
}
```

#### Get Cards by Suit
**GET** `/api/cards/suit/:suit`

Example: `/api/cards/suit/Hearts`

#### Get Cards by Rank
**GET** `/api/cards/rank/:rank`

Example: `/api/cards/rank/Ace`

#### Update a Card
**PUT** `/api/cards/:id`

Request body:
```json
{
  "value": 11,
  "description": "Updated description"
}
```

#### Delete a Card
**DELETE** `/api/cards/:id`

#### Health Check
**GET** `/api/health`

Response:
```json
{
  "status": "API is running"
}
```

## Models

### Card Model

The Card schema is defined in `models/Card.js` with the following properties:
- Unique constraint on (suit, rank) combination
- Automatic timestamp creation
- Enum validation for suit and rank values

## Controllers

The `controllers/cardController.js` file contains all CRUD operation handlers:
- `createCard`: Create a new card with validation
- `getAllCards`: Retrieve all cards with pagination and filtering
- `getCardById`: Get a single card by ID
- `updateCard`: Update card properties
- `deleteCard`: Remove a card from the database
- `getCardsBySuit`: Get all cards of a specific suit
- `getCardsByRank`: Get all cards of a specific rank

## Routes

The `routes/cardRoutes.js` file defines Express routes mapped to controller functions:
- POST `/` → createCard
- GET `/` → getAllCards
- GET `/:id` → getCardById
- GET `/suit/:suit` → getCardsBySuit
- GET `/rank/:rank` → getCardsByRank
- PUT `/:id` → updateCard
- DELETE `/:id` → deleteCard

## Dependencies

- **express**: Web framework for Node.js
- **mongoose**: MongoDB object modeling
- **cors**: Cross-origin resource sharing middleware
- **dotenv**: Environment variable management
- **nodemon**: Development auto-reload tool

## Usage Examples

### Create Multiple Cards
```bash
curl -X POST http://localhost:3000/api/cards \
  -H "Content-Type: application/json" \
  -d '{"suit": "Hearts", "rank": "Ace", "value": 1}'
```

### Get All Cards with Pagination
```bash
curl http://localhost:3000/api/cards?page=1&limit=5
```

### Get Cards by Suit
```bash
curl http://localhost:3000/api/cards/suit/Hearts
```

### Update a Card
```bash
curl -X PUT http://localhost:3000/api/cards/[ID] \
  -H "Content-Type: application/json" \
  -d '{"value": 11}'
```

### Delete a Card
```bash
curl -X DELETE http://localhost:3000/api/cards/[ID]
```

## Error Handling

The API includes comprehensive error handling:
- 400 Bad Request: Missing required fields or duplicate card
- 404 Not Found: Card ID not found
- 500 Internal Server Error: Server-side errors

## Environment Variables

Create a `.env` file with the following variables:
```
MONGODB_URI=mongodb://localhost:27017/playing-card-api
PORT=3000
```

## Testing

You can test the API using:
- cURL
- Postman
- Insomnia
- Thunder Client

## Future Enhancements

- Add authentication and authorization
- Add input validation middleware
- Add API documentation with Swagger/OpenAPI
- Add unit and integration tests
- Add Docker support
- Add CI/CD pipeline
- Add rate limiting
- Add caching mechanism

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC

## Author

akashsinhamahapatra78-cmd
