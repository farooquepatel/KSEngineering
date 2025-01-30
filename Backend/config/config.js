const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('ksengineering','root','root',{
    host:'localhost',
    dialect : 'mysql'
})

module.exports=sequelize;