'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('profile_shared_for_reviews', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            profile_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            shared_by: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            review_by: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            shared_date: {
                type: Sequelize.DATE,
                allowNull: true
            },
            review_date: {
                type: Sequelize.DATE,
                allowNull: true
            },
            review_comment: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            is_shortlisted: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue:0
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
        return queryInterface.dropTable('profile_shared_for_reviews');
    }
};