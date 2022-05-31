const e = require('express');
const Router = e.Router();
const { query, validationResult } = require('express-validator');
const { Product } = require('../../models');
const authorization = require('../../authorization');
const buyProduct = Router.patch(
  '/buy',
  authorization,
  query('id').isString(),

  async (req, res) => {
    console.log(req);
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()[0].msg });
      }
      const product = await Product.findOne({
        where: { id: req.query.id },
      });
      if (!product) throw new Error('Product with such email does not exist');
      console.log('here');
      await Product.update(
        { quantity: product.quantity - 1 },
        {
          where: { id: req.query.id },
          returning: true,
        },
      );

      res.send({
        success: true,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
);
module.exports = buyProduct;
