'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Hr_forms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      serial: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      category: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull:true
      },
      file_path: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      employee_filter: {
        type: Sequelize.STRING(200),
        allowNull:true
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
    return queryInterface.dropTable('Hr_forms');
  }
};