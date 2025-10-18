

// ▶ GET Environment Variables
export async function GET(
  req: Request, res: Response, {params} : {params: {uuid: string}}
) {
  try {
    const {uuid} = await params; // ✅ ไม่ต้อง await
    const url = `${process.env.COOLIFY_URL}/api/v1/applications/${uuid}/envs`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 1|JN2WaTCFf1RGA8ZuHawXfYep3Y4k112J88SMHI5T0018f714",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        { error: "Get .Env Failed", detail: data },
        { status: response.status }
      );
    }

    return Response.json(
      { message: "✅ Get .Env Success", result: data },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Get Env Error:", error);
    return Response.json(
      { error: "Get .Env Error", detail: error.message },
      { status: 500 }
    );
  }
}

// ▶ UPDATE Environment Variables
export async function PUT(
  req: Request, res: Response, {params} : {params: {uuid: string}}
) {
  try {
    const {uuid} = params; // ✅ ไม่ต้อง await
    const body = await req.json();

    const url = `${process.env.COOLIFY_URL}/api/v1/applications/${uuid}/envs`;

    // ✅ Coolify ใช้ PUT (ไม่ใช่ PATCH)
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 1|JN2WaTCFf1RGA8ZuHawXfYep3Y4k112J88SMHI5T0018f714",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        { error: "Update .Env Failed", detail: data },
        { status: response.status }
      );
    }

    return Response.json(
      { message: "✅ Update .Env Success", result: data },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Update Env Error:", error);
    return Response.json(
      { error: "Update .Env Error", detail: error.message },
      { status: 500 }
    );
  }
}
