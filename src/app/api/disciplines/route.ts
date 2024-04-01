import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { NextRequest } from "next/server";
import Disciplines from "./management";

export async function GET(req: NextRequest) {
  try {
    const disciplines = new Disciplines();
    const res = await disciplines.get();
    return NextResponse.json(res, { status: 200 });
  } catch (e: any) {
    console.log("Error: ", e);
    return NextResponse.json(e, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const disciplines = new Disciplines();
    const res = await disciplines.add(body);
    return NextResponse.json(res, { status: 200 });
  } catch (e: any) {
    console.log("Error", e);
    return NextResponse.json(e, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const disciplines = new Disciplines();
    const res = await disciplines.delete(body.teacherCode);
    return NextResponse.json("success", { status: 200 });
  } catch (e: any) {
    console.log("Error", e);
    return NextResponse.json(e, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const disciplines = new Disciplines();
    const res = await disciplines.update(body);
    return NextResponse.json(res, { status: 200 });
  } catch (e: any) {
    console.log("Error", e);
    return NextResponse.json(e, { status: 500 });
  }
}
