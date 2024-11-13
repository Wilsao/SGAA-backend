const express = require('express');
const morgan = require("morgan");
const cors = require('cors');
const multer = require('multer');
const multerConfig = require('./multerConfig');
const routes = require('./routers');
const AnimalController = require("./controllers/AnimaisController");
const autenticado = require('./middleware/autenticado');
const database = require("./database/models");
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.post("/animal/upload/:animal_id", autenticado, multer(multerConfig).single('file'), AnimalController.adicionarImagens);
app.use('/uploads', express.static(path.resolve('uploads')));
routes(app);

module.exports = app;