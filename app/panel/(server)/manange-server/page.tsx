import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConnectionInfo } from "@/components/ConnectionInfo";

export default function Page() {
  // mock data สมมติได้จาก backend
  const servers = [
    {
      id: 1,
      name: "K-Cloud Server#01",
      desc: "This is K-Cloud Server#01",
      status: "Active",
      expire: "28/10/2568 22:30:55",
    },
    {
      id: 2,
      name: "K-Cloud Server#02",
      desc: "This is K-Cloud Server#02",
      status: "Active",
      expire: "15/11/2568 18:00:00",
    },
    {
      id: 3,
      name: "K-Cloud Server#03",
      desc: "This is K-Cloud Server#03",
      status: "Expired",
      expire: "01/09/2568 12:00:00",
    },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen container space-y-6 py-10">
      {/* Title */}
      <h1 className="text-4xl font-semibold text-center">จัดการ Server</h1>
      <hr className="border-gray-300 w-full max-w-3xl" />

      {/* Grid Cards */}
      <div className="w-full px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servers.map((server) => (
            <Card
              key={server.id}
              className="shadow-lg hover:shadow-xl transition rounded-xl"
            >
              {/* Header */}
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-bold">
                    {server.name}
                  </CardTitle>
                  <CardDescription>{server.desc}</CardDescription>
                </div>
                <Badge
                  variant={
                    server.status === "Active"
                      ? "default"
                      : server.status === "Expired"
                      ? "destructive"
                      : "secondary"
                  }
                  className="px-3 py-1 text-sm"
                >
                  {server.status}
                </Badge>
              </CardHeader>

              {/* Content */}
              <CardContent className="space-y-1 text-gray-700">
                <p className="font-medium">วันที่หมดอายุ</p>
                <p className="text-sm">{server.expire}</p>
                {/* <br />
                <p className="font-medium">Database Info</p>
                <p className="text-sm">{server.expire}</p>
                <ConnectionInfo/> */}
              </CardContent>

              {/* Footer */}
              <CardFooter className="flex flex-wrap justify-end gap-2">
                <Button
                  variant="secondary"
                  className="hover:bg-green-50 hover:text-green-600 cursor-pointer"
                >
                  Restart
                </Button>
                <Button
                  variant="outline"
                  className="hover:bg-orange-50 hover:text-orange-600 cursor-pointer"
                >
                  Stop
                </Button>
                <Button
                  variant="destructive"
                  className="cursor-pointer"
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
