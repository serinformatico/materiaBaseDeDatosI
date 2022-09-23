const express = require('express')
const mysql   = require('mysql')
const myconn  = require('express-myconnection')


/* -------------------- EXPRESS -------------------- */
const app = express();
app.set('port', process.env.PORT || 9000);


/* ------------------- CONEXION DB ------------------- */
const dbCredentials = {
    host: 'localhost',
    port: 3310,
    user: 'root',
    password: 'root',
    database: 'muestra_basica'
};


/* -------------------- MIDDLEWERES ------------------- */
app.use(myconn(mysql, dbCredentials, 'single'));
app.use(express.json());


/* --------------------- ROUTES --------------------- */
const routes = express.Router();
routes.get('/', (req, res)=>{ res.send('Bienvenidos a la API de Base de datos I') });

require('./RoutesAPI').getRoutes(routes);
require('../frontend/RoutesAPP').getRoutes(routes);

app.use('/', routes);


/* ---------------------- SERVER ---------------------- */
app.listen(app.get('port'), ()=>{
    console.log('Server running on port', app.get('port'));
    console.log('Server URL: http://localhost:' + app.get('port') + '/api');
    console.log('Server URL: http://localhost:' + app.get('port') + '/app');
});