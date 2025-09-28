
export async function POST(req: Request) {
    try {
        const body = await req.json();
        // console.log("🚀 You Send This Body:", body);

        const token = process.env.COOLIFY_API_TOKEN || "1|JN2WaTCFf1RGA8ZuHawXfYep3Y4k112J88SMHI5T0018f714";

        const response = await fetch("https://coolify.mdgp-backend.store/api/v1/applications/public", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        // console.log("📦 Coolify Response Data:", data); // ✅ log error ที่แท้จริง

        return new Response(JSON.stringify(data), {
            status: response.status,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error("❌ API Route error:", err);
        return new Response(JSON.stringify({ error: "Failed to create application" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

export async function GET() {
  try {
    const url = "https://coolify.mdgp-backend.store/api/v1/applications";

    const response = await fetch(url, {
      headers: {
        Authorization: "Bearer 1|JN2WaTCFf1RGA8ZuHawXfYep3Y4k112J88SMHI5T0018f714",
        "Content-Type": "application/json",
      },
      cache: "no-store", // ✅ ป้องกัน cache
    });

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error: `Coolify API failed with status ${response.status}`,
        }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const data = await response.json();

    // ✅ ส่ง response กลับไปที่ client
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Error fetching applications:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch applications" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

