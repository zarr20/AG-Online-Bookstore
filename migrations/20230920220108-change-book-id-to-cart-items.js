'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.removeColumn('Orders', 'book_id');
    await queryInterface.addColumn('Orders', 'cartItems', {
      type: Sequelize.JSON,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Orders', 'cartItems');
    await queryInterface.addColumn('Orders', 'book_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};