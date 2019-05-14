'use strict';
module.exports = (sequelize, DataTypes) => {
    const training = sequelize.define('training', {
        name: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        course_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        // course_topic_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        no_of_days: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        training_provider: {
            type: DataTypes.STRING(100),
            allowNull: false // internal,or external
        },
        delivery_location: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        delivery_method: {
            type: DataTypes.STRING(200),
            allowNull: true // Self study , classroom, Webex
        },
        training_cost: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING(200),
            allowNull: true // SCHEDULED, COMPLETED, CANCELLED
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1
        }
    }, {});
    training.associate = function (models) {
        // associations can be defined here
        this.belongsTo(models.training_course, {foreignKey: 'course_id', sourceKey: 'id'});
        // this.belongsTo(models.course_topic, {foreignKey: 'course_topic_id', sourceKey: 'id'});
        this.hasMany(models.training_material, {foreignKey : 'training_id'});
        this.hasMany(models.trainers_internal, {foreignKey : 'training_id'});
        this.hasMany(models.trainers_external, {foreignKey : 'training_id'});
        this.hasMany(models.participant, {foreignKey : 'training_id'});
        this.hasMany(models.training_feedback, {foreignKey : 'training_id'});
    };
    training.prototype.toWeb = function (req) {
        let json = this.toJSON();
        return json;
    };
    return training;
};