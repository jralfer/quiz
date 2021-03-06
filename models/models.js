var path = require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6] || null);
var user = (url[2] || null);
var pwd = (url[3] || null);
var protocol = (url[1] || null);
var dialect = (url[1] || null);
var port = (url[5] || null);
var host = (url[4] || null);
var storage = process.env.DATABASE_STORAGE;


// Cargar Modelo ORM
var Sequelize = require('sequelize');


// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd,
    {
        dialect: protocol,
        protocol: protocol,
        port: port,
        host: host,
        storage: storage,  // solo SQLite (.env)
        omitNull: true      // solo Postgres
    }
);


// Importar definicion de la tabla Quiz
var quiz_path = path.join(__dirname, 'quiz');
var Quiz = sequelize.import(quiz_path);

// Importar definicion de la tabla Comment
var comment_path = path.join(__dirname,'comment');
var Comment = sequelize.import(comment_path);
// Aplicamos la relacion con la tabla quiz (relaición 1 a n)
Comment.belongsTo(Quiz); // un comentario pertenece a una pregunta
Quiz.hasMany(Comment); // una pregunta puede tener varios comentarios

// exportar tabla
exports.Quiz = Quiz;
exports.Comment = Comment;

exports.sequelize = sequelize;


// sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().then(function () {
    //ejecuta el manejador una vez creada la tabla

    Quiz.count().then(function (count) {
        if (count === 0) {   // la tabla se inicializa solo si está vacía


            Quiz.bulkCreate(
                [{pregunta: '¿Cuál es la capital de Italia?', respuesta: 'Roma', tema: 'otro'},
                    {pregunta: '¿Cuál es la capital de Portugal?', respuesta: 'Lisboa', tema: 'otro'},
                    {pregunta: '¿Cuál es la capital de Grecia?', respuesta: 'Atenas', tema: 'otro'},
                    {pregunta: '¿Quién descubrió América?', respuesta: 'Cristóbal Colón', tema: 'otro'}
                ]).then(function () {
                    console.log('Base de datos (tabla quiz) inicializada')
                });
        }
    });
});


var chain = new Sequelize.Utils.QueryChainer();

