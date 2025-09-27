import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import RedeemForm from "@/components/RedeemForm";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>เติมเงินผ่านซองอั่งเปา</CardTitle>
          <CardDescription>
            กรุณากรอกลิงก์ซองที่คุณสร้างไว้เพื่อตรวจสอบและเติมเงิน
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RedeemForm/>
        </CardContent>
      </Card>
    </div>
  );
}
