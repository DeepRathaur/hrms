'use strict';
module.exports = (sequelize, DataTypes) => {
    const policy_guideline = sequelize.define('policy_guideline', {
        name: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        attachment: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue:1
        },
    }, {});
    policy_guideline.associate = function (models) {
        // associations can be defined here
    };
    policy_guideline.prototype.toWeb = function (req) {
        let json = this.toJSON();
        return json;
    };
    return policy_guideline;
};