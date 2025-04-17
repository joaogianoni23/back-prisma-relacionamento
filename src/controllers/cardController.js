import CardModel from "../models/cardModel.js";

class CardController {
  // GET /api/cartas
  async getAllCards(req, res) {
    try {
      const cards = await CardModel.findAll();
      res.json(cards);
    } catch (error) {
      console.error("Erro ao buscar carta:", error);
      res.status(500).json({ error: "Erro ao buscar carta" });
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
      } = req.body;

      // Verifica se todos os campos da carta foram fornecidos
      if (
        !name ||
        !rarity ||
        !attackPoints ||
        !defensePoints ||
        !imageUrl 
      ) {
        return res
          .status(400)
          .json({ error: "Todos os campos são obrigatórios" });
      }

      // Criar a nova carta
      const newCard = await CardModel.create(
        name,
        rarity,
        attackPoints,
        defensePoints,
        imageUrl
      );

      if (!newCard) {
        return res.status(400).json({ error: "Erro ao criar carta" });
      }

      res.status(201).json(newCard);
    } catch (error) {
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
      } = req.body;

      // Atualizar a carta
      const updatedCard = await CardModel.update(
        id,
        name,
        rarity,
        attackPoints,
        defensePoints,
        imageUrl
      );

      if (!updatedCard) {
        return res.status(404).json({ error: "Carta não encontrado" });
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
        return res.status(404).json({ error: "Carta não encontrado" });
      }

      res.status(204).end(); // Resposta sem conteúdo
    } catch (error) {
      console.error("Erro ao remover carta:", error);
      res.status(500).json({ error: "Erro ao remover carta" });
    }
  }
}

export default new CardController();
