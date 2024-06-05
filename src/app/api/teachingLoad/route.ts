import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prismaClient";
import { NextRequest } from "next/server";
import TeachingLoad from "./management";

export async function GET(req: NextRequest) {
  try {
    const teachingLoad= new TeachingLoad();
    const res = await teachingLoad.get();
    return NextResponse.json(res, { status: 200 });
  } catch (e: any) {
    console.log("Error: ", e);
    return NextResponse.json(e, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const teachingLoad= new TeachingLoad();
    const res = await teachingLoad.add(body);
    return NextResponse.json(res, { status: 200 });
  } catch (e: any) {
    console.log("Error", e);
    return NextResponse.json(e, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const teachingLoad = new TeachingLoad();
    const res = await teachingLoad.delete(body.id);
    return NextResponse.json("success", { status: 200 });
  } catch (e: any) {
    console.log("Error", e);
    return NextResponse.json(e, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const teachingLoad = new TeachingLoad();
    const res = await teachingLoad.update(body);
    return NextResponse.json(res, { status: 200 });
  } catch (e: any) {
    console.log("Error", e);
    return NextResponse.json(e, { status: 500 });
  }
}
