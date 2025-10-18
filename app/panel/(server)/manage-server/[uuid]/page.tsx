import EnvForm from "@/components/EnvForm";
import EnvTable from "@/components/EnvTable";

export default async function Page({ params }: { params: { uuid: string } }) {
  const {uuid} = await params; // ✅ แก้แล้ว
  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto flex flex-col space-y-8">
        {/* Header */}
        <div className="flex flex-col items-start px-6 py-8 border-b-2">
          <h1 className="text-3xl font-semibold text-gray-800">
            Environment Variable
          </h1>
          <p className="text-gray-500 text-sm">
            จัดการตัวแปรสภาพแวดล้อม (.env) ของคุณได้ที่นี่
          </p>
        </div>

        {/* Main Content */}
        <EnvForm uuid={uuid} />

        {/* Table Content */}
        <EnvTable uuid={uuid} />
      </div>
    </div>
  );
}
