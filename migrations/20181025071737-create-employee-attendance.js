'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Employee_attendances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      employee_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'Employees',
          key: 'id',
        }
      },
      swipe_date: {
        type: Sequelize.DATE,
        allowNull:false,
      },
      punch_in: {
        type: Sequelize.DATE,
        allowNull:false,
      },
      punch_out: { 
        type: Sequelize.DATE,
        allowNull:false,
      },
      door: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      late: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      early_leaving: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      overtime: {
        type: Sequelize.STRING,
        allowNull:true,
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
    return queryInterface.dropTable('Employee_attendances');
  }
};