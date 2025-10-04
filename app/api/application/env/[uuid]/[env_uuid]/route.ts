export async function DELETE(
  req: Request,
  { params }: { params: { uuid: string; env_uuid: string } }
) {
  try {
    const { uuid, env_uuid } = await params; // ❌ ไม่ต้อง await

    const url = `https://coolify.mdgp-backend.store/api/v1/applications/${uuid}/envs/${env_uuid}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer 1|JN2WaTCFf1RGA8ZuHawXfYep3Y4k112J88SMHI5T0018f714", // ต้องมี token
      },
    });

    // DELETE บาง API อาจไม่ส่ง body (204 No Content)
    let data: any = null;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!response.ok) {
      return Response.json(
        { error: "Delete .Env Failed", detail: data },
        { status: response.status }
      );
    }

    return Response.json(
      { message: "Delete Success", detail: data },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Delete Env Error:", error);
    return Response.json(
      { error: "Internal Server Error", detail: error.message },
      { status: 500 }
    );
  }
}