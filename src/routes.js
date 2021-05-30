/* eslint linebreak-style: ["error", "windows"]*/

const {addCalHandler,
  getFoodData,
  getFoodDataByName,
  getFood} = require('./handler');


const routes = [
  {
    method: 'POST',
    path: '/calorie',
    handler: addCalHandler,
  },
  {
    method: 'GET',
    path: '/data',
    handler: getFoodData,
  },
  {
    method: 'GET',
    path: '/data/{name}',
    handler: getFoodDataByName,
  },
  {
    method: 'GET',
    path: '/datas/{name*}',
    handler: getFood,
  },
];

module.exports = routes;
