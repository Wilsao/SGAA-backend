const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const path = require('path');
// const multer = require('multer');
// const AnimalController = require('./src/controllers/AnimalController');
const routes = require('./routers');

const app = express();
routes(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}_${file.originalname}`);
//   }
// });

// const upload = multer({ storage: storage });
// const animalController = new AnimalController();
// app.put('/animal/:id', upload.single('foto'), (req, res) => animalController.atualizar(req, res));
// app.post('/animal', upload.single('foto'), (req, res) => animalController.adicionar(req, res));

module.exports = app;