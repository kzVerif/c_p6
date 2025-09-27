import AddServerForm from "@/components/AddServerForm";
import React from "react";

export default function AddServerPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen container space-y-6 py-10">
      {/* Title */}
      <h1 className="text-4xl font-semibold text-center">สร้าง Server</h1>
      <hr className="border-gray-300 w-full max-w-lg" />

      {/* Form Wrapper */}
      <div className="w-full max-w-lg px-6">
        <AddServerForm />
      </div>
    </div>
  );
}
