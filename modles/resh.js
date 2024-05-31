const {Sequelize}=require('sequelize')
const db=require('./db')
const User=require('./user')
const Profile=require('./profile')
const models={
    User:User,
    Profile:Profile
}
Object.keys(models).forEach(key=>{
    if ("associate" in models[key]){
  models[key].associate(models)
    }
})
models.exports=models