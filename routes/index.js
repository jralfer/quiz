var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz-controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' , errors: []});
});

/* GET home page. */
router.get('/author', function(req, res) {
  res.render('author', { autor: 'J.R.Alvarez' , errors: []});
});

// Autoload de comandos con :quizId
// Si el parametro quizId está en la ruta ejecuta el quizController.load
router.param('quizId',quizController.load);

router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

router.get('/quizes/search', quizController.search);

router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);


module.exports = router;
