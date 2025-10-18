import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: Number } }
) {
  try {
    const { id } = await params;
    console.log(id);
    return NextResponse.json({
      msg: "Hello",
      id: id,
    });
  } catch (error) {
    console.log("Error from tot/[id],", error);
  }
}
