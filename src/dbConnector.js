const mongoose = require('mongoose');
const { DB_ADDRESS, DB_NAME } = process.env;

mongoose.promise = global.Promise;

const mongoOptions = {
  user: '',
  pass: '',
};

mongoose.connect(`mongodb://${DB_ADDRESS}/${DB_NAME}`, mongoOptions);

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected!');
});