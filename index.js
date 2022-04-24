const express = require("express");
const cors = require('cors');
require('dotenv').config();
const {store} = require("./data_access/store");

const application = express();
const port = process.env.PORT || 4002;

application.use(express.json());
application.use(cors());

// Schema

application.get('/', (request, response) => {
  response.status(200).json({done: true, message: 'Fine!'});
});

application.get('/register', (request,response) =>{
  let name = request.body.name;
  let email = request.body.email;
  let password = request.body.password;
  response.status(200).json({ done: true, message: 'customer added'})
});

application.post('/login', (request,response) => {
  let password = request.body.password;
  let email = request.body.email;
  response.status(200).json({ done: true, message: 'customer logged in'})
});

application.get('/search', (request, response) => {
  let user_location = request.body.user_location;
  let radius_filter = request.body.radius_filter;
  let maximum_results_to_return = request.body.maximum_results_to_return;
  let category_filter = request.body.category_filter;
  let sort = request.body.sort;
  let distance = request.body.distance;
  response.status(200).json({ done: true, result: 'search completed'})
});

application.post('/customer', (request, response) => {
  let password = request.body.password;
  let email = request.body.email;
  response.status(200).json({ done: true, message: 'customer logged in'})
});

application.post('/place', (request, response) => {
  let name = request.body.name;
  let category_id = request.body.category_id;
  let latitude = request.body.latitude;
  let longitude = request.body.longitude;
  let description = request.body.description;
  response.status(200).json({ done: true, message: 'customer logged in', id: 'id'})
});

application.post('/category', (request, response) => {
  let name = request.body.name;
  response.status(200).json({ done: true, message: 'category', id: 'id'})
});

application.post('/photo', (request, response) => {
  let photo = request.body.photo;
  let place_id = request.body.place_id;
  let review_id = request.body.review_id;
  response.status(200).json({ done: true, message: 'photo', id: 'id'})
});

application.post('/review', (request, response) => {
  let place_id = request.body.place_id;
  let comment = request.body.comment;
  let rating = request.body.rating;
  response.status(200).json({ done: true, message: 'review', id: 'id'})
});

application.put('/place', (request, response) => {
  let name = request.body.name;
  let category_id = request.body.category_id;
  let latitude = request.body.latitude;
  let longitude = request.body.longitude;
  let description = request.body.description;
  response.status(200).json({ done: true, message: 'place', id: 'id'})
});

application.put('/review', (request, response) => {
  let place_id = request.body.place_id;
  let comment = request.body.comment;
  let rating = request.body.rating;
  response.status(200).json({ done: true, message: 'review', id: 'id'})
});

application.put('/photo', (request, response) => {
  let photo = request.body.photo;
  let photo_id = request.body.place_id;
  response.status(200).json({ done: true, message: 'photo'})
});

application.delete('/place', (request, response) => {
  let place_id = request.body.place_id;
  response.status(200).json({ done: true, message: 'place'})
});

application.delete('/review', (request, response) => {
  let review_id = request.body.review_id;
  response.status(200).json({ done: true, message: 'place'})
});

application.delete('/photo', (request, response) => {
  let photo_id = request.body.photo_id;
  response.status(200).json({ done: true, message: 'photo'})

});

application.all('*', (request, response) => response.redirect('/'))

application.listen(port, () => {
  console.log('Listening to the port');
})
