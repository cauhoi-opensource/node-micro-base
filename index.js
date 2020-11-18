const express = require('express');
const i18n = require('i18n');
const ServiceProvider = require('./cauhoi/ServiceProvider');
// const addRequestId = require('express-request-id')();
const engines = require('consolidate');
require('dotenv').config();

i18n.configure({
  // setup some locales - other locales default to en silently
  locales: ['en'],
  defaultLocale: 'en',
  // where to store json files - defaults to './locales'
  directory: __dirname + '/locales',

  register: global
});

//i18n.setLocale('vi');

const app = express();
app.use(express.json());
app.use(i18n.init);
// app.use(addRequestId);
app.use(express.static('public'));

//
app.set('views', __dirname + '/public');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

const server = app.listen(process.env.PORT, function () {
  console.log('runing ...');
});

ServiceProvider.boot(app);