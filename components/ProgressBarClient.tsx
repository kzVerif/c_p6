"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "@/styles/nprogress.css"; // ไฟล์ CSS ของ nprogress

export default function ProgressBarClient() {
  const pathname = usePathname();

  useEffect(() => {
    // เริ่ม ProgressBar ตอน pathname เปลี่ยน
    NProgress.start();
    NProgress.done();
  }, [pathname]);

  return null; // ไม่ต้อง render UI อะไร
}
