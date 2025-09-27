import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { giftLink } = await req.json();

  if (!giftLink || !giftLink.startsWith("https://gift.truemoney.com")) {
    return NextResponse.json(
      { status: "failed", message: "ลิงก์ไม่ถูกต้อง" },
      { status: 400 }
    );
  }

  return NextResponse.json({
    status: "success",
    message: "เติมเงินสำเร็จ! ระบบจะตรวจสอบและเติมให้อัตโนมัติ",
  });
}
