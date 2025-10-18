import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  res: Response,
  { params }: { params: { uuid: string } }
) {
  const { uuid } = await params;

  try {
    // ✅ ดึง JSON body จาก request
    const body = await request.json();

    const url = `${process.env.COOLIFY_URL}/api/v1/applications/${uuid}/envs`;

    const response = await fetch(url, {
      method: "PUT", // ✅ Coolify ต้องใช้ PUT สำหรับอัปเดต env
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.COOLIFY_API_KEY}`,
      },
      body: JSON.stringify(body.env), // ✅ body.env ควรเป็น object เช่น { "KEY": "VALUE" }
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: "Create .env Failed", detail: data },
        { status: response.status }
      );
    }

    revalidatePath(`/panel/manage-server/${uuid}`);
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
