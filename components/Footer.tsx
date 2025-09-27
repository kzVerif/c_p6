import Link from "next/link";
// import { Github, Twitter, Facebook } from "lucide-react";s

export default function Footer() {
  return (
    <footer className=" text-gray-900 py-10 mt-16 border-t border-gray-700">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold">K-Cloud</h2>
          <p className="mt-3  text-sm">
            แพลตฟอร์ม Deploy แอป, Discord Bot, และเว็บแอป ได้ง่าย รวดเร็ว และคุ้มค่า
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">เมนูลัด</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className=" transition">
                หน้าแรก
              </Link>
            </li>
            <li>
              <Link href="/panel" className=" transition">
                เริ่มต้นกับเรา
              </Link>
            </li>
            <li>
              <Link href="/docs" className=" transition">
                เอกสารการใช้งาน
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">ติดตามเรา</h3>
          <div className="flex gap-4">
            <Link
              href="https://github.com"
              className=" transition"
            >
              {/* <Github size={20} /> */}
            </Link>
            <Link
              href="https://twitter.com"
              className=" transition"
            >
              {/* <Twitter size={20} /> */}
            </Link>
            <Link
              href="https://facebook.com"
              className=" transition"
            >
              {/* <Facebook size={20} /> */}
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} K-Cloud. All rights reserved.
      </div>
    </footer>
  );
}