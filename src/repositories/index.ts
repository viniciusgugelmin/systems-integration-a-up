import { database } from "../database";

class RootRepository {
  public async save({ mes, ano, horas, valor, funcionario }) {
    await database.folha.create({
      data: {
        mes,
        ano,
        horas,
        valor,
        funcionario: {
          connectOrCreate: {
            where: { cpf: funcionario.cpf },
            create: {
              nome: funcionario.nome,
              cpf: funcionario.cpf,
            },
          },
        },
      },
    });
  }

  public async getAll({ exceptId }) {
    return database.folha.findMany({
      where: {
        id: {
          notIn: exceptId,
        },
      },
      include: {
        funcionario: true,
      },
    });
  }
}

export { RootRepository };
