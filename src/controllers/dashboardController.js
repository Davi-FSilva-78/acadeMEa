// importa valores dos models
var dashboardModel = require("../models/dashboardModel");

function obterRadar (req, res) {
    let id_usuario = req.params.id_usuario;

     dashboardModel.obterRadar(id_usuario)
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

function obterRanking (req, res) {
    let id_usuario = req.params.id_usuario;

     dashboardModel.obterRanking(id_usuario)
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

function obterEvolucao (req, res) {
    let id_usuario = req.params.id_usuario;

     dashboardModel.obterEvolucao(id_usuario)
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

function obterMelhoresPesos (req, res) {
    let id_usuario = req.params.id_usuario;

     dashboardModel.obterMelhoresPesos(id_usuario)
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
    obterRadar,
    obterRanking,
    obterEvolucao,
    obterMelhoresPesos
}