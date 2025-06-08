var database = require("../database/config")

function obterRadar(id_usuario) {

    var instrucaoSql = `
        select 
            avg(nota_estimulo) as nota_estimulo,
            avg(nota_esforco) as nota_esforco, 
            avg(nota_peso) as nota_peso, 
            datediff(
                curdate(),
                (select max(date_format(diaPartida, '%Y/%m/%d')) from partida where fkUsuario = ${id_usuario} )
            ) as dias_sem_jogar
            from partida  where fkUsuario = ${id_usuario};
        `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

function obterRanking(id_usuario) {

    var instrucaoSql = `
        select 
            nivel.nivel_max, 
            nivel.Ranking as niv_ranking, 
            peso.Ranking as pes_ranking ,
            peso.qtd_usuario
        from 
        vw_ranking_nivel as nivel
        join vw_ranking_peso as peso
            on nivel.usuario = peso.usuario 
                where nivel.usuario = ${id_usuario};

        `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

function obterEvolucao(id_usuario) {

    var instrucaoSql = `
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
    where fkUsuario = ${id_usuario} and month(diaPartida) = month(curdate())
    group by dia;
        `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

function obterMelhoresPesos(id_usuario) {

    var instrucaoSql = `
    select distinct 
        peso, 
        max( date_format(diaPartida, '%Y/%m/%d')) as dia 
    from partida 
    where fkUsuario = ${id_usuario}
        group by peso
            order by peso desc  
                limit 5 ;
        `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

module.exports = {
    obterRadar,
    obterRanking,
    obterEvolucao,
    obterMelhoresPesos
};
