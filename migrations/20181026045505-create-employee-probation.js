'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Employee_probations', {
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
      extend_period: {
        type: Sequelize.INTEGER,
        allowNull:true
      },
      revised_confirm_date: {
        type: Sequelize.DATE,
        allowNull:true
      },
      reason_of_extension: {
        type: Sequelize.STRING(200),
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
    return queryInterface.dropTable('Employee_probations');
  }
};