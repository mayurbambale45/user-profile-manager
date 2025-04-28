const express = require('express');
const db = require('../db');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Get Profile
router.get('/me', protect, (req, res) => {
  db.query('SELECT id, name, email, phone, address, profile_pic FROM users WHERE id = ?', 
    [req.user.id], (err, results) => {
      if (err) throw err;
      res.json(results[0]);
    });
});

// Update Profile
router.put('/update', protect, (req, res) => {
  const { name, phone, address } = req.body;
  db.query('UPDATE users SET name = ?, phone = ?, address = ? WHERE id = ?', 
    [name, phone, address, req.user.id], 
    (err, results) => {
      if (err) throw err;
      res.json({ message: 'Profile updated' });
    });
});

// Delete Profile
router.delete('/delete', protect, (req, res) => {
  db.query('DELETE FROM users WHERE id = ?', [req.user.id], (err, results) => {
    if (err) throw err;
    res.json({ message: 'Profile deleted' });
  });
});

// Upload Profile Picture
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
});
const upload = multer({ storage });

router.post('/upload', protect, upload.single('profile_pic'), (req, res) => {
  const filePath = `/uploads/${req.file.filename}`;
  db.query('UPDATE users SET profile_pic = ? WHERE id = ?', 
    [filePath, req.user.id], 
    (err, results) => {
      if (err) throw err;
      res.json({ message: 'Profile picture uploaded', filePath });
    });
});

module.exports = router;
