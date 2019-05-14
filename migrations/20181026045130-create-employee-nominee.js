'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('employee_nominees', {
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
      nominee_for: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      family_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'Employee_families',
          key: 'id',
        }
      },
      nomination_percent: {
        type: Sequelize.INTEGER,
        allowNull:true
      },
      is_mental_illness: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:0
      },
      is_minor: {
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
    return queryInterface.dropTable('employee_nominees');
  }
};