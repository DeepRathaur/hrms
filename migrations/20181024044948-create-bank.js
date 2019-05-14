'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Banks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(200),
        allowNull:false,
        //unique:true
      },
      ifsc_code: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      micr_code: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      branch: {
        type: Sequelize.STRING(100),
        allowNull:true
      },
      address: {
        type: Sequelize.TEXT,
        allowNull:true
      },
      contact: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      city: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      district: {
        type: Sequelize.STRING(200),
        allowNull:true
      },
      state: {
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
    return queryInterface.dropTable('Banks');
  }
};