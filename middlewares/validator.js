
const{body,validationResult}=require('express-validator')
const userValidatorRrules=()=>{
    return[
        body("name").notEmpty().withMessage(' not found name'),
        body("email").notEmpty().withMessage(' not found email'),
        body("email").isEmail().withMessage(' the Email is wrong'),
        body("password").notEmpty().withMessage(' not found password'),
        body("password").isLength({min:8}).withMessage(' the password is min'),
        body("password").isLength({max:20}).withMessage(' the password is max')
    ]

}
const validate=(req,res,next)=>{
    const errors = validationResult(req)
    if (errors.isEmpty()){
        return next()
    }
    return res.status(400).json({
        errors:errors.array()
    })
}
module.exports={
    userValidatorRrules,
    validate}