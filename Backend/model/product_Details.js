const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const ProductDetails = sequelize.define('ProductDetails', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    
  },

  application: {
    type: DataTypes.STRING,
      
  },

  price: {
    type: DataTypes.STRING,
    
  },

  power: {
    type: DataTypes.STRING,
    
  },

  capacity: {
    type: DataTypes.STRING,
    
  },

  material: {
    type: DataTypes.STRING,
    
  },

  powerSource: {
    type: DataTypes.STRING,
    
  },

  phase: {
    type: DataTypes.STRING,
    
  },

  brand: {
    type: DataTypes.STRING,
    
  },

  frequency: {
    type: DataTypes.STRING,
    
  },

  image:{
   type:DataTypes.STRING,
  },

  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, 
  },

  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,  
  }
}, {
  tableName: 'product_details', 
 
});

module.exports = ProductDetails;
