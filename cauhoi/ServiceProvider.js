const moduleServiceProvider = require('./ModuleServiceProvider');
const dbServiceProvider = require('./DbServiceProvider');
const configServiceProvider = require('./ConfigServiceProvider');
const globalProvider = require('./GlobalProvider');

module.exports = {
  boot(app) {
    // Config
    configServiceProvider.boot(app);

    // Database
    dbServiceProvider.boot(app);

    //
    globalProvider.boot(app);

    // Module
    moduleServiceProvider.boot(app);
  }
};
