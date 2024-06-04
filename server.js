const express = require('express');
const cors = require('cors');

const animaisRoutes = require('./routers/AnimaisRoutes');
const arrecadacaoRoutes = require('./routers/ArrecadacaoRoutes');
const castracaoRoutes = require('./routers/CastracaoRoutes');

const app = express();
const port = 3001;
app.use(express.json());
app.use(cors());
app.use(animaisRoutes);
app.use(arrecadacaoRoutes);
app.use(castracaoRoutes);
app.listen(port, ()=> `Executando na porta${port}`)