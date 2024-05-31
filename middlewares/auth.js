const jwt=require('jsonwebtoken')
const isLoggedIn=async(req,res,next)=>{
    try{
      if(!req.headers.authorization){
         return res.status(400).json({
            masseage:" Error"
         })
      }
      const token=req.headers.authorization.split(" ")[1];
      const decoded=jwt.verify(token,process.env.JWT_SECRET)
      req.currentUser=decoded;
      next()
    }catch(e){
        res.status(500).json({
            masseage:e.masseage
        })
    }
}
module.exports=isLoggedIn