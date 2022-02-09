const Clients = require('../models/clients');
 
const findWithLean = queryObject =>  Clients.find(queryObject).lean(true);

const findOneWithLean = queryObject =>  Clients.findOne(queryObject).lean(true);

const findOneAndUpdate = (queryObject, updateObject) =>  Clients.findOneAndUpdate(queryObject, updateObject);

const add = async (updateObject) => {
  const addObject = new Clients(updateObject);
  await addObject.save();
};

const aggregate = (queries) => Clients.aggregate([...queries]);

const findProjectWithLean = (queryObject, projectQuery) => Clients.find(queryObject, projectQuery).lean(true);

module.exports = {
  findWithLean,
  findOneWithLean,
  findOneAndUpdate,
  aggregate,
  add,
  findProjectWithLean,
};