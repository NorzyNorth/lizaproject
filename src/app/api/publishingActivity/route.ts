import { NextResponse } from "next/server";
import PublishingActivity from "@/app/api/publishingActivity/management";
import { prisma } from "../../../lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const publishingActivity = new PublishingActivity();
    const res = await publishingActivity.get();
    return NextResponse.json(res, { status: 200 });
    console.log('ppp')
  } catch (e: any) {
    console.log("Error: ", e);
    return NextResponse.json(e, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const publishingActivity = new PublishingActivity();
    const res = await publishingActivity.add(body);
    return NextResponse.json(res, { status: 200 });
  } catch (e: any) {
    console.log("Error", e);
    return NextResponse.json(e, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const publishingActivity = new PublishingActivity();
    const res = await publishingActivity.delete(body.teacherCode);
    return NextResponse.json("success", { status: 200 });
  } catch (e: any) {
    console.log("Error", e);
    return NextResponse.json(e, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const publishingActivity = new PublishingActivity();
    const res = await publishingActivity.update(body);
    return NextResponse.json(res, { status: 200 });
  } catch (e: any) {
    console.log("Error", e);
    return NextResponse.json(e, { status: 500 });
  }
}
