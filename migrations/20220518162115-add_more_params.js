'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Achievement', 'team', {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      }),
      queryInterface.addColumn('Achievement', 'result', {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      }),
      queryInterface.addColumn('Achievement', 'event', {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Achievement', 'team'),
      queryInterface.removeColumn('Achievement', 'result'),
      queryInterface.removeColumn('Achievement', 'event'),
    ]);
  },
};
