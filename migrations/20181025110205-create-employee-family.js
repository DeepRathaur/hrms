'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Employee_families', {
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
      name: {
        type: Sequelize.STRING(200),
        allowNull:false
      },
      relation: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      dateofbirth: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      blood_group: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      gender: {
        type: Sequelize.STRING(10),
        allowNull:true
      },
      profession: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      remarks: {
        type: Sequelize.TEXT,
        allowNull:true
      },
      nationality_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'Nationalities',
          key: 'id',
        }
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
    return queryInterface.dropTable('Employee_families');
  }
};