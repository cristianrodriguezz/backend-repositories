const { matchedData } = require("express-validator");
const { repositoriesModel } = require("../models/index");
const { handleHttpError } = require("../utils/handleError");

const getRepositories = async (req, res) => {
  try {
    const data = await repositoriesModel.find({});
    const response = await data;
    res.send({ data });
  } catch (error) {
    console.log(error);
    console.log("no se pudo hacer esa");
  }
};
const getRepositoryByUserId = async (req, res) => {
  try {
    req = matchedData(req)
    const {id} = req
    const data = await repositoriesModel.find({userId : id})
    if(!data){
      handleHttpError(res, "NO_EXIST_REPOSITORY",404 )
      return
    }
    res.send({data})
    
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEM",404 )
  }
};
const createRepository = async (req, res) => {
  try {
    const body = req.body;
    const data = await repositoriesModel.create(body);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_CREATE_REPOSITORY", 400);
  }
};
const updateRepository = async (req, res) => {
  const { body } = req;
  const { _id: id } = body;
  const data = await repositoriesModel.updateOne(
    { _id: id },
    { $set: { ...body } }
  );
  res.send({ data });
};
const deleteRepository = (req, res) => {};

module.exports = {
  getRepositories,
  getRepositoryByUserId,
  createRepository,
  updateRepository,
  deleteRepository,
};
