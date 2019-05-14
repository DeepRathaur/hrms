'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Leave_types', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(200),
        allowNull:false,
        unique:true
      },
      allow_emp_to_apply: {
        type: Sequelize.INTEGER(10),
        allowNull:true
      },
      sort_order: {
        type: Sequelize.INTEGER(10),
        allowNull:true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull:true
      },
      leave_granting_frequency: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      max_leave_for_period: {
        type: Sequelize.INTEGER(5),
        allowNull:true
      },
      expires_after_days: {
        type: Sequelize.INTEGER(5),
        allowNull:true
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
    return queryInterface.dropTable('Leave_types');
  }
};