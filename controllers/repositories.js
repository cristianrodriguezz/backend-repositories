const { repositoriesModel } = require("../models/index");

const getRepositories = async (req, res) => {
  const data = await repositoriesModel.find({});

  res.send({ data });
};
const getRepositorie = (req, res) => {};
const createRepositorie = async (req, res) => {
  const body = req.body;
  console.log(body);
  const data = await repositoriesModel.create(body);
  res.send({ body });
};
const updateRepositorie = async (req, res) => {
  const { body } = req;
  const {_id: id} = body;
  console.log(id);
  const data = await repositoriesModel.updateOne({ _id: id }, { $set: { ...body } });
  res.send({data})
};
const deleteRepositorie = (req, res) => {};

module.exports = {
  getRepositories,
  getRepositorie,
  createRepositorie,
  updateRepositorie,
  deleteRepositorie,
};
