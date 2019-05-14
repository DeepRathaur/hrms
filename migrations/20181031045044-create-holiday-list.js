'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Holiday_lists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      holiday_date: {
        type: Sequelize.DATEONLY,
        allowNull:false
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull:true
      },
      is_optional: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:0
      },
      location_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'locations',
          key: 'id',
        }
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue:1,
        allowNull:false
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
    return queryInterface.dropTable('Holiday_lists');
  }
};