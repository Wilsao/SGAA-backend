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

const PDFDocument = require('pdfkit');
const app = express();

app.get('/relatorio', (req, res) => {
  // Configurando o cabeçalho para retornar o PDF
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline; filename=relatorio.pdf');

  // Criando o documento PDF
  const doc = new PDFDocument();

  // Enviar o conteúdo do PDF diretamente no `res`
  doc.pipe(res);

  // Adicionando título
  doc.fontSize(18).text('Relatório de Desempenho', {
    align: 'center',
  });
  doc.moveDown();

  // Adicionando subtítulo
  doc.fontSize(14).text('Data: ' + new Date().toLocaleDateString(), {
    align: 'left',
  });
  doc.moveDown();

  // Adicionando uma tabela simulada
  const dados = [
    { item: 'Produto A', quantidade: 10, preco: 50.0 },
    { item: 'Produto B', quantidade: 5, preco: 100.0 },
    { item: 'Produto C', quantidade: 20, preco: 25.0 },
  ];

  doc.text('Itens:', { underline: true });

  dados.forEach(({ item, quantidade, preco }, i) => {
    doc.text(`${i + 1}. ${item} - Quantidade: ${quantidade}, Preço: R$${preco.toFixed(2)}`);
  });

  doc.moveDown();

  // Adicionando um gráfico ou imagem (exemplo com uma imagem genérica)
  doc.text('Resumo do Gráfico:', { underline: true });
  doc.image('caminho/para/imagem.png', {
    fit: [250, 250],
    align: 'center',
    valign: 'center',
  });

  // Finalizando o PDF
  doc.end();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.post("/animal/upload/:animal_id", autenticado, multer(multerConfig).single('file'), AnimalController.adicionarImagens);
app.use('/uploads', express.static(path.resolve('uploads')));
routes(app);

module.exports = app;