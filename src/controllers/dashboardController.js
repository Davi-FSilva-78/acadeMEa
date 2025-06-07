// importa valores dos models
var dashboardModel = require("../models/dashboardModel");

function enviarResultados(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var id_usuario = req.body.id_usuarioServer
    var peso = req.body.pesoServer;
    var estimulo = req.body.estimuloServer;
    var clicks_nivel = req.body.clicks_nivelServer;
    var nivel_atual = req.body.nivel_atualServer;
    var esforco = req.body.esforcoServer;
    var intensidade = req.body.intensidadeServer;
    var nota_esforco = req.body.nota_esforcoServer;
    var nota_estimulo = req.body.nota_estimuloServer;
    var nota_peso = req.body.nota_pesoServer;

    // Faça as validações dos valores
    if (
        id_usuario == undefined ||
        peso == undefined ||
        estimulo == undefined ||
        clicks_nivel == undefined ||
        nivel_atual == undefined ||
        esforco == undefined ||
        intensidade == undefined ||
        nota_esforco == undefined ||
        nota_estimulo == undefined ||
        nota_peso == undefined
    ) {
        res.status(400).send("Algum campo está undefined, veja bem");
    } else {
        // Passe os valores como parâmetro e vá para o arquivo dashboardModel.js
        dashboardModel.enviarResultados(
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
        )
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar inserção bro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function obterNivelEsforco (req, res) {
    let id_usuario = req.params.id_usuario;

     dashboardModel.obterNivelEsforco(id_usuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar inserção bro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
}

module.exports = {
    enviarResultados,
    obterNivelEsforco
}