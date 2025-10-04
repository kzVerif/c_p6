"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "react-toastify";
import {
  StartServer,
  StopServer,
  RestartServer,
  DeleteServer,
  GetLogServer,
} from "@/utils/Coolify";

import {
  Play,
  Square,
  RefreshCw,
  XCircle,
  FileText,
  Settings,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import Link from "next/link";

interface Server {
  uuid: string;
}

export default function ServerButton({ uuid }: Server) {
  const [loading, setLoading] = useState(false);
  const [logOpen, setLogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [logs, setLogs] = useState<string>("");

  async function handleAction(action: string) {
    setLoading(true);

    try {
      let actionFn;

      switch (action) {
        case "start":
          actionFn = () => StartServer(uuid);
          break;
        case "stop":
          actionFn = () => StopServer(uuid);
          break;
        case "restart":
          actionFn = () => RestartServer(uuid);
          break;
        case "delete":
          actionFn = () => DeleteServer(uuid);
          break;
        case "logs":
          actionFn = async () => {
            const result = await GetLogServer(uuid);
            setLogs(
              typeof result === "string"
                ? result
                : JSON.stringify(result, null, 2)
            );
            setLogOpen(true);
          };
          break;
        default:
          return;
      }

      await toast.promise(actionFn(), {
        pending: `กำลังทำการ ${action} ...`,
        success: `${action} สำเร็จ!`,
        error: `${action} ไม่สำเร็จ`,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-wrap gap-2 w-full">
      <Button onClick={() => handleAction("start")}>
        <Play className="w-4 h-4 mr-2" /> Start
      </Button>
      <Button variant="destructive" onClick={() => handleAction("stop")}>
        <Square className="w-4 h-4 mr-2" /> Stop
      </Button>
      <Button variant="secondary" onClick={() => handleAction("restart")}>
        <RefreshCw className="w-4 h-4 mr-2" /> Restart
      </Button>

      {/* Delete button → เปิด Confirm Modal */}
      <Button variant="outline" onClick={() => setDeleteOpen(true)}>
        <XCircle className="w-4 h-4 mr-2" /> Delete
      </Button>

      <Button variant="ghost" onClick={() => handleAction("logs")}>
        <FileText className="w-4 h-4 mr-2" /> View Logs
      </Button>
      <Link href={`/panel/manage-server/${uuid}`}>
        <Button variant="ghost">
          <Settings className="w-4 h-4 mr-2" /> .Env
        </Button>
      </Link>

      {/* Modal แสดง Logs */}
      <Dialog open={logOpen} onOpenChange={setLogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Application Logs</DialogTitle>
            <DialogDescription>Logs ของ Server UUID: {uuid}</DialogDescription>
          </DialogHeader>
          <pre className="bg-black text-green-400 text-sm p-3 rounded-lg max-h-[500px] overflow-y-auto whitespace-pre-wrap">
            {logs || "ไม่มี log"}
          </pre>
        </DialogContent>
      </Dialog>

      {/* Confirm Delete Modal */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>ยืนยันการลบ</DialogTitle>
            <DialogDescription>
              คุณแน่ใจหรือไม่ว่าต้องการลบ Server นี้?
              การกระทำนี้ไม่สามารถย้อนกลับได้
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button variant="secondary" onClick={() => setDeleteOpen(false)}>
              ยกเลิก
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                setDeleteOpen(false);
                await handleAction("delete");
              }}
            >
              ลบ Server
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
