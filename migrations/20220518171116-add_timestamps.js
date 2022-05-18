'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('User', 'createdAt', {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      }),
      queryInterface.addColumn('User', 'updatedAt', {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([queryInterface.removeColumn('User', 'createdAt'), queryInterface.removeColumn('User', 'updatedAt')]);
  },
};
