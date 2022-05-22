'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn('Achievement', 'projectName', {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('Achievement', 'projectName');
  },
};
