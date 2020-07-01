create table roles (
	id serial primary key,
	name varchar(20)
);

insert into roles (
	name
) values ('Admin'), ('Super Admin');

create table users (
  id serial primary key,
  email varchar(255),
  hash text,
  role_id int references roles(id)
);