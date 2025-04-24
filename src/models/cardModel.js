import prisma from "../../prisma/prisma.js";

class CardModel {
  // Obter todas as cartas
  async findAll() {
    const cards = await prisma.card.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        collection: {
          select: {
            name: true,
            description: true, 
            releaseYear: true,
          }
        }
      }
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
      include: {
        collection: true,
      }
    });

    return card;
  }

  // Criar uma nova carta
  async create(name, rarity, attackPoints, defensePoints, imageUrl, collectionId) {
    const newCard = await prisma.card.create({
      data: {
        name,
        rarity,
        attackPoints, 
        defensePoints,
        imageUrl,
        collectionId: Number(collectionId), 
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
        collectionId
  ) {
    const card = await this.findById(id);

    if (!card) {
      return null;
    }

    // Atualize a carta existente com os novos dados

    const cardUpdated = await prisma.card.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        rarity,
        attackPoints, 
        defensePoints,
        imageUrl,
        collectionId: Number(collectionId), 
      }
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
