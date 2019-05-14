'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('vendor_personnels', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            vendor_id: {
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING(200),
                allowNull:false
            },
            employee_id: {
                type: Sequelize.INTEGER,
                allowNull:true
            },
            designation_id: {
                type: Sequelize.INTEGER,
                allowNull:true
            },
            expertise: {
                type: Sequelize.STRING(200),
                allowNull:false
            },
            contact_no: {
                type: Sequelize.STRING(255),
                allowNull:true
            },
            address: {
                type: Sequelize.TEXT,
                allowNull:true
            },
            remarks: {
                type: Sequelize.TEXT,
                allowNull:true
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
        return queryInterface.dropTable('vendor_personnels');
    }
};