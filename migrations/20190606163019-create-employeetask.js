'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('employeetasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(200),
        allowNull:false
      },
      allotedto: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      review_by: {
        type: Sequelize.INTEGER,
        allowNull:true
      },
      review_remarks: {
        type: Sequelize.TEXT,
        allowNull:true
      },
      remarks: {
        type: Sequelize.TEXT,
        allowNull:true
      },
      review_status: {
        type: Sequelize.STRING(200),
        allowNull:true    //completed,pending,in progress
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue:1,
        allowNull:true    
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
    return queryInterface.dropTable('employeetasks');
  }
};