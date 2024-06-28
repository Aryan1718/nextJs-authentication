"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <main className="flex items-center justify-center">
        <div className="mt-20 text-6xl">
          <h1 className="">Welcome To The Application</h1>
        </div>
      </main>
      <div className="flex items-center justify-center mt-20">
        <Link href='/login' className="text-3xl text-bold text-black-500 hover:text-green-400">
          Click Here to Visit Login Page
        </Link>
      </div>
      <div className="flex items-center justify-center mt-5">
      <Link href='/signup' className="text-3xl text-bold text-black-500 hover:text-blue-400">
          Click Here to Visit Signup Page
        </Link>
      </div>
    </>
  );
}
