'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('employee_idenities', {
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
      doc_type: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      doc_number: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      name_as_per_document: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      expiray_date: {
        type: Sequelize.DATE,
        allowNull:true
      },
      aadhar_enrolment_no: {
        type: Sequelize.STRING(255),
        allowNull:true
      },
      is_verified: {
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
    return queryInterface.dropTable('employee_idenities');
  }
};