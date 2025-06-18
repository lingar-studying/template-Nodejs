import express from "express";
const router = express.Router();
import  {
  getAllEntities,
  getEntity,
  createEntity,
  updateEntity,
  deleteEntity,
} from '../Services/generaldao.js';

import  artistSchema from '../schemas/artist.js';
import categorySchema from '../schemas/category.js';

// ----- ARTISTS -----
router.get('/artists', async (req, res) => {
  try {
    const artists = await getAllEntities('Artist', artistSchema);
    res.json(artists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/artists/:id', async (req, res) => {
  try {
    const artist = await getEntity('Artist', req.params.id, artistSchema);
    if (!artist) return res.status(404).send('Artist not found');
    res.json(artist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/artists', async (req, res) => {
  try {
    const newArtist = await createEntity(req.body, 'Artist', artistSchema);
    res.status(201).json(newArtist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/artists/:id', async (req, res) => {
  try {
    const updated = await updateEntity({ _id: req.params.id, ...req.body }, 'Artist', artistSchema);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/artists/:id', async (req, res) => {
  try {
    const result = await deleteEntity(req.params.id, 'Artist', artistSchema);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ----- CATEGORIES -----
router.get('/categories', async (req, res) => {
  try {
    const categories = await getAllEntities('Category', categorySchema);
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/categories/:id', async (req, res) => {
  try {
    const category = await getEntity('Category', req.params.id, categorySchema);
    if (!category) return res.status(404).send('Category not found');
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/categories', async (req, res) => {
  try {
    const newCategory = await createEntity(req.body, 'Category', categorySchema);
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/categories/:id', async (req, res) => {
  try {
    const updated = await updateEntity({ _id: req.params.id, ...req.body }, 'Category', categorySchema);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/categories/:id', async (req, res) => {
  try {
    const result = await deleteEntity(req.params.id, 'Category', categorySchema);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
