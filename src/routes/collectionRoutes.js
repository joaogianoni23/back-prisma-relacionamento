import express from "express";
import CollectionController from "../controllers/collectionController.js";

const collectionsRouter = express.Router();

// Rotas de coleções
// GET /coleções - Listar todas as coleções
collectionsRouter.get("/", CollectionController.getAllCollections);

// GET /coleções/:id - Obter uma coleção pelo ID
//collectionsRouter.get("/:id", CollectionController.getCollectionById);

// POST /coleções - Criar uma nova coleção
//collectionsRouter.post("/", CollectionController.createCollection);

// PUT /coleções/:id - Atualizar uma coleção
//collectionsRouter.put("/:id", CollectionController.updateCollection);

// DELETE /coleções/:id - Remover uma coleção
//collectionsRouter.delete("/:id", CollectionController.deleteCollection);

export default collectionsRouter;
