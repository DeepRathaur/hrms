'use strict';
module.exports = (sequelize, DataTypes) => {
    const vendor_personnel = sequelize.define('vendor_personnel', {
        vendor_id: {
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        employee_id: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        designation_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        expertise: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        contact_no: {
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
    vendor_personnel.associate = function (models) {
        // associations can be defined here
        this.belongsTo(models.training_vendor, {foreignKey: 'vendor_id', sourceKey: 'id'});
        this.belongsTo(models.Designation, {foreignKey: 'designation_id', sourceKey: 'id'});
        this.hasMany(models.trainers_external,{foreignKey:'vaendor_personnel_id',targetKey:'id'});
    };

    vendor_personnel.prototype.toWeb = function (req) {
        let json = this.toJSON();
        return json;
    };
    return vendor_personnel;
};