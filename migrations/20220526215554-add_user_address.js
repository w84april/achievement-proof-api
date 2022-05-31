'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn('User', 'address', {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeColumn('User', 'address');
  },
};
