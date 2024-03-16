import { prisma } from "../../../lib/prisma";

export default class Teachers {
  async add(body: any) {
    if (
      await prisma.teachers.findFirst({
        where: { teacherCode: body.teacherCode },
      })
    ) {
      throw new Error("Преподователь с таким кодом уже есть");
    }
    const res = await prisma.teachers.create({
      data: body,
    });
  }

  async delete(teacherCode: string) {
    const res = await prisma.teachers.delete({
      where: {
        teacherCode: teacherCode,
      },
    });
  }

  async get() {
    return await prisma.teachers.findMany();
  }

  async getOne(teacherCode: string) {
    return await prisma.teachers.findMany({
      where: {
        teacherCode: teacherCode,
      },
    });
  }

  async update(body: any) {
    return await prisma.teachers.update({
      where: {
        teacherCode: body.teacherCode,
      },
      data: body,
    });
  }
}
