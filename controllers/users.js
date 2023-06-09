const { matchedData } = require("express-validator");
const { usersModel } = require("../models/index");
const { handleHttpError } = require("../utils/handleError");
const { encrypt, compare } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/handleJwt");

const registerUser = async (req, res) => {
  try {
    req = matchedData(req);

    const userFind = await usersModel.findOne({ email: req.email });
    if (userFind) {
      handleHttpError(res, "Hay un email registrado con ese email", 400);
      return;
    }
    const passwordHash = await encrypt(req.password);
    const body = { ...req, password: passwordHash };
    const dataUser = await usersModel.create(body);
    dataUser.set("password", undefined, { strict: false });

    const data = {
      token: await tokenSign(dataUser),
      user: dataUser,
    };

    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_REGISTER_USER", 400);
  }
};
const loginUser = async (req, res) => {
  try {
    req = matchedData(req);
    const user = await usersModel
      .findOne({ email: req.email })
      .select("password name role email social_media skills country experience favorite photo has_badge modality portfolio work");
    if (!user) {
      handleHttpError(res, "USER_NOT_EXISTS", 404);
      return;
    }

    const hashPassword = user.password;
    const check = await compare(req.password, hashPassword);

    if (!check) {
      handleHttpError(res, "PASSWORD_INVALD", 401);
      return;
    }
    user.set("password", undefined, { strict: false });

    const data = {
      token: await tokenSign(user),
      user,
    };

    res.send({ data });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_LOGIN_USER", 400);
  }
};
const getAllUser = async (req, res) => {
  req = matchedData(req);
  const users = await usersModel.find({});
  res.send({ users });
};
const updateUser = async (req, res) => {

  const body  = req.body
  const  id = req.params.id
  const user = await usersModel.findOneAndUpdate({_id: id}, body, { new: true })
  res.json({user})
};
const getAllRepositories = async (req, res) =>{
  try {
    const data = await usersModel.find({}).select("name lastName social_media skills country experience favorite photo has_badge modality portfolio work")
    const response = await data;
    res.send({ data });
  } catch (error) {
    console.log(error);
    console.log("no se pudo hacer esa");
  }
}
const getRepositorieById = async (req, res) =>{
  try {

    const id = req.params.id
    const data = await usersModel.find({_id : id})
    if(!data){
      handleHttpError(res, "NO_EXIST_REPOSITORY",404 )
      return
    }
    res.send({data})
    
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEM",404 )
  }
}

module.exports = { registerUser, loginUser, getAllUser, updateUser , getAllRepositories, getRepositorieById};
