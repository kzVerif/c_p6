"use server"
import { revalidatePath } from "next/cache";

export async function GET(
  request: Request,
  { params }: { params: { uuid: string } }
) {
  try {
    const { uuid } = await params; // ✅ ต้องดึงจาก params
    const url = `https://coolify.mdgp-backend.store/applications/${uuid}/restart`;

    const response = await fetch(url, { method: "GET" });

    const data = await response.json();

    if (!response.ok || data.code !== 200) {
      return Response.json(
        { error: "Restart failed", details: data },
        { status: response.status }
      );
    }
    revalidatePath("/panel/manange-server");
    return Response.json(
      { message: "Restart success", result: data },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Internal Server Error", details: error },
      { status: 500 }
    );
  }
}
