"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Menu, X } from "lucide-react"; // ไอคอน hamburger/close

export default function Navbar() {
  const isLogin = true; // 🔑 ต่อกับ backend จริง
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full sticky bg-white/80 backdrop-blur-md shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 hover:opacity-90 transition flex-shrink-0"
        >
          <Image src={"/img/cloud.png"} alt="logo" height={36} width={36} />
          <span className="text-xl font-bold text-blue-600">K-Cloud</span>
        </Link>

        {/* Hamburger button (mobile only) */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {/* Action Buttons */}
          {isLogin && (
            <div className="flex gap-3">
              <Link href={"/panel/manange-server"}>
                <Button variant="outline">จัดการ Server</Button>
              </Link>
              <Link href={"/panel/add-server"}>
                <Button>เพิ่ม Server</Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>เติมเงิน</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>เลือกช่องทางการเติมเงิน</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href={"/panel/bank"}>
                    <DropdownMenuItem>ธนาคาร</DropdownMenuItem>
                  </Link>
                  <Link href={"/panel/wallet"}>
                    <DropdownMenuItem>ทรูมันนี่</DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          {isLogin ? (
            <NavigationMenu>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="px-3 py-2 rounded-md font-medium hover:text-blue-600 transition">
                  โปรไฟล์
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-4 bg-white shadow-lg rounded-md min-w-[220px]">
                  <ul className="flex flex-col gap-3">
                    <li className="text-gray-700">
                      💰 ยอดเงินคงเหลือ:{" "}
                      <span className="font-bold text-green-600">99.99</span>
                    </li>
                    <li>
                      <button className="w-full text-left font-medium text-red-500 hover:text-red-700 cursor-pointer">
                        ออกจากระบบ
                      </button>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenu>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600 transition shadow-sm"
            >
              เข้าสู่ระบบ
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu (slide down) */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md border-t p-4 space-y-4">
          {isLogin && (
            <div className="flex flex-col gap-2">
              <Link href={"/panel/manange-server"}>
                <Button variant="outline" className="w-full">
                  จัดการ Server
                </Button>
              </Link>
              <Link href={"/panel/add-server"}>
                <Button className="w-full">เพิ่ม Server</Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>เติมเงิน</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuLabel>เลือกช่องทางการเติมเงิน</DropdownMenuLabel>
                  <DropdownMenuSeparator />s
                  <Link href={"/panel/bank"}>
                    <DropdownMenuItem>ธนาคาร</DropdownMenuItem>
                  </Link>
                  <Link href={"/panel/wallet"}>
                    <DropdownMenuItem>ทรูมันนี่</DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          {isLogin ? (
            <div className="space-y-2">
              <p className="text-gray-700">
                💰 ยอดเงินคงเหลือ:{" "}
                <span className="font-bold text-green-600">99.99</span>
              </p>
              <button className="w-full text-left font-medium text-red-500 hover:text-red-700">
                ออกจากระบบ
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="block px-2 py-2 text-blue-600 font-semibold hover:text-blue-800"
            >
              เข้าสู่ระบบ
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
