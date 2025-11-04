const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');

// Create a new card
router.post('/', cardController.createCard);

// Get all cards with optional pagination and filters
router.get('/', cardController.getAllCards);

// Get a single card by ID
router.get('/:id', cardController.getCardById);

// Get cards by suit
router.get('/suit/:suit', cardController.getCardsBySuit);

// Get cards by rank
router.get('/rank/:rank', cardController.getCardsByRank);

// Update a card
router.put('/:id', cardController.updateCard);

// Delete a card
router.delete('/:id', cardController.deleteCard);

module.exports = router;
