'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('training_vendors', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING(200),
                allowNull: false
            },
            contact_name: {
                type: Sequelize.STRING(100),
                allowNull: true
            },
            contact_number: {
                type: Sequelize.STRING(255),
                allowNull: true
            },
            address: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            remarks: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            status:{
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
        return queryInterface.dropTable('training_vendors');
    }
};