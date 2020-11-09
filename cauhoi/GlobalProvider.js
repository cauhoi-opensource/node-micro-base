const { createClient } = require('async-redis');
const io = require('socket.io-client');

module.exports = {
  boot(app) {
    global.authRedis = createClient();
    global.socket = io(process.env.SOCKET_PUSH_NOTIFY);
    global.cauhoi = {
      models: () => require('./reader/model'),
      middleware: () => require('./reader/middleware')
    }
  }
};
