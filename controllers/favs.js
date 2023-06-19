const { favsModel } = require("../models/index");
const { matchedData } = require("express-validator");
const { usersModel } = require("../models/index");
const { handleHttpError } = require("../utils/handleError");

const addFav = async (req, res) => {
  const userId = req.body.userId; // ID del usuario a agregar a favoritos
  const userToAddToFavorites = { userId: userId };

  const response = await favsModel.updateOne(
    { _id: req.user._id }, // Supongamos que tienes información del usuario autenticado en req.user
    { $addToSet: { repositorieId: userToAddToFavorites } }
  );
  res.send({response})
  // const { id } = req.params;
  // const { repositorieId } = req.body;

  // console.log({ id });
  // try {
  //   const response = await usersModel.findById(id);
  //   const data = await response;
  //   if (!data) {
  //     return handleHttpError(res, "No existe el repositorio", 404);
  //   }
  //   const addFav = await favsModel.updateOne({
  //     userId: id,
  //     repositoriosId: repositorieId,
  //   });

  //   res.send({ addFav });
  // } catch (e) {
  //   console.log(e);
  // }
};

const getAllFavs = async (req, res) => {


  //   try {
  //     const {id} = req.params

  //     const response = favsModel.find({userId: id}).toArray()
  //     res.send({response})
  //   } catch (error) {
  //     console.log(error)
  //   }
};

module.exports = { addFav, getAllFavs };
