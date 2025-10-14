"use client";

import { Footer } from "@/app/_component/Footer";
import { UNKNOWN } from "@/iconFolders/unknown";
import { useUser } from "@/providers/authProvider";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type el = {
  _id: string;
  userId: { _id: string; userName: string };
  images: [string];
};

const Page = () => {
  const [follow, setFollow] = useState<string[]>();
  const [person, setPerson] = useState<el[]>();
  const { user, token } = useUser();
  const params = useParams();
  const userId = params.userId as string;

  const strangeUsersPost = async () => {
    const response = await fetch(`http://localhost:8080/user-posts/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const oneperson = await response.json();
      setPerson(oneperson);
    }
  };

  const UserFolower = async (followedUserId: string) => {
    const response = await fetch(
      `http://localhost:8080/toggle-follow/${followedUserId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      const follow = await response.json();
      setFollow(follow);
      toast.success("yeayy");
    } else {
      toast.error("GG");
    }
  };
  useEffect(() => {
    if (userId) {
      strangeUsersPost();
    }
  }, [userId]);

  return (
    <div>
      <div>{user?.userName}</div>
      <hr />
      <div className="flex  items-center">
        <UNKNOWN />
        <div className="flex flex-col items-center ">
          <div>{user?.userName}</div>
          <div>
            {user?.followers.includes(user._id) ? (
              <button
                onClick={() => {
                  UserFolower(user!._id);
                }}
              >
                Unfollow
              </button>
            ) : (
              <button
                onClick={() => {
                  UserFolower(user!._id);
                }}
              >
                follow
              </button>
            )}
          </div>
        </div>
      </div>
      <div>{user?.bio}</div>
      <hr />
      <div className="flex items-center ">
        <div>
          <div>0</div>posts
        </div>
        <div>
          <div>{user?.followers.length}</div>followers
        </div>
        <div>
          <div>{user?.following.length}</div>following
        </div>
      </div>
      <hr />
      <Footer />
    </div>
  );
};
export default Page;
