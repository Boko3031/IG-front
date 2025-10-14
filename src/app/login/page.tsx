"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/providers/authProvider";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type inpType = {
  password: string;
  email: string;
};

export default function Home() {
  const [input, setInputValues] = useState<inpType>({
    email: "",
    password: "",
  });
  const { login, user, token } = useUser();
  const { push } = useRouter();

  const addLogin = async () => {
    await login(input.email, input.password);
  };
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "email") {
      setInputValues({ ...input, email: value });
    }
    if (name === "password") {
      setInputValues({ ...input, password: value });
    }
  };

  useEffect(() => {
    if (token) push("/");
  }, []);
  return (
    <div className=" flex justify-center ">
      <div className="flex flex-col gap-4 justify-between ">
        <div
          style={{ backgroundImage: `url('ig.svg')` }}
          className="w-[48px] h-[48px] bg-center shadow-2xl  "
        ></div>
        <div className="w-[270px] flex flex-col gap-2  ">
          <Input
            placeholder="email"
            name="email"
            value={input?.email}
            onChange={(e) => {
              handleInput(e);
            }}
          />
          <Input
            placeholder="password"
            name="password"
            value={input?.password}
            onChange={(e) => {
              handleInput(e);
            }}
          />
        </div>
        <div className="w-[270px]">
          <Button className="w-[270px] bg-blue-500" onClick={addLogin}>
            Log In
          </Button>
        </div>
        <div className="flex">
          Don not have an account?
          <div
            className="text-blue-500"
            onClick={() => {
              push("/signUp");
            }}
          >
            Sign Up
          </div>
        </div>
      </div>
    </div>
  );
}
