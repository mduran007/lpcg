create table polos(
  id serial primary key,
  nome varchar(50) not null
);

create table alunos(
   id serial primary key,
   nome varchar(100) not null,
   dta_nasc date,
   sexo varchar (10),
   rg int,
   escolaridade varchar(30),
   cidade varchar(100),
   estado varchar(10),
   cep varchar(10),
   endereco varchar(100),
   bairro varchar(30),
   celular varchar(13),
   telefone varchar(13),
   email varchar(50) not null,
   profissao varchar(50),
   ocupacao varchar(50),
   local_trabalho varchar(100),
   senha varchar(15) not null,
   resp boolean not null,
   fk_polo int not null,
   foreign key (fk_polo) references polos(id)
);



create table frequencia(
   id serial primary key,
   data date not null,
   presenca boolean not null,
   fk_lista int not null,
   foreign key (fk_lista) references lista(id)
);
