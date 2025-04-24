import prisma from "../../prisma/prisma.js";

class CardModel {
  // Obter todas as cartas
  async findAll() {
    const cards = await prisma.card.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log(cards);

    return cards;
  }

  // Obter uma carta pelo ID
  async findById(id) {
    const card = await prisma.card.findUnique({
      where: {
        id: Number(id),
      },
    });

    return card;
  }

  // Criar uma nova carta
  async create(name, rarity, attackPoints, defensePoints, imageUrl) {
    const newCard = await prisma.card.create({
      data: {
        name,
        rarity,
        attackPoints, 
        defensePoints,
        imageUrl,
      },
    });

    return newCard;
  }

  // Atualizar uma carta
  async update(
    id,
        name,
        rarity,
        attackPoints, 
        defensePoints,
        imageUrl,
  ) {
    const card = await this.findById(id);

    if (!card) {
      return null;
    }

    // Atualize a carta existente com os novos dados
    const data = {};
    if (name !== undefined) {
      data.name = name;
    }
    if (rarity !== undefined) {
      data.rarity = rarity;
    }
    if (attackPoints !== undefined) {
      data.attackPoints = attackPoints;
    }
    if (defensePoints !== undefined) {
      data.defensePoints = defensePoints;
    }
    if (imageUrl !== undefined) {
      data.imageUrl = imageUrl;
    }

    const cardUpdated = await prisma.card.update({
      where: {
        id: Number(id),
      },
      data,
    });

    return cardUpdated;
  }

  // Remover uma coleção
  async delete(id) {
    const card = await this.findById(id);

    if (!card) {
      return null;
    }

    await prisma.card.delete({
      where: {
        id: Number(id),
      },
    });

    return true;
  }
}

export default new CardModel();
