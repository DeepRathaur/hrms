'use strict';
module.exports = (sequelize, DataTypes) => {
    const vendor_expertise = sequelize.define('vendor_expertise', {
        training_vendor_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        training_course_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: true
        },
    }, {});
    vendor_expertise.associate = function (models) {
        // associations can be defined here
        this.belongsTo(models.training_vendor, {foreignKey: 'training_vendor_id', sourceKey: 'id'});
        this.belongsTo(models.training_course, {foreignKey: 'training_course_id', sourceKey: 'id'});
    };
    vendor_expertise.prototype.toWeb = function (req) {
        let json = this.toJSON();
        return json;
    };
    return vendor_expertise;
};