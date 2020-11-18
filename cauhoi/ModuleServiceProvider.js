module.exports = {
  boot(app) {
    global.config.modules.forEach((el) => {
      // Import auth module
      const module = require('../src/'+el+'/index');
      module(app);
    });
  }
};
