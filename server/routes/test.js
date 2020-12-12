const express = require('express');
const router = express.Router();
const jsonData = require('../test-data.json');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(jsonData);
});

module.exports = router;
