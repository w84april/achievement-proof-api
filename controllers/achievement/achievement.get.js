const e = require('express');
const Router = e.Router();
const { Achievement, User } = require('../../models');
const { query, validationResult } = require('express-validator');
const amountOfTasks = 10;
const authorization = require('../../authorization');
const { Op } = require('sequelize');

const get = Router.get(
  '/achievement',
  authorization,
  query('sort').optional().isString(),
  query('role').isNumeric(),
  query('approved').isBoolean().optional({ nullable: true, checkFalsy: true }),
  query('search').optional().isString(),
  async (req, res) => {
    const role = Number(req.query.role);
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const filter = {
        where: {},
      };

      if (role !== res.locals.role) {
        return res.status(403).send('Prohibited');
      }
      if (role === 0) {
        filter.where = { ...filter.where, owner: res.locals.id };
      }
      if (req.query.search !== undefined) {
        filter.where = {
          ...filter.where,
          [Op.or]: [
            { team: { [Op.like]: `%${req.query.search}%` } },
            { event: { [Op.like]: `%${req.query.search}%` } },
            { projectName: { [Op.like]: `%${req.query.search}%` } },
            { ownerFirstName: { [Op.like]: `%${req.query.search}%` } },
            { ownerLastName: { [Op.like]: `%${req.query.search}%` } },
            { ownerFatherName: { [Op.like]: `%${req.query.search}%` } },
          ],
        };
      }
      if (req.query.approved !== undefined) {
        filter.where = { ...filter.where, approved: req.query.approved };
      }
      console.log(filter);
      const items = await Achievement.findAndCountAll({
        limit: amountOfTasks,
        //offset: (req.query.page - 1) * amountOfTasks,
        offset: 0,
        where: filter.where,
        order: [['createdAt', req.query.sort]],
      });

      res.send(items);
    } catch (err) {
      return res.status(400).send(err.message);
    }
  },
);
module.exports = get;
