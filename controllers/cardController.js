const Card = require('../models/Card');

// Create a new card
exports.createCard = async (req, res) => {
  try {
    const { suit, rank, value, description } = req.body;

    if (!suit || !rank || !value) {
      return res.status(400).json({ error: 'suit, rank, and value are required' });
    }

    const newCard = new Card({
      suit,
      rank,
      value,
      description
    });

    const card = await newCard.save();
    res.status(201).json({ message: 'Card created successfully', card });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Card with this suit and rank already exists' });
    }
    res.status(500).json({ error: error.message });
  }
};

// Get all cards with optional search and pagination
exports.getAllCards = async (req, res) => {
  try {
    const { suit, rank, page = 1, limit = 10 } = req.query;
    const filter = {};
    
    if (suit) filter.suit = suit;
    if (rank) filter.rank = rank;

    const skip = (page - 1) * limit;
    const cards = await Card.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });
    
    const total = await Card.countDocuments(filter);
    
    res.json({
      cards,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single card by ID
exports.getCardById = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Card.findById(id);
    
    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }
    
    res.json(card);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a card
exports.updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { suit, rank, value, description } = req.body;

    const updateData = {};
    if (suit !== undefined) updateData.suit = suit;
    if (rank !== undefined) updateData.rank = rank;
    if (value !== undefined) updateData.value = value;
    if (description !== undefined) updateData.description = description;
    updateData.updatedAt = Date.now();

    const card = await Card.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }
    
    res.json({ message: 'Card updated successfully', card });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a card
exports.deleteCard = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Card.findByIdAndDelete(id);
    
    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }
    
    res.json({ message: 'Card deleted successfully', card });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get cards by suit
exports.getCardsBySuit = async (req, res) => {
  try {
    const { suit } = req.params;
    const cards = await Card.find({ suit }).sort({ rank: 1 });
    res.json({ suit, cards, count: cards.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get cards by rank
exports.getCardsByRank = async (req, res) => {
  try {
    const { rank } = req.params;
    const cards = await Card.find({ rank }).sort({ suit: 1 });
    res.json({ rank, cards, count: cards.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
