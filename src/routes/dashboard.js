var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");


router.get("/radar/:id_usuario", function (req, res) {
    dashboardController.obterRadar(req, res);
    // /dashboard/radar/1
})

router.get("/ranking/:id_usuario", function (req, res) {
    dashboardController.obterRanking(req, res);
    // /dashboard/radar/1
})

router.get("/evolucao/:id_usuario", function (req, res) {
    dashboardController.obterEvolucao(req, res);
    // /dashboard/radar/1
})


router.get("/melhores/:id_usuario", function (req, res) {
    dashboardController.obterMelhoresPesos(req, res);
    // /dashboard/radar/1
})
module.exports = router;