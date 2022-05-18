const e = require('express');
const Router = e.Router();
const { Achievement } = require('../../models');
const { query, validationResult } = require('express-validator');
const amountOfTasks = 5;
const authorization = require('../../authorization');
const get = Router.get('/achievement', authorization, query('filter').optional().isBoolean(), query('page').isNumeric(), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const filter = {
      where: { owner: res.locals.id },
      order: [],
    };

    if (req.query.filter) filter.where = { approved: req.query.filter, owner: res.locals.id };
    if (req.query.sort) filter.order.push(['createdAt', req.query.sort === 'asc' ? 'ASC' : 'DESC']);
    const items = await Achievement.findAndCountAll({
      limit: amountOfTasks,
      offset: (req.query.page - 1) * amountOfTasks,
      where: filter.where,
      order: filter.order,
    });

    res.send(items);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});
module.exports = get;
