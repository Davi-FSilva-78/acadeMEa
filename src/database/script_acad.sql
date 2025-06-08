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


/* create table login (
	idLogin int auto_increment,
    fkUsuario int,
    constraint cpkLogin primary key(idLogin, fkUsuario),
    ultimoAcesso datetime default current_timestamp,
    constraint cfkLoginUsuario foreign key (fkUsuario)
		references usuario(idUsuario)
); */

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
    peso decimal(3,1) not null,
    estimulo int not null,
    click_nivel int not null,
    intensidade varchar(45) not null,
    nota_peso decimal(3,1) not null,
    nota_esforco decimal(3,1) not null,
    nota_estimulo decimal(3,1) not null,
	constraint cfkPartidaFkusuario foreign key (fkUsuario)
		references usuario(idUsuario),
	constraint cfkPartidaFkjoo foreign key (fkJogo)
		references jogo(idJogo)
);
select * from partida;

delete from partida where idPartida in (29,28,27);
    
-- -----------------------------------------------------------------
-- Ranking de maiores niveis
	create view vw_ranking_nivel as
    select 
	distinct fkUsuario as usuario , 
    max(nivel_atual) as nivel_max,
    dense_rank() over (order by max(nivel_atual) desc) as Ranking,
    (select count(distinct fkUsuario) from partida) as qtd_usuario
    from partida
    group by fkUsuario;

	select * from vw_ranking_nivel ;


	create view vw_ranking_peso as
    select 
	distinct fkUsuario as usuario , 
    max(peso) as peso_max,
    dense_rank() over (order by max(peso) desc) as Ranking,
    (select count(distinct fkUsuario) from partida) as qtd_usuario
    from partida
    group by fkUsuario;
-- 
	select * from vw_ranking_peso;

    
    
    
-- Maior nivel e eforço do usuario, para definir valores inicais
select max(nivel_atual) as nivel, min(esforco) as esforco from partida where fkUsuario = 1;


-- envio de notas para grafico radar
select 
avg(nota_estimulo) as nota_estimulo,
avg(nota_esforco) as nota_esforco, 
avg(nota_peso) as nota_peso, 
datediff(
	curdate(),
	(select max(date_format(diaPartida, '%Y/%m/%d')) from partida where fkUsuario = 1 )
) as Ultimo_jogado
from partida 
 where fkUsuario = 1;
	
-- Para plotar as KPIS
select 
avg(nota_estimulo) as nota_estimulo,
avg(nota_esforco) as nota_esforco, 
avg(nota_peso) as nota_peso, 
datediff(
	curdate(),
	(select max(date_format(diaPartida, '%Y/%m/%d')) from partida where fkUsuario = 1 )
) as Ultimo_jogado
from partida  where fkUsuario = 1;
select 
	nivel.nivel_max, 
	nivel.Ranking as niv_ranking, 
	peso.Ranking as pes_ranking ,
    peso.qtd_usuario
from 
	vw_ranking_nivel as nivel
    join vw_ranking_peso as peso
		on nivel.usuario = peso.usuario 
	where nivel.usuario = 1;

-- Plotar Evolução de niveis
select 
avg(nota_estimulo) as nota_estimulo,
avg(nota_esforco) as nota_esforco, 
avg(nota_peso) as nota_peso, 
datediff(
	curdate(),
	max(date_format(diaPartida, '%Y/%m/%d'))
) as Ultimo_jogado,
date_format(diaPartida, '%Y/%m/%d') as dia
from partida 
 where fkUsuario = 1 and month(diaPartida) = month(curdate())
 group by dia;
    
    
-- plotar melhores pesos
	select distinct 
    peso, 
    max( date_format(diaPartida, '%Y/%m/%d')) as dia 
    from partida 
    where fkUsuario = 1 
    group by peso
    order by peso desc  
    limit 5 ;
    

    
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


select * from comentario;
select * from esterEgg;
select * from exploracao;
select * from jogo;
select * from partida;
select * from publicacao;
select * from quiz;
select * from usuario;
