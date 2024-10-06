'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Waitlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Waitlist.belongsTo(models.Event, { foreignKey: 'eventId' });
    }
  }
  Waitlist.init({
    eventId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    isDeleted: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Waitlist',
  });
  return Waitlist;
};