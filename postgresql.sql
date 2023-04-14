select * from UserDetail;

INSERT INTO TEST(id,name,email) values(1,'Shruthi','Shruthigss007@gmail.com')
DROP DATABASE mydatabase;

USE DATABASE test;

CREATE table UserDetail(
id serial not null,
primary key(id),
name varchar(255) not null,
email varchar (255) unique
)