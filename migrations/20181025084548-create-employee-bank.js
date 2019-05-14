'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Employee_banks', {
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
      bank_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'Bank',
          key: 'id',
        }
      },
      account_number: {
        type: Sequelize.STRING(255),
        allowNull:false
      },
      account_type: {
        type: Sequelize.STRING(200),
        allowNull:false
      },
      name_as_per_bank: {
        type: Sequelize.STRING(200),
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
    return queryInterface.dropTable('Employee_banks');
  }
};