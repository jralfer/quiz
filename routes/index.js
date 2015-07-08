var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz-controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

/* GET home page. */
router.get('/author', function(req, res) {
  res.render('author', { autor: 'J.R.Alvarez' });
});

router.get('/quizes/question', quizController.question);

router.get('/quizes/answer', quizController.answer);



module.exports = router;
