import prisma from "../../prisma/prisma.js";

class CardModel {
  // Obter todas as cartas
  async findAll(rarity, attack, page, limit, name) {
    if (Number(page) < 1) {
      page = 1;
    }

    if (Number(limit) < 1 || Number(limit) > 100) {
      limit = 10;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const where = {}

    if (rarity) {
      where.rarity = rarity;
    }

    if (attack) {
      where.attackPoints = {
        gte: Number(attack), 
      }
    }

    if (name) {
      where.name = {
      contains: name,
    };
  }

    // Raridade Ultra Raro
    // Como fica maior ou igual que em inglês? Resposta: greather than
    const cards = await prisma.card.findMany({
      /* where: {
       rarity: "Ultra Rare",
        }
      }, */
      /* where: {
        attackPoints: {
          lte: 8000, //Menor ou igual a 8000
        }
      }, */

      /*where: {
        attackPoints: {
          gte: Number(attack), // Maior ou igual a 8000
         
        },
        rarity: rarity,
      }, */

      skip,
      take: Number(limit),
      where,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        collection: true, // Incluir a coleção associada à cart
      },
    });

    const totalExibidos = cards.length; // Total de cartas exibidas na página atual
    const totalGeral = await prisma.card.count({
      where,
    }); // Total de cartas no banco de dados

    //console.log(cards);

    return { cards, totalExibidos, totalGeral };
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
