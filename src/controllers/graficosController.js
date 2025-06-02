var graficoModel = require("../models/graficosModel");

function listarLinha() {
    graficoModel.listarLinha()
        .then(
            function (resultado) {
                res.json(resultado);
                // res.status(200).json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json({erro: erro.sqlMessage || errp.message || erro});
            }
        );
}


module.exports = {
    listarLinha
}