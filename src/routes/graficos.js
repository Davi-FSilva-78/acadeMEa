var express = require("express");
var router = express.Router();

var graficoController = require("../controller/graficosController");

router.get("/linha", function(req, res) {
    graficoController.listarLinha(req,res);
});

module.exports = router;