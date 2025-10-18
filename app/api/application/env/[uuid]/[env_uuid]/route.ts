import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  context: { params: { uuid: string; env_uuid: string } }
) {
  try {
    // ✅ เข้าถึง params แบบนี้เท่านั้น
    const { uuid, env_uuid } = context.params;

    const url = `${process.env.COOLIFY_URL}/api/v1/applications/${uuid}/envs/${env_uuid}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.COOLIFY_API_KEY}`, // แนะนำให้ย้ายไป .env
      },
    });

    let data: any = null;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!response.ok) {
      return NextResponse.json(
        { error: "Delete .Env Failed", detail: data },
        { status: response.status }
      );
    }

    revalidatePath(`/panel/manage-server/${uuid}`);
    return NextResponse.json(
      { message: "Delete Success", detail: data },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Delete Env Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", detail: error.message },
      { status: 500 }
    );
  }
}
