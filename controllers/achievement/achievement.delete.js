const e = require('express');
const Router = e.Router();
const { Achievement } = require('../../models');
const authorization = require('../../authorization');
const remove = Router.delete('/achievement', authorization, async (req, res) => {
  try {
    const itemToBeDeleted = await Achievement.findOne({
      where: { id: req.query.id, owner: res.locals.id },
    });
    itemToBeDeleted.destroy();
    res.send(itemToBeDeleted);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

module.exports = remove;
