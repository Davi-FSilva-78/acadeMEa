create database acadMEa;

use acadMEa;


-- ------------------------------------------------------------------Create do usuario ---------------------------------------------------------------------------------------------------------------------------------------
create table usuario (
	idUsuario int primary key auto_increment,
    nome varchar (30) not null,
    sobrenome varchar(50) not null,
    email varchar(50) not null unique,
    senha varchar(20) not null
);

create table login (
	idLogin int auto_increment,
    fkUsuario int,
    constraint cpkLogin primary key(idLogin, fkUsuario),
    ultimoAcesso datetime default current_timestamp,
    constraint cfkLoginUsuario foreign key (fkUsuario)
		references usuario(idUsuario)
);

-- ------------------------------------------------------------------Create do partidas ---------------------------------------------------------------------------------------------------------------------------------------
create table jogo (
	idJogo int primary key,
    titulo varchar(15) not null
);

insert into jogo values 
(1, 'sUPino');


-- ---------------------------------------------------------------------------------------------------------------------------------------------


create table partida (
	idPartida int auto_increment,
    fkJogo int, 
    fkUsuario int,
    constraint cpk primary key (idPartida, fkJogo, fkUSuario),
    diaPartida datetime default current_timestamp,
    nivel_atual tinyint not null, 	
    esforco decimal (2,1) not null,
    peso decimal(4,1) not null,
    estimulo int,
    click_nivel int,
    intensidade varchar(45),
	constraint cfkPartidaFkusuario foreign key (fkUsuario)
		references usuario(idUsuario),
	constraint cfkPartidaFkjoo foreign key (fkJogo)
		references jogo(idJogo)
);
select * from partida;

insert into partida(fkJogo, fkUsuario, nivel_atual, esforco, peso, estimulo, click_nivel, intensidade) values 
(1, 3, 5, 1.6, 16),
(1, 3, 5, 1.6, 16),
(1, 3, 5, 1.6, 16),
(1, 3, 5, 1.6, 16),
(1, 3, 5, 1.6, 16),
(1, 3, 5, 1.6, 16),
(1, 3, 6, 1.5, 12);

select * from partida;

-- Maior nivel de um usuario
select max(nivel_atual) from partida 
	where fkUsuario = 1;
-- -----------------------------------------------------------------
-- Ranking de maiores niveis
	create view vw_ranking_nivel as
    select 
	distinct fkUsuario as usuario , 
    max(nivel_atual) as nivel_max,
    dense_rank() over (order by max(nivel_atual) desc) as Ranking
    from partida
    group by fkUsuario;
-- 
	select usuario, Ranking from vw_ranking_nivel ;
-- ----------------------------------------------------------------------
-- Ranking dosmaiores pesos
    -- Ranking de maiores niveis
	create view vw_ranking_peso as
    select 
	distinct fkUsuario as usuario , 
    max(peso) as peso_max,
    dense_rank() over (order by max(peso) desc) as Ranking
    from partida
    group by fkUsuario;
-- 
	select Ranking from vw_ranking_peso where usuario = 1;
    
-- ------------------------------------------------------------------Seção dos desejáveis ---------------------------------------------------------------------------------------------------------------------------------------

-- ------------------------------------------------------------------Create comentarios ---------------------------------------------------------------------------------------------------------------------------------------
create table publicacao (
	idPubli int primary key auto_increment,
    titulo varchar(15) not null,
    descricao varchar(50) not null,
    dtPubli datetime default current_timestamp
);

create table comentario (
	idComentario int auto_increment,
    fkUsuario int, 
    fkPubli int,
    constraint cpkComentario primary key (idComentario, fkUsuario, fkPubli),
    titulo varchar(15) not null,
    descricao varchar (100) not null,
    dataComentario datetime default current_timestamp,
	constraint cfkComentarioFkusuario foreign key (fkUsuario)
		references usuario(idUsuario),
	constraint cfkComentarioFkPubli foreign key (fkPubli)
		references publicacao(idPubli)
);
-- ------------------------------------------------------------------Create segredos ---------------------------------------------------------------------------------------------------------------------------------------

create table quiz (
	idQuiz int primary key auto_increment,
    pergunta varchar (50) not null,
    resposta varchar(30),
    explicacao varchar(100) not null
);

create table esterEgg (
	idEsterEgg int primary key auto_increment,
    titulo varchar(15) not null,
	descricao varchar(50) not null,
    fkQuiz int,
    constraint cfkEsterQuiz foreign key (fkQuiz)
		references quiz(idQuiz)
);

create table exploracao (
	fkUsuario int,
    fkEsterEgg int, 
    constraint cpkExploracao primary key (fkUsuario, fkEsterEgg),
    dataExploracao datetime default current_timestamp,
    quizRespondido tinyint,
    constraint cfkExploracaoFkusuario foreign key (fkUsuario)
		references usuario(idUsuario),
	constraint cfkExploracaoFkEsterEgg foreign key (fkEsterEgg)
		references esterEgg(idEsterEgg)
);


show tables;
insert publicacao values 
(1, 'Anabolizante', 'Anabolizante e seus colaterais', default);
select * from comentario;
select * from esterEgg;
select * from exploracao;
select * from jogo;
select * from login;
select * from partida;
select * from publicacao;
select * from quiz;
select * from usuario;