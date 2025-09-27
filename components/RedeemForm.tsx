"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { toast } from "react-toastify";

export default function RedeemForm() {
  const [link, setLink] = useState("");

  const handleSubmit = async () => {
    if (!link) {
      toast.error("กรุณากรอกลิงก์ก่อน");
      return;
    }

    try {
      const res = await fetch("/api/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ giftLink: link }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "เติมเงินสำเร็จ!");
      } else {
        toast.error(data.message || "เกิดข้อผิดพลาด");
      }
    } catch (err) {
      toast.error("ไม่สามารถเชื่อมต่อ API ได้");
    }
  };

  return (
    <div className="space-y-4">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>คำแนะนำและข้อควรระวัง</AlertTitle>
        <AlertDescription>
          - กรุณาสร้างซองโดยเลือก “ส่งให้คนเดียว” เท่านั้น <br />
          - ระบบจะเติมเงินให้อัตโนมัติหลังจากตรวจสอบสำเร็จ
        </AlertDescription>
      </Alert>

      <div className="space-y-2">
        <label className="text-sm font-medium">ลิงก์ซองของขวัญ</label>
        <Input
          placeholder="https://gift.truemoney.com/campaign/?v=..."
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>

      <Button
        onClick={handleSubmit}
        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
      >
        ยืนยันการทำรายการ
      </Button>
    </div>
  );
}
