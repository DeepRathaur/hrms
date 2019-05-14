'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('course_topics', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            course_id: {
                type: Sequelize.INTEGER,
                allowNull:false
            },
            name: {
                type: Sequelize.STRING(200),
                allowNull:false
            },
            description: {
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
        return queryInterface.dropTable('course_topics');
    }
};