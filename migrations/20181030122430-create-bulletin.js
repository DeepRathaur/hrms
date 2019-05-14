'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Bulletins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      rank: {
        type: Sequelize.INTEGER(10),
        allowNull:true
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull:true
      },
      title: {
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
    return queryInterface.dropTable('Bulletins');
  }
};