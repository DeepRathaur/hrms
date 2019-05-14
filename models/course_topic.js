'use strict';
module.exports = (sequelize, DataTypes) => {
    const course_topic = sequelize.define('course_topic', {
        course_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1
        },
    }, {});
    course_topic.associate = function (models) {
        // associations can be defined here
        this.belongsTo(models.training_course, {foreignKey: 'course_id', sourceKey: 'id'});
        // this.hasMany(models.training, {foreignKey: 'course_topic_id', sourceKey: 'id'});
    };
    course_topic.prototype.toWeb = function (req) {
        let json = this.toJSON();
        return json;
    };
    return course_topic;
};