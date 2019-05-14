'use strict';
module.exports = (sequelize, DataTypes) => {
    const training_vendor = sequelize.define('training_vendor', {
        name: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        contact_name: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        contact_number: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        remarks: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        status:{
            type: DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:1
        },
    }, {});
    training_vendor.associate = function (models) {
        // associations can be defined here
        this.hasMany(models.vendor_personnel, {foreignKey: 'vendor_id', sourceKey: 'id'});
        this.hasMany(models.vendor_expertise, {foreignKey: 'training_vendor_id', sourceKey: 'id'});
    };
    training_vendor.prototype.toWeb = function (req) {
        let json = this.toJSON();
        return json;
    };

    return training_vendor;
};