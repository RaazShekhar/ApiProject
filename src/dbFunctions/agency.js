const Agency = require('../models/agency');
 
const findWithLean = queryObject =>  Agency.find(queryObject).lean(true);

const findOneWithLean = queryObject =>  Agency.findOne(queryObject).lean(true);

const add = async (updateObject) => {
  const addObject = new Agency(updateObject);
  await addObject.save();
};

const findOneWithProjectAndLean = (queryObject, projectObject) => Agency.findOne(queryObject, projectObject).lean(true);

module.exports = {
  findWithLean,
  findOneWithLean,
  findOneWithProjectAndLean,
  add,
};