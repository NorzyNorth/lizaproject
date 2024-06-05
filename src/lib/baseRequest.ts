import { prisma } from "./prismaClient";

export default class TeachingLoad {
  constructor() {}
  async add(body: any) {
    if (
      await prisma.teachingLoad.findFirst({
        where: { id: body.id },
      })
    ) {
      throw new Error("Нагрузки с таким кодом уже есть");
    }
    return await prisma.teachingLoad.create({
      data: body,
    });
  }

  async delete(id: string) {
    return await prisma.teachingLoad.delete({
      where: {
        id : id,
      },
    });
  }

  async get() {
    return await prisma.teachingLoad.findMany();
  }

  async getOne(id: string) {
    return await prisma.teachingLoad.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(body: any) {
    return await prisma.teachingLoad.update({
      where: {
        id: body.id,
      },
      data: body,
    });
  }
}
