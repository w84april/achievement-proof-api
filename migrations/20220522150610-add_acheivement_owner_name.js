'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Achievement', 'ownerFirstName', {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      }),
      queryInterface.addColumn('Achievement', 'ownerLastName', {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      }),
      queryInterface.addColumn('Achievement', 'ownerFatherName', {
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
      queryInterface.removeColumn('Achievement', 'ownerFirstName'),
      queryInterface.removeColumn('Achievement', 'ownerLastName'),
      queryInterface.removeColumn('Achievement', 'ownerFatherName'),
    ]);
  },
};
