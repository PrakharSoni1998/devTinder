const validator = require('validator')

const validateSignupData = (req)=>{
    const {firstName,lastName,emailId,password} = req.body
    if(!firstName && !lastName){
        throw new Error('Enter name please')
    }else if(!validator.isEmail(emailId)){
        throw new Error('Emter valid email')
    }else if(!validator.isStrongPassword(password)){
        throw new Error('Emter strong enough password')
    }
}

const validateEditUserProfileData = (req)=>{
    const validEditFields = ["firstName","lastName","age","skills","photoURL","about","gender"]
     
   let canEditUser = Object.keys(req.body).every(field=>validEditFields.includes(field))

   return canEditUser
}
module.exports ={
    validateSignupData,
    validateEditUserProfileData
}