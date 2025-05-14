const ExternalApiService = require('../services/externalApi.service');

exports.searchBooks = async (req, res, next) => {
  try {
    const query = req.query.q;
    const results = await ExternalApiService.searchBooks(query);
    res.json(results);
  } catch (error) {
    next(error);
  }
};