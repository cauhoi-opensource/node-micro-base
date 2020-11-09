module.exports = {
  boot(app) {
    global.config = {
      modules: require('../config/modules'),
      db: require('../config/db')
    };
  }
};
