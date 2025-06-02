var database = require("../database/config");

function listarLinha(){

    var instrucao = `
    
    `;
    return database.executar(instrucao);
}


module.exports = {
    listarLinha
};