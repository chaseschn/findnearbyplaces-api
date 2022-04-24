const express = require("express");
//const {store} = require("./temp/store");
const cors = require('cors');
require('dotenv').config();

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
  store.addCustomer(name,email,password)
  response.status(200).json({ done: true, message: 'customer added'})
});

application.post('/login', (request,response) => {
  let password = request.body.password;
  let email = request.body.email;
  store.login(email,password)
  response.status(200).json({ done: true, message: 'customer logged in'})
});

application.get('/search', (request, response) => {

});

application.post('/customer', (request, response) => {

});

application.post('/place', (request, response) => {

});

application.post('/category', (request, response) => {

});

application.post('/photo', (request, response) => {

});

application.post('/review', (request, response) => {

});

application.put('/place', (request, response) => {

});

application.put('/review', (request, response) => {

});

application.put('/photo', (request, response) => {

});

application.delete('/place', (request, response) => {

});

application.delete('/review', (request, response) => {

});

application.delete('/photo', (request, response) => {

});

application.all('*', (request, response) => response.redirect('/'))

application.listen(port, () => {
  console.log('Listening to the port');
})
