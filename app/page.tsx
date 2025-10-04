import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="h-screen flex items-center">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6">
        {/* Content */}
        <div className="space-y-8 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            ดีพลอยแอปของคุณจาก{" "}
            <span className="text-blue-400">GitHub</span>
            <br />
            <span className="text-green-400">
              ง่าย รวดเร็ว และคุ้มค่า ด้วย K-Cloud
            </span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-lg mx-auto md:mx-0">
            K-Cloud ถูกออกแบบมาเพื่อให้นักพัฒนาและผู้ใช้สามารถดีพลอย{" "}
            <span className="text-blue-300 font-semibold">Discord Bot</span>,{" "}
            เว็บแอป หรือโปรเจกต์อื่น ๆ ได้ง่าย ๆ เพียงเชื่อมต่อกับ GitHub —
            ใช้พลังของ <span className="text-purple-400">Coolify</span>.
          </p>
          <div>
            <Link href="/panel/add-server">
              <Button
                size="lg"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-6 text-lg shadow-lg rounded-xl transition-transform transform hover:scale-105"
              >
                🚀 เริ่มต้นใช้งาน
              </Button>
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="hidden md:flex justify-center ">
          <Image
            src="/img/cloud.png"
            alt="Cloud mascot"
            width={420}
            height={420}
            className="drop-shadow-2xl animate-float"
          />
        </div>
      </div>
    </section>
  );
}
