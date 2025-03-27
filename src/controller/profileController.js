const { validateEditUserProfileData } = require("../utils/validate");
const bcrypt = require('bcrypt')
const validator = require('validator')

const getUserProfile = async (req, res) => {
  try {
    const user = req.user;
    res.json({ data: user, status: 200, message: "Prfile data fetched." });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const editUserProfile = async (req, res) => {
  try {
    const canUserEdit = validateEditUserProfileData(req);
    if (!canUserEdit) return res.status(400).send("Invalid data");
    const userData = req.user;
    Object.keys(req.body).forEach(
      (field) => (userData[field] = req.body[field])
    );
    console.log("userData", userData);
    await userData.save();
    res.json({
      data: userData,
      status: 200,
      message: `${userData.firstName}, you update your profile successfully`,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateUserPassword = async (req,res)=>{
    try {
        const {oldPassword,newPassword} =req.body
        if(!oldPassword || !newPassword){
            throw new Error("Please enter existing and new password.");   
        }else{
            const user = req.user
            const isPasswordMatched = await bcrypt.compare(oldPassword, user.password);
            if(!isPasswordMatched){
                throw new Error("Old Password not matched.");
            }
            isNewPasswordStrong = validator.isStrongPassword(newPassword)
            if(!isNewPasswordStrong){
                throw new Error("New Password should be strong");
            }
            const newPasswordHash = await bcrypt.hash(newPassword, 10);
            user.password = newPasswordHash
            await user.save()
            res.json({data:user,status:200,message:"Password updated successfully."})
        }
    } catch (error) {
    res.status(400).send(error.message);
    }
}
module.exports = {
  getUserProfile,
  editUserProfile,
  updateUserPassword
};
