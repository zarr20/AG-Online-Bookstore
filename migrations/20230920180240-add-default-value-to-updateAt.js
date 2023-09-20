'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Books', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Books', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false, // Mengizinkan nilai null kembali
      defaultValue: null, // Menghapus nilai default
    });
  },
};