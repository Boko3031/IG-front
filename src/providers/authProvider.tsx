"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
  useContext,
  SetStateAction,
  Dispatch,
} from "react";
type user = {
  userName: string;
  password: string;
  email: string;
};
type ContextType = {
  user: user | null;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userName: string) => Promise<void>;
  setUser: Dispatch<SetStateAction<user | null>>;
};
export const autoContext = createContext<ContextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<user | null>(null);

  const { push } = useRouter();

  useEffect(() => {
    const userItem = localStorage.getItem("user");
    if (userItem) {
      setUser(JSON.parse(userItem));
    }
  }, []);
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
      const user = await response.json();
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
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
      const userSignUp = await response.json();
      setUser(userSignUp);
      localStorage.setItem("user", JSON.stringify(userSignUp));
      console.log("signUp working");
      push("/");
      toast.success("shine hereglegch nevterlee", { richColors: true });
    } else {
      toast.error("adilhan hereglegch bn ooroor nevterne uu!!!", {
        richColors: true,
      });
    }
  };

  const values = {
    login: login,
    signUp: signUp,
    user: user,
    setUser: setUser,
  };
  return <autoContext.Provider value={values}>{children}</autoContext.Provider>;
};
export const useUser = () => {
  const authcontext = useContext(autoContext);
  if (!authcontext) throw new Error(" no auth provider");
  return authcontext;
};
