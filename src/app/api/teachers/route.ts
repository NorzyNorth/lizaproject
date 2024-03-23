import { NextResponse } from "next/server"
import Structures from "./management"
import { prisma } from "../../../lib/prisma"
import { NextRequest } from "next/server";


export async function GET(req: NextRequest) {
  try {
    const myStructure = new MyStructure()
    const who = await myStructure.permission(
      req.headers.get("authorization") as string , await getServerSession(req)
    )
    if (!who) {
      throw new Error("Нет доступа")
    }
    if (who.view.where == "nowhere" || who.view.where == null) {
      throw new Error("Нет доступа")
    }

    const structures = new Structures()
    const res = await structures.get(who.view.where)
    console.log("================================================")
    console.log(res)
    console.log("================================================")
    return NextResponse.json(Array.isArray(res) ? res : [res], { status: 200 })
  } catch (e: any) {
    if (e.message == "Нет доступа")
      return NextResponse.json({ message: e.message }, { status: 403 })
    return NextResponse.json({ message: e.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const structures = new Structures()
    const res = await structures.add(
      body.name,
      body.address,
      body.phone,
      body.e_mail,
      body.organisation
    )
    return NextResponse.json(res, { status: 200 })
  } catch (e: any) {
    console.log(e)
    if (e.message == "Нет доступа")
      return NextResponse.json({ message: e.message }, { status: 403 })
    return NextResponse.json({ message: e.message }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json()
    const myStructure = new MyStructure()
    const who = await myStructure.permission(
      req.headers.get("authorization") as string,
      await getServerSession(req)
    )
    if (!who) {
      throw new Error("Нет доступа")
    }
    if (who.delete.where == "nowhere") {
      throw new Error("Нет доступа")
    }
    if (who.delete.where != "everywhere") {
      if (!who.delete.where) throw new Error("Нет доступа")
      const findStructure = await prisma.structure.findMany({
        where: {
          organisationId: who.delete.where,
        },
        select: {
          id: true,
        },
      })
      const f = findStructure.find((elem) => {
        if (elem.id == body.id) {
          return 200
        }
      })
      if (!f) throw new Error("Нет доступа")
    }

    const structures = new Structures()
    const res = await structures.delete(body.id)
    return NextResponse.json({ message: "Deleted" }, { status: 200 })
  } catch (e: any) {
    if (e.message == "Нет доступа")
      return NextResponse.json({ message: e.message }, { status: 403 })
    return NextResponse.json({ message: e.message }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const myStructure = new MyStructure()
    const who = await myStructure.permission(
      req.headers.get("authorization") as string,
      await getServerSession(req)
    )
    if (!who) {
      throw new Error("Нет доступа")
    }
    if (who.update.where == "nowhere" || who.update.where == null) {
      throw new Error("Нет доступа")
    }
    if (who.update.where != "everywhere") {
      if (!who.update.where) throw new Error("Нет доступа")
      const findStructure = await prisma.structure.findMany({
        where: {
          //@ts-ignore
          organisationId: who.delete.where,
        },
        select: {
          id: true,
        },
      })
      const f = findStructure.find((elem) => {
        if (elem.id == body.id) {
          return 200
        }
      })
      if (!f) throw new Error("Нет доступа")
    }

    const structures = new Structures()
    const res = await structures.update(
      body.id,
      body.name,
      body.address,
      body.phone,
      body.e_mail
    )
    console.log(res)
    return NextResponse.json(res, { status: 200 })
  } catch (e: any) {
    if (e.message == "Нет доступа")
      return NextResponse.json({ message: e.message }, { status: 403 })
    return NextResponse.json({ message: e.message }, { status: 500 })
  }
}
