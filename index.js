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

application.post('/login', (request, response) => {
  let password = request.body.password;
  let email = request.body.email;
  store.login(email, password).then((x) => {
    response.status(200).json({ done: true, message: "Customer logged in successfully"})
  }).catch(err => {
    response.status(404).json({ done: false, message: "Customer not logged in"})
  })
});

application.get('/search/:search_term/:user_location/:radius_filter/:maximum_results_to_return/:category_filter/:sort/:distance', (request, response) => {
  let search_term = req.parms.user.search_term;
  let user_location = request.parms.user_location;
  let radius_filter = request.parms.radius_filter;
  let maximum_results_to_return = request.parms.maximum_results_to_return;
  let category_filter = request.parms.category_filter;
  let sort = request.parms.sort;
  let distance = request.parms.distance;
  store.search(search_term,user_location,radius_filter,maximum_results_to_return,category_filter,sort,distance).then((x) => {
    if(x.length > 0) {
      response.status(200).json({ done: true, result: x})
    } else {
      response.status(404).json({ done: false, result: "No results found"})
    }
  })
});

application.post('/customer', (request, response) => {
  let password = request.body.password;
  let email = request.body.email;
  store.customer(email, password).then((x) => {
    response.status(200).json({ done: true, message: "Customer registered successfully"})
  }).catch(err => {
    response.status(404).json({ done: false, message: "Customer not registered"})
  })
});

application.post('/place', (request, response) => {
  let name = request.body.name;
  let category_id = request.body.category_id;
  let latitude = request.body.latitude;
  let longitude = request.body.longitude;
  let description = request.body.description;
  store.place(name, category_id, latitude, longitude, description).then((x) => {
    response.status(200).json({ done: true, message: 'Place added successfully', id: x.id})
  }).catch(err => {
    response.status(404).json({ done: false, message: "Place not added"})
  })
});

application.post('/category', (request, response) => {
  let name = request.body.name;
  store.addCategory(name).then((x) => {
    response.status(200).json({ done: true, message: 'Category added successfully', id: x.id})
  }).catch(err => {
    response.status(404).json({ done: false, message: "Category not added"})
  })
});

application.post('/photo', (request, response) => {
  let photo = request.body.photo;
  let place_id = request.body.place_id;
  let review_id = request.body.review_id;
  store.addPhoto(photo,review_id,place_id).then((x) => {
    response.status(200).json({ done: true, message: 'Review photo added successfully', id: x.id})
  }).catch(err => {
    response.status(404).json({ done: false, message: "Review photo not added"})
  })
});

application.post('/review', (request, response) => {
  let place_id = request.body.place_id;
  let comment = request.body.comment;
  let rating = request.body.rating;
  store.addReview(place_id, comment, rating).then((x) => {
    response.status(200).json({ done: true, message: 'Review added successfully',id: x.id})
  }).catch(err => {
    response.status(404).json({ done: false, message: "Review not added"})
  })
});

application.put('/place', (request, response) => {
  let place_id = request.body.place_id;
  let name = request.body.name;
  let category_id = request.body.category_id;
  let latitude = request.body.latitude;
  let longitude = request.body.longitude;
  let description = request.body.description;
  store.updatePlace(place_id, name, category_id, latitude, longitude, description).then((x) => {
    response.status(200).json({ done: true, message: 'Place update successfully'})
  }).catch(err => {
    response.status(404).json({ done: false, message: "place not updated"})
  })
});

application.put('/review', (request, response) => {
  let review_id = request.body.place_id;
  let comment = request.body.comment;
  let rating = request.body.rating;
  store.updateReview(review_id,comment,rating).then((x) => {
    response.status(200).json({ done: true, message: 'Review update successfully'})
  }).catch(err => {
    response.status(404).json({ done: false, message: "Review not updated"})
  })
});

application.put('/photo', (request, response) => {
  let photo = request.body.photo;
  let photo_id = request.body.place_id;
  store.updatePhoto(photo, photo_id).then((x) => {
    response.status(200).json({ done: true, message: 'Photo update successfully'})
  }).catch(err => {
    response.status(404).json({ done: false, message: "Photo not updated"})
  })
});

application.delete('/place', (request, response) => {
  let place_id = request.body.place_id;
  store.deletePlace(place_id).then((x) => {
    response.status(200).json({ done: true, message: 'Place deleted successfully'})
  }).catch(err => {
    response.status(404).json({ done: false, message: "Place not deleted"})
  })
});

application.delete('/review', (request, response) => {
  let review_id = request.body.review_id;
  store.deleteReview(review_id).then((x) => {
    response.status(200).json({ done: true, message: 'Review deleted successfully'})
  }).catch(err => {
    response.status(404).json({ done: false, message: "Review not deleted"})
  })
});

application.delete('/photo', (request, response) => {
  let photo_id = request.body.photo_id;
  store.deletePhoto(photo_id).then((x) => {
    response.status(200).json({ done: true, message: 'Photo deleted successfully'})
  }).catch(err => {
    response.status(404).json({ done: false, message: "Photo not deleted"})
  })

});

application.all('*', (request, response) => response.redirect('/'))

application.listen(port, () => {
  console.log('Listening to the port');
})
