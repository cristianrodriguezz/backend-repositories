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
      .select("password name lastName role email skills country experience favorite photo has_badge modality portfolio work social_media")
      .lean();
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

    const userWithoutPassword = { ...user, password: undefined };
    const userWithSocialMedia = { ...userWithoutPassword, social_media: user.social_media };

    const data = {
      token: await tokenSign(user),
      user: userWithSocialMedia,
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
const options = {
  page: 1, 
  limit: 10
}
const getAllRepositories = async (req, res) =>{
  try {
    const { limit , page } = req.query
    const data = await usersModel.paginate({},{limit: limit, page: page})
    const response = await data;
    res.send({ data });
  } catch (error) {
    console.log(error);
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
const addFav =async (req,res) => {
  try {
    const {id} = req.params
    const newFavorite = req.body

    const fav = await usersModel.findByIdAndUpdate(id, { $push: { favorites: newFavorite.favorites } })
    res.send({fav})
  } catch (error) {
    console.log(error)
  }

}
const deleteAdd = async (req,res) => {
  try {
    const {id} = req.params
    const favoriteIdToDelete = req.body
    const fav = await usersModel.findByIdAndUpdate(id, { $pull: { favorites: favoriteIdToDelete.favorites } })
    res.send({fav})
  } catch (error) {
    console.log(error)
  }
}
module.exports = { registerUser, loginUser, getAllUser, updateUser , getAllRepositories, getRepositorieById, addFav, deleteAdd};
