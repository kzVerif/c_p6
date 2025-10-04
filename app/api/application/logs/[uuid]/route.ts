export async function GET(
  req: Request,
  { params }: { params: { uuid: string } }
) {
  try {
    const { uuid } = await params; // ✅ ไม่ต้อง await
    const url = `https://coolify.mdgp-backend.store/api/v1/applications/${uuid}/logs`;

    const response = await fetch(url, {
      headers: {
        "Content-type": "application/json",
        Authorization:
          "Bearer 1|JN2WaTCFf1RGA8ZuHawXfYep3Y4k112J88SMHI5T0018f714",
      },
      cache: "no-store",
    }); // ป้องกัน cache log
    const data = await response.json();

    if (!response.ok || (data?.code && data.code !== 200)) {
      return Response.json(
        { error: "Get Logs Failed", detail: data },
        { status: response.status || 500 }
      );
    }

    return Response.json(
      { message: "Get Logs Success", result: data },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Get Logs Error:", error);
    return Response.json(
      { error: "Internal Server Error", detail: error.message ?? error },
      { status: 500 }
    );
  }
}
