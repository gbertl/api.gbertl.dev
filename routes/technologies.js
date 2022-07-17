const express = require('express');
const Technology = require('../models/Technology');

const router = express.Router();

router
  .route('/')
  .get(async (req, res) => {
    let query = Technology.find();
    if (req.query.ids) query = query.where({ _id: req.query.ids });
    const technologies = await query;
    res.json(technologies);
  })
  .post(async (req, res) => {
    const technology = await Technology.create(req.body);
    res.status(201).json(technology);
  });

module.exports = router;
