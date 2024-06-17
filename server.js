const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const multer = require('multer');

// Inicializa o Express
const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configura o armazenamento com multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Importa os roteadores
const animaisRoutes = require('./routers/AnimaisRoutes');
const arrecadacaoRoutes = require('./routers/ArrecadacaoRoutes');
const castracaoRoutes = require('./routers/CastracaoRoutes');
const adocaoRoutes = require('./routers/AdocaoRoutes');

// Configura as rotas
app.use(animaisRoutes);
app.use(arrecadacaoRoutes);
app.use(castracaoRoutes);
app.use(adocaoRoutes);

// Rotas para cadastro e atualização de animais
app.put('/animal/:id', upload.single('foto'), async (req, res) => {
  const id = req.params.id;
  const animalData = JSON.parse(req.body.animal);
  if (req.file) {
    animalData.foto = req.file.path; // Salva o caminho da foto no objeto do animal
  }
  // Atualize seu banco de dados com animalData incluindo o caminho da foto
  // Exemplo de atualização no banco de dados
  try {
    // Supondo que você tenha um modelo Animal para interagir com seu banco de dados
    await Animal.update(animalData, { where: { id: id } });
    res.send('Animal atualizado com sucesso');
  } catch (error) {
    console.error('Erro ao atualizar animal:', error);
    res.status(500).send('Erro ao atualizar animal');
  }
});

app.post('/animal', upload.single('foto'), async (req, res) => {
  const animalData = JSON.parse(req.body.animal);
  if (req.file) {
    animalData.foto = req.file.path; // Salva o caminho da foto no objeto do animal
  }
  // Salve no banco de dados com animalData incluindo o caminho da foto
  // Exemplo de inserção no banco de dados
  try {
    // Supondo que você tenha um modelo Animal para interagir com seu banco de dados
    await Animal.create(animalData);
    res.send('Animal cadastrado com sucesso');
  } catch (error) {
    console.error('Erro ao cadastrar animal:', error);
    res.status(500).send('Erro ao cadastrar animal');
  }
});

// Define a porta
const port = 3001;

// Inicia o servidor
app.listen(port, () => console.log(`Executando na porta ${port}`));