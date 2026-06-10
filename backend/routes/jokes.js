const express = require('express');
const axios = require('axios');
const router = express.Router();

// Get random joke from external API
router.get('/random', async (req, res) => {
  try {
    const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
    res.json({
      success: true,
      joke: {
        type: response.data.type,
        setup: response.data.setup,
        punchline: response.data.punchline
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch joke',
      error: error.message
    });
  }
});

// Get joke by category
router.get('/category/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const response = await axios.get(`https://official-joke-api.appspot.com/jokes/${type}/random`);
    res.json({
      success: true,
      joke: {
        type: response.data.type || type,
        setup: response.data.setup,
        punchline: response.data.punchline
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Failed to fetch ${req.params.type} joke`,
      error: error.message
    });
  }
});

// Get multiple jokes
router.get('/batch/:count', async (req, res) => {
  try {
    const count = Math.min(parseInt(req.params.count) || 1, 10); // Max 10 jokes
    const response = await axios.get(
      `https://official-joke-api.appspot.com/jokes/random/${count}`
    );
    res.json({
      success: true,
      count: response.data.length,
      jokes: response.data.map(joke => ({
        type: joke.type,
        setup: joke.setup,
        punchline: joke.punchline
      }))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch jokes',
      error: error.message
    });
  }
});

module.exports = router;
