/* Acciones relacionadas con pregunta/respuesta */

// GET quizes/question
exports.question = function(req, res) {
    res.render('quizes/question', { pregunta : "¿Cuál es la capital de Italia"});
};


// GET quizes/answer
exports.answer = function(req, res) {
    var resultado = 'Incorrecto';
    if (req.query.respuesta === "Roma") {
        resultado = 'Correcto';
    }
    res.render('quizes/answer', { respuesta: resultado }
    );
};

