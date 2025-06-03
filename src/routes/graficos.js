var express = require("express");
var router = express.Router();

var graficoController = require("../controllers/graficosController");

router.get("/linha", function(req, res) {
    graficoController.listarLinha(req,res);
});

module.exports = router;