const fs = require('fs');
const path = require('path');
// const basename = path.basename(__filename);
const { model, Schema } = require('mongoose');
let models = {};
let configModels = {};

function addModels(dir, file){
  let model = require(path.join(dir, file));

  configModels[model.name] = configModels[model.name] || {attrs: {}, options: {}, inits: []};

  if (model.attrs) {
    configModels[model.name].attrs = {
      ...configModels[model.name].attrs,
      ...model.attrs
    };
  }

  if (model.options) {
    configModels[model.name].options = {
      ...configModels[model.name].options,
      ...model.options
    }
  }

  if (model.copy) {
    configModels[model.name].copy = model.copy;
  }

  if (model.init) {
    configModels[model.name].inits.push(model.init);
  }
}

// Import master model
// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     addModels(__dirname, file);
//   });

// Import module models
let parent = path.dirname(path.dirname(__dirname));

global.config.modules.forEach((el) => {
  let root = [parent, 'app', el , 'models'].join(path.sep);

  if (fs.existsSync(root)) {
    fs
    .readdirSync(root)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
      addModels(root, file);
    });
  }
});

for (let modelName in configModels) {
  if (configModels[modelName].copy) {
    configModels[modelName].attrs = {
      ...configModels[configModels[modelName].copy].attrs,
      ...configModels[modelName].attrs
    };

    configModels[modelName].options = {
      ...configModels[configModels[modelName].copy].options,
      ...configModels[modelName].options
    }
  }

  let sch = new Schema(
    configModels[modelName].attrs,
    configModels[modelName].options
  );

  configModels[modelName].inits.forEach((init) => {
    init(sch);
  });
  
  models[modelName] = model(modelName, sch);
}

module.exports = models;
