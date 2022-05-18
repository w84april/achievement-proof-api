const e = require('express');
const Router = e.Router();
const { body, validationResult } = require('express-validator');
const { Achievement } = require('../../models');
const authorization = require('../../authorization');

const post = Router.post('/achievement', authorization, body('file').isString(), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array()[0].msg });
    }

    //const task = await Task.findOne({ where: { message: req.body.message } });
    //if (task) throw new Error('Task already exists');

    const item = await Achievement.create({
      owner: res.locals.id,
      file: req.body.file,
      team: req.body.team,
      result: req.body.result,
      event: req.body.event,
    });
    res.send(item);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});
module.exports = post;
