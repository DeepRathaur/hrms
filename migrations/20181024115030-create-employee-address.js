'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Employee_addresses', {
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
        type: Sequelize.STRING(100),
        allowNull:true
      },
      address_type: {
        type: Sequelize.STRING(200),
        allowNull:false
      },
      address1: {
        type: Sequelize.TEXT,
        allowNull:true
      },
      address2: {
        type: Sequelize.TEXT,
        allowNull:true
      },
      address3: {
        type: Sequelize.TEXT,
        allowNull:true
      },
      city: {
        type: Sequelize.STRING,
        allowNull:true
      },
      state_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'States',
          key: 'id',
        }
      },
      country_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'Countries',
          key: 'id',
        }
      },
      pin: {
        type: Sequelize.STRING(100),
        allowNull:true
      },
      phone1: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      phone2: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      fax: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      mobile: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      email: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      extn_no: {
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
    return queryInterface.dropTable('Employee_addresses');
  }
};