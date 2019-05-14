'use strict';
module.exports = (sequelize, DataTypes) => {
    const consultant = sequelize.define('consultant', {
        name: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        mobile_no: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        address_line1: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        address_line2: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        city: {
            type: DataTypes.STRING(128),
            allowNull: true
        },
        state: {
            type: DataTypes.STRING(128),
            allowNull: true
        },
        pin_code: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        term_condition: {
            type: DataTypes.STRING(200),
            allowNull: true //  will hold the path of file uploaded for terms
        }
    }, {});
    consultant.associate = function (models) {
        // associations can be defined here
        this.hasMany(models.job_publish, {foreignKey: 'consultant_id', sourceKey: 'id'});
        this.hasMany(models.recruitment_profile, {foreignKey: 'consultant_id', sourceKey: 'id'});
    };
    consultant.prototype.toWeb = function (req) {
        let json = this.toJSON();
        return json;
    };
    return consultant;
};