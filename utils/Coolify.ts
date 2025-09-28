interface Application {
  serverName: string
  serverDesc: string
  githubUrl: string
}

export async function CreateApplication(values: Application) {
  try {
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
      domains: `https://${values.serverName.toLowerCase()}.mdgp-backend.store`,
    }

    const res = await fetch("/api/application", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
    // console.log(res);
    
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

export async function GetAllApplications() {
  try {
    const res = await fetch("http://localhost:3000/api/application", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // ป้องกันไม่ให้ cache
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch applications: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("❌ Error GetAllApplications:", error);
    return {
      code: 500,
      msg: "ไม่สามารถดึงข้อมูล Applications ได้",
    };
  }
}

