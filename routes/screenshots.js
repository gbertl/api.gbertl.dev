const express = require('express');
const router = express.Router();
const multer = require('multer');
const { S3Client } = require('@aws-sdk/client-s3');
const multerS3 = require('multer-s3');

const Screenshot = require('../models/Screenshot');
const { generatePriorityOrder } = require('../utils');

const s3 = new S3Client();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET_NAME,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, `${Date.now().toString()}${file.originalname}`);
    },
  }),
});

router
  .route('/')
  .get(async (req, res) => {
    let query = Screenshot.find();

    if (req.query.ids) query = query.where({ _id: req.query.ids });
    if (req.query.ordering) query = query.sort(req.query.ordering.join(' '));

    const screenshots = await query;

    res.json(screenshots);
  })
  .post(upload.single('image'), async (req, res) => {
    const body = { ...req.body };
    body.image = req.file.location;

    const count = await Screenshot.countDocuments({ project: body.project });
    body.priorityOrder = count + 1;

    const screenshot = await Screenshot.create(body);
    res.status(201).json(screenshot);
  });

router.delete('/:id', async (req, res) => {
  const screenshot = await Screenshot.findByIdAndDelete(req.params.id)
  res.json(screenshot)
})

module.exports = router;


