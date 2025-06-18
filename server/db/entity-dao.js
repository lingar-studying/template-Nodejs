
// ==== server/db/entity-dao.js ====
const mongoose = require('mongoose');
const { connectDB2 } = require('./db-services');

const getAllEntities = async (entityName, optionalSchema = null) => {
  await connectDB2();
  let EntityModel = getModel(entityName, optionalSchema);
  return await EntityModel.find();
};

const getEntity = async (entityName, id, optionalSchema = null) => {
  let EntityModel = getModel(entityName, optionalSchema);
  return await EntityModel.findById(id);
};

const createEntity = async (data, entityName, optionalSchema = null) => {
  let EntityModel = getModel(entityName, optionalSchema);
  const newItem = new EntityModel(data);
  return await newItem.save();
};

const updateEntity = async (data, entityName, optionalSchema = null) => {
  let EntityModel = getModel(entityName, optionalSchema);
  const result = await EntityModel.findOneAndUpdate(
    { _id: data._id },
    { $set: data },
    { new: true }
  );
  if (!result) throw new Error(entityName + ' not found');
  return result;
};

const deleteEntity = async (id, entityName, optionalSchema = null) => {
  let EntityModel = getModel(entityName, optionalSchema);
  const toDelete = await EntityModel.findById(id);
  if (!toDelete) throw new Error('Item not found');
  await toDelete.deleteOne();
  return { success: true };
};

const getModel = (name, schema) => {
  try {
    return mongoose.model(name);
  } catch {
    return mongoose.model(name, schema || new mongoose.Schema({}, { strict: false }));
  }
};

module.exports = {
  getAllEntities,
  getEntity,
  createEntity,
  updateEntity,
  deleteEntity,
};
