const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const AnimalController = require('./controller/AnimalController');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

const animaisRoutes = require('./routers/AnimaisRoutes');
const arrecadacaoRoutes = require('./routers/ArrecadacaoRoutes');
const castracaoRoutes = require('./routers/CastracaoRoutes');
const adocaoRoutes = require('./routers/AdocaoRoutes');
const especieRoutes = require('./routers/EspecieRoutes');
const cuidadorRoutes = require('./routers/CuidadorRoutes');

app.use(animaisRoutes);
app.use(arrecadacaoRoutes);
app.use(castracaoRoutes);
app.use(adocaoRoutes);
app.use(especieRoutes);
app.use(cuidadorRoutes);

const animalController = new AnimalController();
app.put('/animal/:id', upload.single('foto'), (req, res) => animalController.atualizar(req, res));
app.post('/animal', upload.single('foto'), (req, res) => animalController.adicionar(req, res));

const port = 3001;

app.listen(port, () => console.log(`Executando na porta ${port}`));
