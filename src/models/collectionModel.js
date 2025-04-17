import prisma from "../../prisma/prisma.js";

class CollectionModel {
  // Obter todas as coleções
  async findAll() {
    const collections = await prisma.collection.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log(collections);

    return collections;
  }

  // Obter uma coleção pelo ID
  async findById(id) {
    const collection = await prisma.collection.findUnique({
      where: {
        id: Number(id),
      },
    });

    return collection;
  }

  // Criar uma nova coleção
  async create(name, description, releaseYear) {
    const newCollection = await prisma.collection.create({
      data: {
        name,
        description,
        releaseYear,
      },
    });

    return newCollection;
  }

  // Atualizar uma coleção
  async update(
    name,
        description,
        releaseYear,
  ) {
    const collection = await this.findById(id);

    if (!collection) {
      return null;
    }

    // Atualize a coleção existente com os novos dados
    const data = {};
    if (name !== undefined) {
      data.name = name;
    }
    if (description !== undefined) {
      data.description = description;
    }
    if (releaseYear !== undefined) {
      data.releaseYear = releaseYear;
    }

    const collectionUpdated = await prisma.collection.update({
      where: {
        id: Number(id),
      },
      data,
    });

    return collectionUpdated;
  }

  // Remover uma coleção
  async delete(id) {
    const collection = await this.findById(id);

    if (!collection) {
      return null;
    }

    await prisma.collection.delete({
      where: {
        id: Number(id),
      },
    });

    return true;
  }
}

export default new CollectionModel();
