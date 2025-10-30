"use client";
import { Input } from "@/components/ui/input";
import { useUser } from "@/providers/authProvider";
import { useEffect, useState } from "react";
import { Footer } from "../_component/Footer";
type user = {
  _id: string;
  userName: string;
  password: string;
  email: string;
  followers: string[];
  following: string[];
  bio: string;
  profilePic: string;
};

const Page = () => {
  const { token, user } = useUser();
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState<user[]>([]);

  const Search = async () => {
    const response = await fetch(
      `http://localhost:8080/search/${searchValue}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      const user = await response.json();
      setUsers(user);
    }
  };
  useEffect(() => {
    if (token && searchValue) {
      Search();
    }
  }, [searchValue, token]);
  return (
    <div>
      <Input
        placeholder="Search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {users.length > 0
        ? users.map((user) => {
            return <div key={user._id}>{user.userName}</div>;
          })
        : "baihgu baina"}
      <div>
        <Footer />
      </div>
    </div>
  );
};
export default Page;
