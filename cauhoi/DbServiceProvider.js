const mongoose = require('mongoose');

module.exports = {
  boot(app) {
    mongoose.connect(process.env.MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  }
};
