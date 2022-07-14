const express = require('express');
const Technology = require('../models/Technology');

const router = express.Router();

router
  .route('/')
  .get(async (req, res) => {
    let technologies;

    if (req.query.ids) {
      technologies = await Technology.find({ _id: req.query.ids });
    } else {
      technologies = await Technology.find();
    }

    res.json(technologies);
  })
  .post(async (req, res) => {
    const technology = await Technology.create(req.body);
    res.status(201).json(technology);
  });

module.exports = router;
