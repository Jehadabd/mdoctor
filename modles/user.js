const User=require('./db')
const { Sequelize, DataTypes } = require('sequelize');


const user = User.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },userTyoe:{
    type:Sequelize.DataTypes.ENUM('doctor','normal')
  },
  latitude:{
    type:Sequelize.DataTypes.FLOAT
  },
  longitude:{
    type:Sequelize.DataTypes.FLOAT
  }
}, {
  tableName: 'users',
  timestamps: false
});
User.associate=module=>{
    User.hasOne(module.Profile)
}
(async () => {
    await User.sync();
})();

module.exports = user;