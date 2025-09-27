"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ✅ สร้าง Schema
const formSchema = z.object({
  serverName: z
    .string()
    .min(2, { message: "ชื่อ Server ต้องมีอย่างน้อย 2 ตัวอักษร" })
    .max(30, { message: "ชื่อ Server ต้องไม่เกิน 30 ตัวอักษร" }),
  serverDesc: z
    .string()
    .min(2, { message: "คำอธิบาย Server ต้องมีอย่างน้อย 2 ตัวอักษร" })
    .max(200, { message: "คำอธิบาย Server ต้องไม่เกิน 200 ตัวอักษร" }),
  githubUrl: z.string().url({ message: "กรุณากรอก GitHub URL ที่ถูกต้อง" }),
  package: z.string().min(1, { message: "กรุณาเลือก Package" }),
});

export default function AddServerForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serverName: "",
      serverDesc: "",
      githubUrl: "",
      package: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form Submitted:", values);
  }

  return (
    <Card className="max-w-md w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">สร้าง Server ใหม่</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Server Name */}
            <FormField
              control={form.control}
              name="serverName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Server Name</FormLabel>
                  <FormControl>
                    <Input placeholder="K-Cloud Server" {...field} />
                  </FormControl>
                  <FormDescription>
                    ความยาวไม่เกิน 30 ตัวอักษร
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Server Description */}
            <FormField
              control={form.control}
              name="serverDesc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Server Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="This is K-Cloud Server"
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    ความยาวไม่เกิน 200 ตัวอักษร
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* GitHub URL */}
            <FormField
              control={form.control}
              name="githubUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub Repository URL</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://github.com/username/repo"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Package Select */}
            <FormField
              control={form.control}
              name="package"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-semibold">Package Server</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="เลือก Package" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="basic">
                        <span className="font-medium">Basic</span> – 1 CPU / 1GB RAM · 50 บาท/เดือน
                      </SelectItem>
                      <SelectItem value="standard">
                        <span className="font-medium">Standard</span> – 2 CPU / 4GB RAM · 80 บาท/เดือน
                      </SelectItem>
                      <SelectItem value="pro">
                        <span className="font-medium">Pro</span> – 4 CPU / 8GB RAM · 500 บาท/เดือน
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription className="text-gray-500">
                    เลือก Package ที่เหมาะสมกับการใช้งาน
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button type="submit" className="w-full">
              บันทึกข้อมูล
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
