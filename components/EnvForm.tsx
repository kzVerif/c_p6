"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { CreateEnv } from "@/utils/Coolify";
import { toast } from "react-toastify";

const formSchema = z.object({
  key: z.string().min(2, { message: "กรุณากำหนดคีย์อย่างน้อย 2 ตัวอักษร" }),
  value: z.string().optional(),
});

export default function EnvForm({ uuid }: { uuid: string }) {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      key: "",
      value: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      const res = await CreateEnv(uuid, {
        key: values.key,
        value: values.value ?? "", // ✅ ถ้า undefined → ""
      }); // ✅ ไม่ต้อง check res.ok อีก

      toast.success("เพิ่มตัวแปรสำเร็จ")
      form.reset();
    } catch (err) {
      console.error(err);
      toast.error("เกิดข้อผิดพลาดในการสร้างตัวแปร")
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition rounded-2xl bg-white">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-gray-800">
            เพิ่มตัวแปรใหม่
          </CardTitle>
          <PlusCircle className="text-gray-400" size={22} />
        </div>
        <p className="text-sm text-gray-500 mt-1">
          สร้างหรือเพิ่ม Environment Variable ใหม่
        </p>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 pt-3"
          >
            <FormField
              control={form.control}
              name="key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-gray-700">
                    ชื่อตัวแปร (Key)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="เช่น DATABASE_URL"
                      {...field}
                      className="focus-visible:ring-2 focus-visible:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-gray-700">
                    ค่า (Value)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="เช่น mysql://root:1234@localhost:3306/mydb"
                      {...field}
                      className="focus-visible:ring-2 focus-visible:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg py-2.5 transition"
            >
              {loading ? "กำลังบันทึก..." : "บันทึกตัวแปร"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
