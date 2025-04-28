const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
    [name, email, hashedPassword],
    (err, result) => {
      if (err) return res.status(400).json({ message: 'User already exists' });
      res.status(201).json({ message: 'User registered' });
    }
  );
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err || results.length === 0) return res.status(400).json({ message: 'Invalid credentials' });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  });
});

module.exports = router;
