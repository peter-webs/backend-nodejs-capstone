const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db');

// Search API
router.get('/', async (req, res, next) => {
    try {
        // Task 1: Connect to MongoDB
        const db = await connectToDatabase();
        
        // Use secondChanceItems instead of gifts
        const collection = db.collection("secondChanceItems");

        // Initialize the query object
        let query = {};

        // Task 2: Add the name filter
        if (req.query.name && req.query.name.trim() !== '') {
            query.name = { $regex: req.query.name, $options: "i" };
        }

        // Task 3: Add other filters
        if (req.query.category) {
            query.category = req.query.category;
        }
        if (req.query.condition) {
            query.condition = req.query.condition;
        }
        if (req.query.age_years) {
            query.age_years = { $lte: parseInt(req.query.age_years) };
        }

        // Task 4: Fetch filtered items
        const items = await collection.find(query).toArray();

        res.json(items);
    } catch (e) {
        next(e);
    }
});

module.exports = router;