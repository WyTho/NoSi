const express = require('express');
const router = express.Router();
const cors = require('cors');

router.use(cors());

router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});
router.get('/api/graph', (req, res) => res.sendFile(__dirname + '/d1.png'));

module.exports = router;
