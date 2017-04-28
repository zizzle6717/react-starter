'use strict';

module.exports = function (sequelize, DataTypes) {
  var Provider = sequelize.define('Provider', {
    'name': DataTypes.STRING,
    'dba': DataTypes.STRING,
    'email': DataTypes.STRING,
    'identifier': DataTypes.STRING,
    'identifierType': DataTypes.STRING,
    'legalName': DataTypes.STRING,
    'phone': DataTypes.STRING,
    'providerNumber': DataTypes.STRING,
    'state': {
      'type': DataTypes.STRING,
      'defaultValue': 'active'
    }
  }, {
    'classMethods': {
      'associate': function associate(models) {
        Provider.hasMany(models.Contact);
      }
    }
  });
  return Provider;
};