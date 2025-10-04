export async function POST(
  req: Request) {
  try {
    const body = await req.json();

    const url = `https://coolify.mdgp-backend.store/api/v1/applications/${body.uuid}/envs`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 1|JN2WaTCFf1RGA8ZuHawXfYep3Y4k112J88SMHI5T0018f714", // ต้องมี token
      },
      body: JSON.stringify(body.env),
    });

    const data = await response.json();
    console.log(response);
    
    if (response.status !== 200) {
      return Response.json(
        { error: "Create .Env  Failed", detail: data },
        { status: response.status }
      );
    }
    return Response.json(data);
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
