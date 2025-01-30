const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');


const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  email: {
    type: DataTypes.STRING,
  },
  password:{
    type:DataTypes.STRING,
  },

  profileImage:{
    type:DataTypes.STRING,
  },

  username:{
    type:DataTypes.STRING,
  },


 createdAt:{
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
 },

 updatedAt:{
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
 }
}, {
  tableName: 'user',
});


module.exports = User;
