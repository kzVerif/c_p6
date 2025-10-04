"use server"
import { revalidatePath } from "next/cache";
export async function GET(
  request: Request,
  { params }: { params: { uuid: string } }
) {
  try {
    const { uuid } = await params;
    const url = `https://coolify.mdgp-backend.store/api/v1/applications/${uuid}/stop`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 1|JN2WaTCFf1RGA8ZuHawXfYep3Y4k112J88SMHI5T0018f714",
      },
      method: "GET",
    });
    // console.log(response);

    const data = await response.json();

    if (!response.ok || data.code !== 200) {
      return Response.json(
        { error: "Stop failed", details: data },
        { status: response.status }
      );
    }
    revalidatePath("/panel/manange-server");
    return Response.json(
      { message: "Stop success", result: data },
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
