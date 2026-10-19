require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

const FIELDS = ['owner_name', 'job_title', 'email', 'phone', 'location', 'skills', 'bio'];

// GET all
app.get('/api/portfolio', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM portfolio ORDER BY id');
    res.json(rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// GET one
app.get('/api/portfolio/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM portfolio WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Record not found' });
    res.json(rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// POST create
app.post('/api/portfolio', async (req, res) => {
  try {
    if (!req.body.owner_name) return res.status(400).json({ error: 'owner_name is required' });
    const values = FIELDS.map(f => req.body[f] || null);
    const [result] = await pool.query(
      `INSERT INTO portfolio (${FIELDS.join(', ')}) VALUES (?, ?, ?, ?, ?, ?, ?)`, values);
    const [rows] = await pool.query('SELECT * FROM portfolio WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// PUT update
app.put('/api/portfolio/:id', async (req, res) => {
  try {
    if (!req.body.owner_name) return res.status(400).json({ error: 'owner_name is required' });
    const values = FIELDS.map(f => req.body[f] || null);
    const [result] = await pool.query(
      `UPDATE portfolio SET ${FIELDS.map(f => f + ' = ?').join(', ')} WHERE id = ?`,
      [...values, req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Record not found' });
    const [rows] = await pool.query('SELECT * FROM portfolio WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// DELETE
app.delete('/api/portfolio/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM portfolio WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Record not found' });
    res.json({ message: 'Record deleted', id: Number(req.params.id) });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));