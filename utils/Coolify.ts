interface Application {
  serverName: string
  serverDesc: string
  githubUrl: string
}

export async function CreateApplication(values: Application) {
  try {
    const url = "https://coolify.mdgp-backend.store//api/v1/applications/public"

    const body = {
      project_uuid: "dk0gs0w0w0gcwwwgwsc08s04",
      server_uuid: "p0ccgs4w8ok008okw008s0gg",
      environment_uuid: "j8kwg44ccwwogcssgggksoww",
      git_repository: values.githubUrl,
      git_branch: "main",
      build_pack: "nixpacks",
      name: values.serverName,
      description: values.serverDesc,
      instant_deploy: true,
      health_check_enabled: true,
      health_check_path: "/",
      ports_exposes: "3000",
      domains: `${values.serverName}.mdgp-backend.store`,
    }

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 1|JN2WaTCFf1RGA8ZuHawXfYep3Y4k112J88SMHI5T0018f714`, // 🔑 เอา token จาก env
      },
      body: JSON.stringify(body),
    })
    console.log(res);
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    return await res.json()
  } catch (error) {
    console.log("❌ Cannot CreateApplication Reason: ", error)
    return {
      code: 400,
      msg: "สร้าง Application ไม่สำเร็จ",
    }
  }
}
