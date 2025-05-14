const express = require('express');
const router = express.Router();
const ExternalApiController = require('../controllers/externalApi.controller');

// Example route for Google Books API integration
router.get('/search', ExternalApiController.searchBooks);

module.exports = router;