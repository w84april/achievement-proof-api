'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Image', 'createdAt', {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      }),
      queryInterface.addColumn('Image', 'updatedAt', {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([queryInterface.removeColumn('Image', 'createdAt'), queryInterface.removeColumn('Image', 'updatedAt')]);
  },
};
