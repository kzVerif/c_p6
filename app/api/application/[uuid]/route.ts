import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response, {params} : {params: {uuid: string}}) {
    try {
        const {uuid} = await params;
        const url = `${process.env.COOLIFY_URL}/api/v1/applications/${uuid}`
        const response = await fetch(url)
        const data = await response.json()
        return NextResponse.json({status:200,data: data})
    } catch (error) {
        
    }
}