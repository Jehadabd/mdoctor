const User = require('../modles/user')
const Profile = require('../modles/profile')
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
async function userCreate(name, email, password, userType, longitude = null, latitude = null, profile1 = null) {
    const id = async (profile) => {
        if (profile == null) {
            return null
        } else {
            return profile.id
        }
    }
    const user = await new User({
        name: name,
        email: email,
        password: await bcrypt.hash(password, 10),
        userTyoe: userType,
        longitude: longitude,
        latitude: latitude,
        ProfileId: await id(profile1)
    })
    return await user.save()
}
exports.regoster = async (req, res) => {
    const { name, email, password, userType, location, workingHours, address, specialization, phone } = req.body;
    try {
        if (userType === 'doctor') {
            const profile = await new Profile({
                workingHours: workingHours,
                address: address,
                specialization: specialization,
                phone: phone
            })
            userCreate(name, email, password, userType, location.longitude, location.latitude, profile)
            await profile.save()
        }
        else {
            userCreate(name, email, password, userType)
        }
        res.json({
            message: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
exports.login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ where: { email } })
        console.log(user.password)
        if (user) {
            const passWord= await bcrypt.compare(password, user.password)
            console.log(passWord)
            if (passWord) {
                const token= jwt.sign({id:user.id,email:user.email,name:user.name},process.env.JWT_SECRET)
                 res.status(200).json({
                    token:token
                })
            }
        else{
                return res.status(401).json({
                    massage: "The email or password is wrong"
                })
        } 
        } else{
            return res.status(401).json({
                massage: "The email or password is wrong"
            })
         }
    } catch (error) {

        res.status(500).json({ message: 'Internal server error' });
    }
}
exports.me=async(req,res)=>{
    const  user= req.currentUser
    res.status(200).json({
        isUesr:user
    })
}
exports.getProfile=async(req,res)=>{
    console.log(req.currentUser.id)
    try {
        console.log(req.currentUser.id)
      const result= await User.findOne({where:{id:req.currentUser.id}})
      
      if(result){
        const resultProfile= await Profile.findByPk(result.ProfileId)
        if (resultProfile){
             res.status(200).json({
                massage:resultProfile
             })
        }else{
            return res.status(401).json({
                massage: "The name  is not doctor"
            })
        }
      }else{
        return res.status(401).json({
            massage: "The name  is not find"
        })
      }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}
