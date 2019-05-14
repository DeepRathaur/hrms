'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('employee_generated_letters', {
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
      letter_template: {
        type: Sequelize.STRING(200),
        allowNull:false
      },
      serial_no: {
        type: Sequelize.STRING(200),
        allowNull:false
      },
      authorized_signatory: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'Employees',
          key: 'id',
        }
      },
      remarks: {
        type: Sequelize.TEXT,
        allowNull:true
      },
      file_path: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      letter_generated_on: {
        type: Sequelize.DATE,
        allowNull:false,
        defaultValue:Sequelize.DATE
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
    return queryInterface.dropTable('employee_generated_letters');
  }
};