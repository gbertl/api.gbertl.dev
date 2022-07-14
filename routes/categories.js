const express = require('express');
const Category = require('../models/Category');

const router = express.Router();

router
  .route('/')
  .get(async (req, res) => {
    let categories;

    if (req.query.ids) {
      categories = await Category.find({ _id: req.query.ids });
    } else {
      categories = await Category.find();
    }

    res.json(categories);
  })
  .post(async (req, res) => {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  });

module.exports = router;
