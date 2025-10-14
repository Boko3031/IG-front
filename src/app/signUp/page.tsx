"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/providers/authProvider";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
type inpType = {
  password: string;
  email: string;
  Username: string;
};
export default function Home() {
  const [inputValues, setInputValues] = useState<inpType>({
    email: "",
    password: "",
    Username: "",
  });
  const { signUp, user } = useUser();
  const { push } = useRouter();
  const addSignUp = async () => {
    await signUp(inputValues.email, inputValues.password, inputValues.Username);
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "email") {
      setInputValues({ ...inputValues, email: value });
    }
    if (name === "password") {
      setInputValues({ ...inputValues, password: value });
    }

    if (name === "Username") {
      setInputValues({ ...inputValues, Username: value });
    }
  };
  console.log(inputValues);
  useEffect(() => {
    if (user) push("/");
  }, []);
  return (
    <div className="flex justify-center ">
      <div className="flex flex-col justify-between  gap-4  ">
        <div
          style={{ backgroundImage: `url('ig.svg')` }}
          className="w-[48px] h-[48px] bg-center shadow-2xl"
        ></div>
        <div className="text-gray-400">
          Sign up to see photos and videos from your friends
        </div>
        <div className="w-[270px]  flex flex-col gap-2  ">
          <Input
            placeholder="email"
            name="email"
            value={inputValues?.email}
            onChange={(e) => {
              handleInput(e);
            }}
          />
          <Input
            placeholder="password"
            name="password"
            value={inputValues?.password}
            onChange={(e) => {
              handleInput(e);
            }}
          />

          <Input
            placeholder="Username"
            name="Username"
            value={inputValues?.Username}
            onChange={(e) => {
              handleInput(e);
            }}
          />
          <Button className="w-[270px] bg-blue-500" onClick={addSignUp}>
            Sign up
          </Button>
        </div>
        <div className="flex">
          Have an account?
          <div
            className="text-blue-500"
            onClick={() => {
              push("/login");
            }}
          >
            Log In
          </div>
        </div>
      </div>
    </div>
  );
}
