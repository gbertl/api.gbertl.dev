const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.CONNECTION_URL);

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

const Project = mongoose.model('Project', projectSchema);

app.get('/projects', async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

app.post('/projects', async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (e) {
    res.json({ error: e.message });
  }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
