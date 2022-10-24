CREATE DATABASE demo;
use demo;
CREATE TABLE product(
id int not null primary key auto_increment,
name varchar(30),
price int not null ,
description varchar(255)
);
use demo;
create table category(
id int not null primary key auto_increment,
name varchar(100) not null
);
alter table product add idCategory int not null ;
alter table product add foreign key (idCategory) references category(id);