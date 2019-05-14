'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('locations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(200),
        allowNull:false
      },
      address: {
        type: Sequelize.TEXT,
        allowNull:true
      },
      contact: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      country_id: {
        type: Sequelize.INTEGER,
        allowNull:true,
        references: {
          model: 'Countries',
          key: 'id',
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('locations');
  }
};