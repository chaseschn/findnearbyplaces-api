const bcrypt = require("bcrypt");
const { Pool } = require("pg");
require("dotenv").config();

const connectionString = 'postgres://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DATABASE}';
const connection = {
  connectionString: process.env.DATABASE_URL ? process.env.DATABASE_URL : connectionString,
  ssl: {rejectUnauthorized: false}
}
const pool = new Pool(connection);

let store = {
  search: (search_term,user_location,radius_filter,maximum_results_to_return,category_filter,sort,distance) => {
    pool.query('select * from findnearbyplaces.place where findnearbyplaces.place.description like $1 findnearbyplaces.place.category_id = $2', [search_term, category_filter])
    .then((x) => {
      return {result: x.rows};
    }).catch((e) => {
      return { done: false, result: "No results found"};
    })
  },
  login: (email, password) => {
    pool.query('select email, password from findnearbyplaces.customer where findnearbyplaces.customer.email = $1',[email] )
    .then((x) => {
      if(x.orws.length == 1){
        return {done: true}
      } else {
        return { done: false, result: "No results found"};
      }
    }).catch((e) => {
      return { done: false, result: "No results found"};
    })
  },
  customer: (email, password) => {
    return pool.query('insert into findnearbyplaces.customer (email, password) values ($1, $2)', [email, hash]);
  },
  place: (name, category_id, latitude, longitude, description) => {
    return pool.query('insert into findnearbyplaces.place (name, latitude, longitude, description, category_id, customer_id) values ($1, $2, $3, $4, $5) returning id',
      [name, latitude, longitude, description, category_id]).then(x => {
        return {id: x.rows[0].id};
      })
  },
  addCategory: (name) => {
    return pool.query('insert into findnearbyplaces.category (name) values ($1) returning id', [name])
      .then(x => {
        return {id: x.rows[0].id};
      })
  },
  addPhoto: (photo,review_id,place_id) => {
    return pool.query('insert into findnearbyplaces.photo (file) values ($1) returning id', [photo])
      .then(x => {
        return {id: x.rows[0].id};
      })
  },
  addReview: (place_id, comment, rating) => {
    return pool.query('insert into findnearbyplaces.reviews (place_id, comment, rating) values ($1,$2,$3)', [place_id, comment, rating])
  },
  updatePlace: (place_id, name, category_id, latitude, longitude, description) => {
    return pool.query('update findnearbyplaces.place set name = $1 set latitude = $2 set longitude = $3 set description = $4 set category_id = $5 where id = $6',
    [name, latitude, longitude, description, category_id, place_id]);
  },
  updateReview: (review_id,comment,rating) => {
    return pool.query("update findnearbyplaces.review set text = $1 set rating = $2 where id = $3",
      [comment, rating, review_id]);
  },
  updatePhoto: (photo, photo_id) => {
    return pool.query("update findnearbyplaces.photo set file = $1 where id = $2 values ($1)",
      [photo, photo_id])
  },
  deletePlace: (place_id) => {
    return pool.query("delete from findnearbyplaces.place where id = $1", [place_id]);
  },
  deleteReview: (review_id) => {
    return pool.query("delete from findnearbyplaces.reviews where id = $1", [review_id]);
  },
  deletePhoto: (photo_id) => {
    return pool.query("delete from findnearbyplaces.photo where id = $1", [photo_id]);
  }
}
module.exports = {store};
