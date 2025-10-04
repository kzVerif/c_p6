export async function GET(
  req: Request,
  { params }: { params: { uuid: string } }
) {
  try {
    const { uuid } = await params;
    const url = `https://coolify.mdgp-backend.store/api/v1/applications/${uuid}/envs`;
    const response = await fetch(url, {
      headers: {
        "Content-type": "application/json",
        Authorization:
          "Bearer 1|JN2WaTCFf1RGA8ZuHawXfYep3Y4k112J88SMHI5T0018f714",
      },
    });
    const data = await response.json();
    console.log(response);

    if (response.status !== 200) {
      return Response.json(
        { error: "Get .Env  Failed", detail: data },
        { status: response.status }
      );
    }

    return Response.json(
      { message: "Get .Env Success", result: data },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Get .Env  Error", detail: error },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { uuid: string } }
) {
  try {
    const { uuid } = await params; // ❌ ไม่ต้อง await
    const body = await req.json();

    const url = `https://coolify.mdgp-backend.store/api/v1/applications/${uuid}/envs`;

    const response = await fetch(url, {
      method: "PATCH", // ตรงกับ PATCH function
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer 1|JN2WaTCFf1RGA8ZuHawXfYep3Y4k112J88SMHI5T0018f714",
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

    return Response.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Update Env Error:", error);
    return Response.json(
      { error: "Internal Server Error", detail: error.message },
      { status: 500 }
    );
  }
}

