'use strict';
module.exports = (sequelize, DataTypes) => {
    const attendance_regularization = sequelize.define('attendance_regularization', {
        employee_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        apply_to: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        swipe_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        punch_in: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        punch_out: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        reason: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        is_accepted: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
            allowNull: false
        },
        is_rejected: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
            allowNull: false
        },
        is_withdraw: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
            allowNull: false
        },
        remarks: {
            type: DataTypes.TEXT,
            allowNull: true
        },
    }, {});
    attendance_regularization.associate = function (models) {
        // associations can be defined here
        this.belongsTo(models.Employee, {foreignKey: 'employee_id', sourceKey: 'id'});
        this.belongsTo(models.Employee, {foreignKey: 'apply_to', sourceKey: 'id', as :'rmEmpid'});
    };
    attendance_regularization.prototype.toWeb = function (req) {
        let json = this.toJSON();
        return json;
    };
    return attendance_regularization;
};