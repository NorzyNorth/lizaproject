"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prismaClient";

export const changeSelfUser = async (formData: FormData) => {
  const id = formData.get("id");
  const fio = formData.get("fio");
  const email = formData.get("email");
  const phone = formData.get("phone");
  if (
    id &&
    typeof id === "string" &&
    fio &&
    typeof fio === "string" &&
    email &&
    typeof email === "string" &&
    phone &&
    typeof phone === "string"
  ) {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        fio: fio,
        email: email,
        phone: phone,
      },
    });
    revalidatePath("/dashboard/profile");
  } else {
    return "f";
  }
};
