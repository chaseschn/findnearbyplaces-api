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
  id bigserial primary key,
  email varchar(256) not null,
  password varchar(8) not null
);

create table findnearbyplaces.reviews
(
  id bigserial primary key,
  location_id varchar(8) not null,
  customer_id varchar(4) not null,
  review_text varchar(512) not null,
  review varchar(1) not null
);

create table findnearbyplaces.photo
(
  id bigserial primary key,
  file varchar(300) not null
);

create table findnearbyplaces.place_photo
(
  location_id varchar(8) not null,
  photo_id varchar(4) not null
);

create table findnearbyplaces.review_photo
(
  review_id varchar(8) not null,
  photo_id varchar(4) not null
);
