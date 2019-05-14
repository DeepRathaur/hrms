'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('employeegps_trackings', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            employee_id: {
                type: Sequelize.INTEGER,
                allowNull:false
            },
            lattitude: {
                type: Sequelize.STRING(200),
                allowNull:false
            },
            longitude: {
                type: Sequelize.STRING(200),
                allowNull:false
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
        return queryInterface.dropTable('employeegps_trackings');
    }
};