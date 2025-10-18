export async function GET(req: Request, {params} : {params: {uuid: string}}) {
    try {
        const {uuid} = await params;
        const url = `${process.env.COOLIFY_URL}/api/v1/applications/${uuid}`
        const response = await fetch(url)
    } catch (error) {
        
    }
}