import express from "express";
import { config } from "dotenv";
import cors from "cors"; // Importa o middleware CORS

import animesRouter from "./routes/animeRoutes.js";
import collectionsRouter from "./routes/collectionRoutes.js";
import cardsRouter from "./routes/cardRoutes.js";
import usersRouter from "./routes/auth.routes.js";
import authRouther from "./routes/auth.routes.js";

config(); // Carrega variáveis de ambiente do arquivo .env
const port = process.env.PORT || 4001; // Define a porta do servidor

// Inicializa o Express
const app = express();
app.use(cors()); // Habilita CORS para todas as rotas

app.use(express.json()); // Parse de JSON

app.use("/animes", animesRouter); // Usar as rotas de animes
app.use("/collections", collectionsRouter);
app.use("/cards", cardsRouter);
app.use("/auth", authRouther);

// Rota base para verificar se o servidor está rodando
app.get("/", (req, res) => {
  res.json({ message: "API de Coleção de Animes funcionando!" });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
