'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Weekend_policies', {
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
      saturday_week1: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:0
      },
      saturday_week2: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:0
      },
      saturday_week3: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:0
      },
      saturday_week4: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:0
      },
      saturday_week5: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:0
      },
      sunday_week1: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:0
      },
      sunday_week2: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:0
      },
      sunday_week3: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:0
      },
      sunday_week4: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:0
      },
      sunday_week5: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:0
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:1
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
    return queryInterface.dropTable('Weekend_policies');
  }
};