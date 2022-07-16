const express = require('express');
const Category = require('../models/Category');

const router = express.Router();

router
  .route('/')
  .get(async (req, res) => {
    let query = Category.find();

    if (req.query.ids) query = query.where({ _id: req.query.ids });
    if (req.query.ordering) query = query.sort(req.query.ordering.join(' '));

    const categories = await query;
    res.json(categories);
  })
  .post(async (req, res) => {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  });

module.exports = router;
