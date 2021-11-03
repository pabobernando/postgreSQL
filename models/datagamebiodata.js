'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DataGameBiodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  DataGameBiodata.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    umur: DataTypes.INTEGER,
    alamat: DataTypes.STRING,
    nickname: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'DataGameBiodata',
  });
  return DataGameBiodata;
};