var express = require("express");
var router = express.Router();

var jogoController = require("../controllers/jogoController");

router.post("/enviar", function (req, res) {
    jogoController.enviarResultados(req, res);
})

router.get("/iniciar/:id_usuario", function (req, res) {
    jogoController.obterNivelEsforco(req, res);
})

module.exports = router;