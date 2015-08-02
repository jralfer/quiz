/* Acciones relacionadas con pregunta/respuesta */

var models = require('../models/models.js');

// GET /quizes/statistics

var datosEstadistica = {nPreg:0, nComTot:0, nComMedxPreg:0, nPregSinCom:0, nPregConCom:0};

exports.index = function(req, res) {

// Número de preguntas
    models.sequelize.query('SELECT count(*) as count FROM Quizzes').then(function(rows){
        datosEstadistica.nPreg = rows[0].count;
    });

// Número de comentarios y número de comentarios media por pregunta
    models.sequelize.query('SELECT count(*) as count FROM Comments').then(function(rows){
        datosEstadistica.nComTot = rows[0].count;
        datosEstadistica.nComMedxPreg = datosEstadistica.nComTot / datosEstadistica.nPreg;
    });

// Número de pregunstas sin comentarios
    models.sequelize.query('SELECT count(*) as count FROM Quizzes q, Comments c WHERE q.id <> c.id').then(function(rows){
        datosEstadistica.nPregSinCom = rows[0].count;
    });

// Número de pregunstas con comentarios
    models.sequelize.query('SELECT count(*) as count FROM Quizzes q, Comments c WHERE q.id = c.id').then(
        function(rows){
        //console.log("SALIDA: " + JSON.stringify(rows));
        datosEstadistica.nPregConCom = rows[0].count;
        res.render('statistics/index', {datosEstadistica: datosEstadistica, errors: []});
    });

};

