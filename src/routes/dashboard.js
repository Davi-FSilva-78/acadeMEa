var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.post("/enviar", function (req, res) {
    dashboardController.enviarResultados(req, res);
})

router.get("/iniciar/:id_usuario", function (req, res) {
    dashboardController.obterNivelEsforco(req, res);
})

module.exports = router;