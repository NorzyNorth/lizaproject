import { prisma } from "../../../lib/prismaClient";

export default class Disciplines {
  constructor(){
    
  }
  async add(body: any) {
    if (
      await prisma.disciplines.findFirst({
        where: { disciplineCode: body.disciplineCode },
      })
    ) {
      throw new Error("Дисциплина с таким кодом уже есть");
    }
    return await prisma.disciplines.create({
      data: body,
    });
  }

  async delete(disciplineCode: string) {
    return await prisma.disciplines.delete({
      where: {
        disciplineCode: disciplineCode,
      },
    });
  }

  async get() {
    return await prisma.disciplines.findMany();
  }

  async getOne(disciplineCode: string) {
    return await prisma.disciplines.findUnique({
      where: {
        disciplineCode: disciplineCode,
      },
    });
  }

  async update(body: any) {
    return await prisma.disciplines.update({
      where: {
        disciplineCode: body.disciplineCode,
      },
      data: body,
    });
  }
}
