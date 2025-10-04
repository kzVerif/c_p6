"use server";

import { ur } from "zod/v4/locales";

interface Application {
  serverName: string;
  serverDesc: string;
  githubUrl: string;
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
    };

    const res = await fetch("http://localhost:3000/api/application", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    // console.log(res);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.log("❌ Cannot CreateApplication Reason: ", error);
    return {
      code: 400,
      msg: "สร้าง Application ไม่สำเร็จ",
    };
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

// หยุด Server
export async function StopServer(uuid: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/application/stop/${uuid}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Stop server failed");
    }

    return await response.json();
  } catch (error) {
    console.error("StopServer Error:", error);
    throw error;
  }
}

// เริ่ม Server
export async function StartServer(uuid: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/application/start/${uuid}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Start server failed");
    }

    return await response.json();
  } catch (error) {
    console.error("StartServer Error:", error);
    throw error;
  }
}

// รีสตาร์ท Server
export async function RestartServer(uuid: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/application/restart/${uuid}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Restart server failed");
    }

    return await response.json();
  } catch (error) {
    console.error("RestartServer Error:", error);
    throw error;
  }
}

// ลบ Server
export async function DeleteServer(uuid: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/application/delete/${uuid}`,
      { method: "DELETE" }
    );
    if (!response.ok) {
      throw new Error("Delete server failed");
    }

    return await response.json();
  } catch (error) {
    console.error("DeleteServer Error:", error);
    throw error;
  }
}

// Get Logs
export async function GetLogServer(uuid: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/application/logs/${uuid}`
    );
    if (!response.ok) {
      throw new Error("Get Logs failed");
    }
    return await response.json();
  } catch (error) {
    console.error("Get Logs Error:", error);
    throw error;
  }
}

// ▶ CREATE
export async function CreateEnv(uuid: string, body: object) {
  try {
    const url = `http://localhost:3000/api/application/env/${uuid}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`CreateEnv failed: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error in CreateEnv:", error.message);
    throw error;
  }
}

// ▶ READ (GET)
export async function GetEnv(uuid: string) {
  try {
    const url = `http://localhost:3000/api/application/env/${uuid}`;

    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`GetEnv failed: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error in GetEnv:", error.message);
    throw error;
  }
}

// ▶ UPDATE (PATCH)
export async function UpdateEnv(uuid: string, body: object) {
  try {
    const url = `http://localhost:3000/api/application/env/${uuid}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`UpdateEnv failed: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error in UpdateEnv:", error.message);
    throw error;
  }
}

// ▶ DELETE
export async function DeleteEnv(uuid: string, env_uuid: string) {
  try {
    const url = `http://localhost:3000/api/application/env/${uuid}/${env_uuid}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`DeleteEnv failed: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error in DeleteEnv:", error.message);
    throw error;
  }
}

