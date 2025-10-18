import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    msg: "Hello!",
  });
}

export async function POST(req: Request) {
  const data = await req.json();
  console.log(data);

  return NextResponse.json({
    msg: "Hello!",
    data: data,
  });
}

// CRUD CREATE READ UPDATE DELETE
