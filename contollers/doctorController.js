const User = require('../modles/user')
const Profile = require('../modles/profile')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
exports.find = async (req, res) => {
    let { q } = req.query
    const searchQuery = q ? { name: { [Op.like]: `%${ q.replace(' ', '')}%` } } : { };
  
try {
    console.log(searchQuery)
    const Doctor = await User.findAll({
        where: { usertyoe: 'doctor',...searchQuery}
    
      
    })
    res.json({ d: Doctor })
} catch (error) {
    res.status(500).json({ message: 'Internal server error' });
}
}