import { prisma } from "../../../lib/prismaClient";

export default class PublishingActivity {
  constructor(){
    
  }
  async add(body: any) {
    if (
      await prisma.publishingActivity.findFirst({
        where: { editionCode: body.editionCode },
      })
    ) {
      throw new Error("Издательская деятельность с таким кодом уже есть");
    }
    return await prisma.publishingActivity.create({
      data: body,
    });
  }

  async delete(editionCode: string) {
    return await prisma.publishingActivity.delete({
      where: {
        editionCode: editionCode,
      },
    });
  }

  async get() {
    return await prisma.publishingActivity.findMany();
  }

  async getOne(editionCode: string) {
    return await prisma.publishingActivity.findUnique({
      where: {
        editionCode: editionCode,
      },
    });
  }

  async update(body: any) {
    return await prisma.publishingActivity.update({
      where: {
        editionCode: body.editionCode,
      },
      data: body,
    });
  }
}
