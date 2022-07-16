const express = require('express');
const router = express.Router();

const Project = require('../models/Project');

router
  .route('/')
  .get(async (req, res) => {
    let query = Project.find();

    if (req.query.ordering) query = query.sort(req.query.ordering.join(' '));
    if (req.query.populating) {
      req.query.populating.forEach((p) => {
        query = query.populate(p);
      });
    }
    if (req.query.selects) query = query.select(req.query.selects.join(' '));

    const projects = await query;
    res.json(projects);
  })
  .post(async (req, res) => {
    try {
      const body = req.body;

      const count = await Project.estimatedDocumentCount();

      if (!body.priorityOrder) {
        body.priorityOrder = count + 1;
      }

      const duplicatedPriorityOrder = await Project.findOne({
        priorityOrder: body.priorityOrder,
      });

      if (duplicatedPriorityOrder) {
        duplicatedPriorityOrder.priorityOrder = count + 1;
        await duplicatedPriorityOrder.save();
      }

      const project = await Project.create(body);
      res.status(201).json(project);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    let query = Project.findById(req.params.id);

    if (req.query.populating) {
      req.query.populating.forEach((p) => {
        query = query.populate(p);
      });
    }

    const project = await query;
    res.json(project);
  })
  .put(async (req, res) => {
    const project = await Project.findById(req.params.id);

    const duplicatedPriorityOrder = await Project.findOne({
      priorityOrder: req.body.priorityOrder,
    });

    if (duplicatedPriorityOrder) {
      duplicatedPriorityOrder.priorityOrder = project.priorityOrder;
      await duplicatedPriorityOrder.save();
    }

    const obj = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(obj);
  })
  .delete(async (req, res) => {
    const project = await Project.findByIdAndDelete(req.params.id);
    res.json(project);
  });

module.exports = router;
