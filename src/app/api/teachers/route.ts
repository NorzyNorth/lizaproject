import { NextResponse } from "next/server";
import Teachers from "@/app/api/teachers/management";
import { prisma } from "../../../lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const teachers = new Teachers();
    const res = await teachers.get();
    return NextResponse.json(res, { status: 200 });
  } catch (e: any) {
    console.log("Error: ", e);
    return NextResponse.json(e, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const teachers = new Teachers();
    const res = await teachers.add(body);
    return NextResponse.json(res, { status: 200 });
  } catch (e: any) {
    console.log("Error", e);
    return NextResponse.json(e, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const teachers = new Teachers();
    const res = await teachers.delete(body.teacherCode);
    return NextResponse.json("success", { status: 200 });
  } catch (e: any) {
    console.log("Error", e);
    return NextResponse.json(e, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const teachers = new Teachers();
    const res = await teachers.update(body);
    return NextResponse.json(res, { status: 200 });
  } catch (e: any) {
    console.log("Error", e);
    return NextResponse.json(e, { status: 500 });
  }
}
