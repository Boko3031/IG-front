"use client";
import { useUser } from "@/providers/authProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type inpType = {
  userName: String;
  password: String;
  email: String;
};
export default function Home() {
  const { user } = useUser();
  const { push } = useRouter();
  const [input, inputValues] = useState<inpType>();
  useEffect(() => {
    if (!user) push("/login");
  }, []);
  return (
    <div className="">
      <div className="">{user?.userName}</div>
    </div>
  );
}
