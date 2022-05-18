'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Achievement', 'createdAt', {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      }),
      queryInterface.addColumn('Achievement', 'updatedAt', {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([queryInterface.removeColumn('Achievement', 'createdAt'), queryInterface.removeColumn('Achievement', 'updatedAt')]);
  },
};
