const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const projectsRouter = require('./routes/projects');
const categoriesRouter = require('./routes/categories');
const screenshotsRouter = require('./routes/screenshots');
const technologiesRouter = require('./routes/technologies');
const tokenRouter = require('./routes/token');

const { authenticateToken } = require('./utils');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.CONNECTION_URL);

app.use('/token', tokenRouter);

app.use(authenticateToken);
app.use('/projects', projectsRouter);
app.use('/categories', categoriesRouter);
app.use('/screenshots', screenshotsRouter);
app.use('/technologies', technologiesRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
