const express = require('express');
const router = express.Router();
const multer = require('multer');
const { S3Client } = require('@aws-sdk/client-s3');
const multerS3 = require('multer-s3');

const Screenshot = require('../models/Screenshot');

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
    let screenshots;

    if (req.query.ids) {
      screenshots = await Screenshot.find({ _id: req.query.ids });
    } else {
      screenshots = await Screenshot.find();
    }

    res.json(screenshots);
  })
  .post(upload.single('image'), async (req, res) => {
    const screenshot = await Screenshot.create({
      ...req.body,
      image: req.file.location,
    });
    res.status(201).json(screenshot);
  });

module.exports = router;
