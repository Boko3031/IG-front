"use client";
import { useUser } from "@/providers/authProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { user } = useUser();
  const { push } = useRouter();

  useEffect(() => {
    if (!user) push("/login");
  }, []);
  return (
    <div className="">
      <div className="">{user?.userName}</div>
    </div>
  );
}
