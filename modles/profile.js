
const { Sequelize, DataTypes } = require('sequelize');
const Doctor=require('./db')

const profile = Doctor.define('Profile', {
specialization:{
    type:Sequelize.DataTypes.STRING
},
address:{
    type:Sequelize.DataTypes.STRING
},
workingHours:{
    type:Sequelize.DataTypes.STRING
},
phone:{
    type:Sequelize.DataTypes.STRING
}
}, {
  tableName: 'profiles',
  timestamps: false
});

profile.associate=module=>{
    profile.hasOne(module.User)
}

(async () => {
    await Doctor.sync();
})();
module.exports = profile;