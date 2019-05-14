'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Employee_qualifications', {
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
      from_year: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      to_year: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      qualification: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      duration: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      institute: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      university: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      qualification_level: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      qualification_area: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      grade: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      remarks: {
        type: Sequelize.TEXT,
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
    return queryInterface.dropTable('Employee_qualifications');
  }
};