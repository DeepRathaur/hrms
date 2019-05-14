'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('employee_positions', {
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
      department_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'Departments',
          key: 'id',
        }
      },
      designation_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'Designations',
          key: 'id',
        }
      },
      grade_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'Grades',
          key: 'id',
        }
      },
      location_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'Employees',
          key: 'id',
        }
      },
      attendance_scheme_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'Attendance_scheme',
          key: 'id',
        }
      },
      reporting_to: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'location',
          key: 'id',
        }
      },
      effective_from: {
        allowNull: false,
        type: Sequelize.DATE
      },
      effective_to: {
        allowNull: false,
        type: Sequelize.DATE
      },
      reason: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      is_current: {
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
    return queryInterface.dropTable('employee_positions');
  }
};