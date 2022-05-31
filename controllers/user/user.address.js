const e = require('express');
const Router = e.Router();
const { body, validationResult } = require('express-validator');
const { User, Achievement } = require('../../models');
const authorization = require('../../authorization');
const addUserAddress = Router.post(
  '/address',
  authorization,
  body('address').isString(),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()[0].msg });
      }
      const checkIfExists = await User.findOne({
        where: { id: res.locals.id },
      });
      if (!checkIfExists) throw new Error('User with such email does not exist');

      await Achievement.update(
        { address: req.body.address },
        {
          where: { owner: res.locals.id },
          returning: true,
        },
      );

      const userToBeEdited = await User.update(
        { address: req.body.address },
        {
          where: { id: res.locals.id },
          returning: true,
        },
      );
      console.log(userToBeEdited);
      res.send({
        userToBeEdited,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
);
module.exports = addUserAddress;
