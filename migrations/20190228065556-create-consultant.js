'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('consultants', {
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
            mobile_no: {
                type: Sequelize.STRING(200),
                allowNull: true
            },
            email: {
                type: Sequelize.STRING(128),
                allowNull: false
            },
            address_line1: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            address_line2: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            city: {
                type: Sequelize.STRING(128),
                allowNull: true
            },
            state: {
                type: Sequelize.STRING(128),
                allowNull: true
            },
            pin_code: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            term_condition: {
                type: Sequelize.STRING(200),
                allowNull: true //  will hold the path of file uploaded for terms
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
        return queryInterface.dropTable('consultants');
    }
};