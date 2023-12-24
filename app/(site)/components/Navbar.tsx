"use client"
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModalStore";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { onOpen } = useModal()
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 flex items-center justify-center w-full gap-x-5 max-h-[90px]">
      <div className="flex w-[70%] items-center justify-between">
      <img src="/images/bhaLogo.png" className="w-[90px]" alt="" />
      <ul className="flex items-center gap-x-5">
          <Link  href="#home" className="px-5 py-3 font-semibold">Home</Link>
          <Link  href="#about-us" className="px-5 py-3 font-semibold">About us</Link>
          <Link  href="#guidelines" className="px-5 py-3 font-semibold">Guidelines</Link>
          <Link href="#contact-us" className="px-5 py-3 font-semibold">Contact Us</Link>
      </ul>
      <Button variant={'default'} onClick={() => onOpen('mediwiseLogin')} className="rounded-xl">Login</Button>
      </div>
    </nav>
  );
};

export default Navbar;
