"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { DeleteEnv, GetEnv } from "@/utils/Coolify";

export interface EnvItem {
  id: number;
  uuid: string;
  resourceable_type: string;
  resourceable_id: number;
  is_literal: boolean;
  is_multiline: boolean;
  is_preview: boolean;
  is_runtime: boolean;
  is_buildtime: boolean;
  is_shared: boolean;
  is_shown_once: boolean;
  key: string;
  value: string;
  real_value: string;
  version: string;
  created_at: string;
  updated_at: string;
}


export default function EnvTable({ uuid }: { uuid: string }) {
  const [envs, setEnvs] = useState<EnvItem[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ โหลด env list จาก API
  useEffect(() => {
    const fetchEnv = async () => {
      try {
        setLoading(true);

        const res = await GetEnv(uuid);
        // ✅ Coolify ส่งกลับในรูปแบบ { result: { KEY: VALUE } }
        setEnvs(res);
      } catch (error) {
        console.error("Error fetching envs:", error);
        toast.warn("โหลดข้อมูลล้มเหลว");
      } finally {
        setLoading(false);
      }
    };

    fetchEnv();
  }, [uuid]);

  // ✅ ฟังก์ชันลบตัวแปร
  const handleDelete = async (key: string, env_uuid: string) => {
    if (!confirm(`ต้องการลบ ${key} ใช่ไหม?`)) return;
    try {
      const res = await DeleteEnv(uuid,env_uuid)     

      if (res.message !== 'Delete Success') throw new Error("ลบไม่สำเร็จ");

      toast.success(`🗑️ ลบ ${key} สำเร็จ`);
      setEnvs((prev) => prev.filter((env) => env.key !== key));
    } catch (err) {
      toast.error("❌ ลบล้มเหลว");
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        รายการ Environment Variables
      </h2>

      <div className="border rounded-xl overflow-hidden bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[30%] font-medium text-gray-700">
                Key
              </TableHead>
              <TableHead className="w-[50%] font-medium text-gray-700">
                Value
              </TableHead>
              <TableHead className="w-[20%] text-center font-medium text-gray-700">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8">
                  <Loader2 className="animate-spin inline mr-2" /> กำลังโหลด...
                </TableCell>
              </TableRow>
            ) : envs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center py-6 text-gray-500"
                >
                  ยังไม่มีตัวแปร Environment
                </TableCell>
              </TableRow>
            ) : (
              envs.map((env) => (
                <TableRow key={env.uuid}>
                  <TableCell className="font-medium text-gray-800">
                    {env.key}
                  </TableCell>
                  <TableCell className="text-gray-700 truncate">
                    {env.value}
                  </TableCell>
                  <TableCell className="text-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => toast.info("🛠️ ฟีเจอร์แก้ไขยังไม่เปิดใช้งาน")}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(env.key,env.uuid)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
