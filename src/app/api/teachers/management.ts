import { prisma } from "../../../lib/prisma";

export default class Teachers {
  constructor(){
    
  }
  async add(body: any) {
    if (
      await prisma.teachers.findFirst({
        where: { teacherCode: body.teacherCode },
      })
    ) {
      throw new Error("Преподователь с таким кодом уже есть");
    }
    return await prisma.teachers.create({
      data: body,
    });
  }

  async delete(teacherCode: string) {
    return await prisma.teachers.delete({
      where: {
        teacherCode: teacherCode,
      },
    });
  }

  async get() {
    return await prisma.teachers.findMany();
  }

  async getOne(teacherCode: string) {
    return await prisma.teachers.findUnique({
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
