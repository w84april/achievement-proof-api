const e = require('express');
const Router = e.Router();
const { body, validationResult } = require('express-validator');
const { Achievement, Image } = require('../../models');
const authorization = require('../../authorization');
const multer = require('multer');
const upload = multer({ dest: './public/data/uploads/' });

const post = Router.post(
  '/achievement',
  authorization,
  upload.single('uploaded_file'),
  body('owner').isString(),
  body('projectName').isString(),
  body('team').optional().isString(),
  body('result').isString(),
  body('event').isString(),
  async (req, res) => {
    try {
      const { filename, mimetype, size } = req.file;
      const filepath = req.file.path;
      console.log(req.file);
      console.log(req.body);
      const errors = validationResult(req);
      console.log(errors);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()[0].msg });
      }

      const image = await Image.create({
        filename,
        filepath,
        mimetype,
        size,
      });
      const item = await Achievement.create({
        owner: res.locals.id,
        projectName: req.body.projectName,
        file: image.filename,
        team: req.body.team,
        result: req.body.result,
        event: req.body.event,
      });
      res.send(item);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
);
module.exports = post;
