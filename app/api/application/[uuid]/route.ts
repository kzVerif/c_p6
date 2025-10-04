export async function GET(req: Request, {params} : {params: {uuid: string}}) {
    try {
        const {uuid} = await params;
        const url = `hppts://coolify.mdgp-backend.store/api/v1/applications/${uuid}`
        const response = await fetch(url)
    } catch (error) {
        
    }
}