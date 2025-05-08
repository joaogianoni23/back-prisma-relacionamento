import CardModel from "../models/cardModel.js";
import CollectionModel from "../models/collectionModel.js"; // Importação para validação do collectionId

class CardController {
  // GET /api/cartas
  async getAllCards(req, res) {
    const rarity = req.query.rarity; // Obter o parâmetro de consulta "rarity" da URL
    const attack = req.query.attack; // Obter o parâmetro de consulta "attack" da URL
    const page = req.query.page || 1; // Obter o parâmetro de consulta "page" da URL, padrão 1
    const limit = req.query.limit || 10; // Limite de itens por página

    const name = req.query.name; // Obter o parâmetro de consulta "name" da URL

    try {
      const cards = await CardModel.findAll(rarity, attack, page, limit, name);
      res.json(cards);
    } catch (error) {
      console.error("Erro ao buscar cartas:", error);
      res.status(500).json({ error: "Erro ao buscar cartas" });
    }
  }

  // GET /api/cartas/:id
  async getCardById(req, res) {
    try {
      const { id } = req.params;

      const card = await CardModel.findById(id);

      if (!card) {
        return res.status(404).json({ error: "Carta não encontrada" });
      }

      res.json(card);
    } catch (error) {
      console.error("Erro ao buscar carta:", error);
      res.status(500).json({ error: "Erro ao buscar carta" });
    }
  }

  // POST /api/cartas
  async createCard(req, res) {
    try {
      // Validação básica
      const {
        name,
        rarity,
        attackPoints,
        defensePoints,
        imageUrl,
        collectionId,
      } = req.body;
 console.log(name, rarity, attackPoints, defensePoints, imageUrl, collectionId);
      // Verifica se todos os campos da carta foram fornecidos
      if (
        !name ||
        !rarity ||
        !attackPoints ||
        !defensePoints ||
        !collectionId
      ) {
        return res
          .status(400)
          .json({ error: "Todos os campos são obrigatórios" });
      }

      // Verifica se o collectionId existe
      const collectionExists = await CollectionModel.findById(collectionId);
      if (!collectionExists) {
        return res
          .status(400)
          .json({ error: "CollectionId inválido ou não encontrado" });
      }

      // Criar a nova carta
      const newCard = await CardModel.create(
        name,
        rarity,
        attackPoints,
        defensePoints,
        imageUrl,
        collectionId
      );

      if (!newCard) {
        return res.status(400).json({ error: "Erro ao criar carta" });
      }

      res.status(201).json(newCard);
    } catch (error) {
      if (error.code === "P2003") {
        return res
          .status(400)
          .json({ error: "CollectionId inválido ou não encontrado" });
      }
      console.error("Erro ao criar carta:", error);
      res.status(500).json({ error: "Erro ao criar carta" });
    }
  }

  // PUT /api/carta/:id
  async updateCard(req, res) {
    try {
      const { id } = req.params;
      const {
        name,
        rarity,
        attackPoints,
        defensePoints,
        imageUrl,
        collectionId,
      } = req.body;

      // Verifica se o collectionId existe, se fornecido
      if (collectionId) {
        const collectionExists = await CollectionModel.findById(collectionId);
        if (!collectionExists) {
          return res
            .status(400)
            .json({ error: "CollectionId inválido ou não encontrado" });
        }
      }

      // Atualizar a carta
      const updatedCard = await CardModel.update(
        id,
        name,
        rarity,
        attackPoints,
        defensePoints,
        imageUrl,
        collectionId
      );

      if (!updatedCard) {
        return res.status(404).json({ error: "Carta não encontrada" });
      }

      res.json(updatedCard);
    } catch (error) {
      console.error("Erro ao atualizar carta:", error);
      res.status(500).json({ error: "Erro ao atualizar carta" });
    }
  }

  // DELETE /api/cartas/:id
  async deleteCard(req, res) {
    try {
      const { id } = req.params;

      // Remover a carta
      const result = await CardModel.delete(id);

      if (!result) {
        return res.status(404).json({ error: "Carta não encontrada" });
      }

      res.status(204).end(); // Resposta sem conteúdo
    } catch (error) {
      console.error("Erro ao remover carta:", error);
      res.status(500).json({ error: "Erro ao remover carta" });
    }
  }
}

export default new CardController();