'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('orders', 'quantity');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('orders', 'quantity', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};
