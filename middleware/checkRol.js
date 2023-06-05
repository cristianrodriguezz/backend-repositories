const { handleHttpError } = require("../utils/handleError");

const checkRol = (roles) => (req, res, next) => {
  try {
    const {user}= req;
    console.log(user);
    const rolesByUser = user.role

    const checkValueRol = roles.some((rolSingle) => rolesByUser.includes(rolSingle) ) //true o false 
    
    if(!checkValueRol){
      handleHttpError(res, "USER_NOT_PERMISSIONS" , 403)
      return
    }
    next()
  } catch (e) {
    handleHttpError(res, "ERROR_PERMISSIONS" , 403)
  }
}

module.exports = { checkRol };
