const express = require('express');
const router = express.Router();

const Project = require('../models/Project');

router
  .route('/')
  .get(async (req, res) => {
    const projects = await Project.find();
    res.json(projects);
  })
  .post(async (req, res) => {
    try {
      const project = await Project.create(req.body);
      res.status(201).json(project);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const project = await Project.findById(req.params.id);
    res.json(project);
  })
  .put(async (req, res) => {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(project);
  })
  .delete(async (req, res) => {
    const project = await Project.findByIdAndDelete(req.params.id);
    res.json(project);
  });

module.exports = router;
