'use strict';
const bcrypt 			  = require('bcrypt');
const bcrypt_p 			= require('bcrypt-promise');
const jwt           = require('jsonwebtoken');
const { TE, to }    = require('../services/util.service');
const PARAMS        = require('../config/globalparams');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: PARAMS.userRoles.guest,
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique:true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    logdate: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "Login time",
    },
    lognum: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Total Login time",
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1,
      comment: "0 for disable and 1 is active",
    },
    extra: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "Extra information of user",
    },
    rp_token: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "reset password token",
    },
    rp_token_created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "reset password token created",
    },
  }, {});
  Users.associate = function (models) {
    // associations can be defined here
    this.belongsTo(models.Roles, { foreignKey: 'role_id', sourceKey: 'id' });
    this.hasOne(models.Employee, {foreignKey: 'user_id', sourceKey: 'id'});
  };

  Users.beforeSave(async (user, options) => {
    let err;
    if (user.changed('password')) {
      let salt, hash
      [err, salt] = await to(bcrypt.genSalt(10));
      if (err) TE(err.message, true);

      [err, hash] = await to(bcrypt.hash(user.password, salt));
      if (err) TE(err.message, true);

      user.password = hash;
    }
  });

  Users.prototype.comparePassword = async function (pw) {
    let err, pass
    if (!this.password) TE('password not set');

    [err, pass] = await to(bcrypt_p.compare(pw, this.password));
    if (err) TE(err);

    if (!pass) TE('invalid password');

    return this;
  }

  Users.prototype.getJWT = function () {
    let expiration_time = parseInt(PARAMS.jwt_expiration);
    return "Bearer " + jwt.sign({ user_id: this.id }, PARAMS.jwt_encryption, { expiresIn: expiration_time });
  };

  Users.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };

  return Users;
};