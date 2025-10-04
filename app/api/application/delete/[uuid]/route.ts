"use server"
import { revalidatePath } from "next/cache";

export async function DELETE(
  req: Request,
  { params }: { params: { uuid: string } }
) {
  try {
    const { uuid } = await params;
    const url = `https://coolify.mdgp-backend.store/api/v1/applications/${uuid}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization:
          "Bearer 1|JN2WaTCFf1RGA8ZuHawXfYep3Y4k112J88SMHI5T0018f714",
      },
    });
    const data = await response.json();
    if (!response.ok || data.code !== 200) {
      return Response.json(
        { error: "Delete Failed", detail: data },
        { status: response.status }
      );
    }
    revalidatePath("/panel/manange-server");
    return Response.json({message: "Delete Success", result: data},{status: 200})
  } catch (error) {
    console.error(error)
    return Response.json({error: "Internal Server Error", detail: error}, {status:500})
  }
}
