import { revalidatePath } from "next/cache";

export async function POST(
  req: Request,// ✅ ดึง uuid จาก URL
) {
  try {
    
    const body = await req.json();

    // ✅ เอา uuid จาก params แทน body.uuid
    const url = `${process.env.COOLIFY_URL}/api/v1/applications/${body.uuid}/envs`;

    const response = await fetch(url, {
      method: "POST", // ✅ Coolify ต้องใช้ PUT ไม่ใช่ POST
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 1|JN2WaTCFf1RGA8ZuHawXfYep3Y4k112J88SMHI5T0018f714",
      },
      body: JSON.stringify(body.env), // ✅ ต้องเป็น object { "KEY": "VALUE" }
    });

    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        { error: "Create .Env Failed", detail: data },
        { status: response.status }
      );
    }

    revalidatePath(`/panel/manage-server/${body.uuid}`)
    return Response.json(data, { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
