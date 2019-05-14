'use strict';
module.exports = (sequelize, DataTypes) => {
    const training_course = sequelize.define('training_course', {
        name: {
            type: DataTypes.STRING(200),
            allowNull: false,
            unique:true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        remarks: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
    }, {});
    training_course.associate = function (models) {
        // associations can be defined here
        this.hasMany(models.course_topic, {foreignKey: 'course_id'});
        this.hasMany(models.vendor_expertise, {foreignKey: 'training_course_id'});
    };
    training_course.prototype.toWeb = function (req) {
        let json = this.toJSON();
        return json;
    };
    return training_course;
};