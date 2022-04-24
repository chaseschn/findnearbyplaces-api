create schema if not exists findnearbyplaces;


drop table if exists findnearbyplaces.category;
drop table if exists findnearbyplaces.customer;
drop table if exists findnearbyplaces.reviews;
drop table if exists findnearbyplaces.photo;
drop table if exists findnearbyplaces.place_photo;
drop table if exists findnearbyplaces.review_photo;

create table findnearbyplaces.category
(
  id bigserial primary key,
  name varchar(30) not null
);

create table findnearbyplaces.customer
(
  id serial primary key,
  email varchar(256) not null unique,
  password varchar(8) not null
);

create table findnearbyplaces.place
(
  id bigserial primary key unique,
  name varchar(256) not null,
  latitude float not null,
  longitude float not null,
  description varchar(512) not null,
  category_id int references findnearbyplaces.category(id),
  customer_id int references findnearbyplaces.customer(id)
);

create table findnearbyplaces.reviews
(
  id serial primary key,
  location_id bigserial references findnearbyplaces.place(id),
  customer_id int references findnearbyplaces.customer(id),
  text varchar(512) not null,
  review int not null
);

create table findnearbyplaces.photo
(
  id bigserial primary key unique,
  file bytea not null
);

create table findnearbyplaces.place_photo
(
  location_id bigserial references findnearbyplaces.place(id),
  photo_id bigserial references findnearbyplaces.photo(id)
);

create table findnearbyplaces.review_photo
(
  review_id bigserial references findnearbyplaces.reviews(id),
  photo_id bigserial references findnearbyplaces.photo(id)
);
