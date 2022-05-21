const e = require('express');
const Router = e.Router();
const { User } = require('../../models');
const { query, validationResult } = require('express-validator');

const authorization = require('../../authorization');
const getUser = Router.get('/user', authorization, query('id').isString(), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (req.query.id !== res.locals.id) {
      throw new Error('Access denied');
    }
    const user = await User.findOne({
      where: { id: req.query.id },
    });
    const { id, firstName, lastName, fatherName, email, role } = user;

    res.send({ id, firstName, lastName, fatherName, email, role });
  } catch (err) {
    return res.status(400).send(err.message);
  }
});
module.exports = getUser;
