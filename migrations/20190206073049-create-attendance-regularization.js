'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('attendance_regularizations', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            employee_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Employees',
                    key: 'id',
                }
            },
            swipe_date: {
                type: Sequelize.DATEONLY,
                allowNull: false
            },
            punch_in: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            punch_out: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            reason: {
                type: Sequelize.TEXT,
                allowNull:true
            },
            is_accepted: {
                type: Sequelize.BOOLEAN,
                defaultValue:0,
                allowNull:false
            },
            is_rejected: {
                type: Sequelize.BOOLEAN,
                defaultValue:0,
                allowNull:false
            },
            remarks: {
                type: Sequelize.TEXT,
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
        return queryInterface.dropTable('attendance_regularizations');
    }
};