/* eslint-disable max-len */
/* eslint linebreak-style: ["error", "windows"]*/
const {nanoid} = require('nanoid');
const cal = require('./cal');
const foods = require('./food');

const addCalHandler = (request, h) => {
  const {gender,
    weight,
    height,
    age,
    activityType} = request.payload;

  const id = nanoid(16);
  let activityValue = null;
  switch (activityType) {
    case 1:
      activityValue = 1.2;
      break;
    case 2:
      activityValue = 1.375;
      break;
    case 3:
      activityValue = 1.55;
      break;
    case 4:
      activityValue = 1.725;
      break;
    case 5:
      activityValue = 1.9;
      break;
    default:
      activityValue = 0;
      break;
  }

  const calories = (gender === 'male') ? ((10 * weight) + (6.25 * height) - (5 * age) + 5) *
  activityValue : ((10 * weight) + (6.25 * height) - (5 * age) - 161) * activityValue;

  if (!gender) {
    const response = h.response({
      status: 'fail',
      message: 'Silahkan isi gender',
    });
    response.code(400);
    return response;
  }

  const newCal = {
    id,
    gender,
    weight,
    height,
    age,
    activityType,
    calories,
  };
  cal.push(newCal);
  console.log(newCal);
  console.log(cal);
  const isSuccess = cal.filter((item) => item.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      calories,
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Calorie gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getFoodData = () => ({
  foods: foods.map((food) => ({
    id: food.id,
    name: food.name,
    dose: food.dose,
    calorie: food.calorie,
  })),
});

const getFoodDataByName = (request, h) => {
  const {name} = request.params;
  const food = foods.filter((n) => n.name === name)[0];

  if (food !== undefined) {
    return {
      // status: 'success',
      food: food.name,
      calorie: food.calorie,
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'makanan tidak ditemukan',
  });
  response.code(404);
  return response;
};

const getFood = (request, h) => {
  const name = request.params.name.split(',');
  const foodRes = [];
  const foodL = [];
  const foodContainer = [];
  for (let i = 0; i < name.length; i++ ) {
    foodL[i] = name[i];
    foodRes[i] = foods.filter((n) => n.name === foodL[i])[0];
    foodContainer.push(foodRes[i]);
    console.log(foodL[i]);
    console.log(foodRes[i]);
    console.log(foodContainer);
  }
  /* const food1 = name[0];
  const food2 = name[1];
  const food3 = name[2];
  const foodRes1 = foods.filter((n) => n.name === food1)[0];
  const foodRes2 = foods.filter((n) => n.name === food2)[0];
  const foodRes3 = foods.filter((n) => n.name === food3)[0]; */
  /* console.log(foodRes1);
  console.log(foodRes2);
  console.log(foodRes3); */

  /* const foodContainer = [];
  const newFood = {
    foodRes1,
    foodRes2,
    foodRes3,
  };
  foodContainer.push(newFood); */
  // for (item of name) {
  // console.log(...name);
  // return (food);
  // }
  if (foodRes !== undefined) {
    return {
      // status: 'success',
      foodContainer,
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'makanan tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {addCalHandler, getFoodData, getFoodDataByName, getFood};

