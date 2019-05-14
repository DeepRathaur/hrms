'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Employee_leaves', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      leavegrantemployee_id: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      employee_id: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      leave_type_id: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      leave_year: {
        type: Sequelize.STRING(100),
        allowNull:false
      },
      leave_month: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      leave_credit: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      leave_availed: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      leave_deduction: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      leave_lapsed: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      leave_encashed: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      leave_balance : {
        type: Sequelize.INTEGER,
        allowNull:false
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
    return queryInterface.dropTable('Employee_leaves');
  }
};