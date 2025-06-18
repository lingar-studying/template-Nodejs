import mongoose from 'mongoose';
import { connectToMongo } from './connectionWithMongo';

export const getOrCreateModel = (entityName, optionalSchema = null) => {
  try {
    return mongoose.model(entityName);
  } catch {
    const schema = optionalSchema || new mongoose.Schema({}, { strict: false });
    return mongoose.model(entityName, schema);
  }
};

// ============================

export const getAllEntities = async (entityName, optionalSchema = null) => {
  await connectToMongo();
  const EntityModel = getOrCreateModel(entityName, optionalSchema);
  return await EntityModel.find();
};

export const getEntity = async (entityName, id, optionalSchema = null) => {
  await connectToMongo();
  const EntityModel = getOrCreateModel(entityName, optionalSchema);
  return await EntityModel.findById(id);
};

export const createEntity = async (data, entityName, optionalSchema = null) => {
  await connectToMongo();
  const EntityModel = getOrCreateModel(entityName, optionalSchema);
  const newItem = new EntityModel(data);
  return await newItem.save();
};

export const updateEntity = async (data, entityName, optionalSchema = null) => {
  await connectToMongo();
  const EntityModel = getOrCreateModel(entityName, optionalSchema);

  const result = await EntityModel.findOneAndUpdate(
    { _id: data._id },
    { $set: data },
    { new: true }
  );

  if (!result) {
    throw new Error(`${entityName} not found`);
  }

  return result;
};

export const deleteEntity = async (id, entityName, optionalSchema = null) => {
  await connectToMongo();
  const EntityModel = getOrCreateModel(entityName, optionalSchema);

  const toDelete = await EntityModel.findById(id);
  if (!toDelete) {
    throw new Error(`${entityName} not found or not owned by user`);
  }

  await toDelete.deleteOne();
  return { success: true };

};
