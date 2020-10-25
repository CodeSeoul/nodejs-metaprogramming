create table books (
    id int not null auto_increment primary key,
    title varchar(255) not null
);

insert into books (title) 
values 
    ('Programming: An Introduction'),
    ('Software Design: Like a Boss'),
    ('Colons: Because');
