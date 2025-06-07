var database = require("../database/config")

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function enviarResultados(
    id_usuario,
    peso,
    estimulo,
    clicks_nivel,
    nivel_atual,
    esforco,
    intensidade,
    nota_esforco,
    nota_estimulo,
    nota_peso
) {

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        insert into partida (
            fkJogo,
            fkUsuario,
            nivel_atual,
            esforco,
            peso,
            estimulo,
            click_nivel,
            intensidade,
            nota_peso,
            nota_esforco,
            nota_estimulo
        ) values 
        (
            1,
            ${id_usuario},
            ${nivel_atual},
            ${esforco},
            ${peso},
            ${estimulo},
            ${clicks_nivel},
            '${intensidade}',
            ${nota_peso},
            ${nota_esforco},
            ${nota_estimulo}
        );`;
    
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
    
        return database.executar(instrucaoSql);
}

function obterNivelEsforco(id_usuario){
    
     var instrucaoSql = `
        select 
        max(nivel_atual) as nivel, 
        min(esforco) as esforco 
        from partida 
        where fkUsuario = ${id_usuario};
        `;

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
    
        return database.executar(instrucaoSql);
}

module.exports = {
    enviarResultados,
    obterNivelEsforco
};
