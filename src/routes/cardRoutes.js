import express from "express";
import CardController from "../controllers/cardController.js";

const cardsRouter = express.Router();

// Rotas de coleções
// GET /coleções - Listar todas as cartas
cardsRouter.get("/", CardController.getAllCards);

// GET /coleções/:id - Obter uma carta pelo ID
cardsRouter.get("/:id", CardController.getCardById);

// POST /coleções - Criar uma nova carta
cardsRouter.post("/", CardController.createCard);

// PUT /coleções/:id - Atualizar uma carta
cardsRouter.put("/:id", CardController.updateCard);

// DELETE /coleções/:id - Remover uma carta
cardsRouter.delete("/:id", CardController.deleteCard);

export default cardsRouter;