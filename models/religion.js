'use strict';
module.exports = (sequelize, DataTypes) => {
    var Religion = sequelize.define('Religion', {
        name: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1
        },
    }, {});
    Religion.associate = function (models) {
        // associations can be defined here
        this.hasMany(models.Employee, {foreignKey: 'religion', sourceKey: 'id'});
    };
    Religion.prototype.toWeb   =   function (pw) {
        let json    =   this.toJSON();
        return json;
    }
    return Religion;
};