"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { jwtDecode } from "jwt-decode";

import {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
  useContext,
  SetStateAction,
  Dispatch,
} from "react";
export type user = {
  _id: string;
  userName: string;
  password: string;
  email: string;
  followers: string[];
  following: string[];
  bio: string;
  profilePic: string;
};
type ContextType = {
  user: user | null;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userName: string) => Promise<void>;
  setUser: Dispatch<SetStateAction<user | null>>;
  token: string | null;
};
type decodedType = {
  data: user;
};
export const autoContext = createContext<ContextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<user | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const { push } = useRouter();

  const login = async (email: string, password: string) => {
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (response.ok) {
      const token = await response.json();
      localStorage.setItem("token", token);
      setToken(token);
      const decodedToken: decodedType = jwtDecode(token);
      setUser(decodedToken.data);
      // setUser(user);
      console.log("login working");
      push("/");
      toast.success("amjilttai nevterlee", { richColors: true });
    } else {
      toast.error("uuchlaarai aldaa garlaa sorry", { richColors: true });
    }
  };

  const signUp = async (email: string, password: string, userName: string) => {
    const response = await fetch("http://localhost:8080/signUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        userName: userName,
      }),
    });
    if (response.ok) {
      const token = await response.json();
      localStorage.setItem("token", token);
      const decodedToken: decodedType = jwtDecode(token);
      setUser(decodedToken.data);
      setToken(token);
      console.log("signUp working");
      push("/");
      toast.success("shine hereglegch nevterlee", { richColors: true });
    } else {
      toast.error("adilhan hereglegch bn ooroor nevterne uu!!!", {
        richColors: true,
      });
    }
  };

  useEffect(() => {
    // const userItem = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (token && typeof window !== "undefined") {
      const decodedToken: decodedType = jwtDecode(token);
      setUser(decodedToken.data);
      setToken(token);
    }
  }, []);

  const values = {
    login: login,
    signUp: signUp,
    user: user,
    setUser: setUser,
    token: token,
  };
  return <autoContext.Provider value={values}>{children}</autoContext.Provider>;
};
export const useUser = () => {
  const authcontext = useContext(autoContext);
  if (!authcontext) throw new Error(" no auth provider");
  return authcontext;
};
