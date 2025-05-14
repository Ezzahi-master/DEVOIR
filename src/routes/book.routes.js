// src/routes/book.routes.js
const express = require('express');
const router = express.Router();

// Ajoutez vos routes ici
router.get('/', (req, res) => {
  res.json({ message: "Route des livres fonctionnelle" });
});

module.exports = router;