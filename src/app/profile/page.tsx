"use client";

import { useUser } from "@/providers/authProvider";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Footer } from "../_component/Footer";
import { UNKNOWN } from "@/iconFolders/unknown";
import { useRouter } from "next/navigation";
import { Camera } from "@/iconFolders/Camera";
import { Button } from "@/components/ui/button";
import { BUTTON } from "@/iconFolders/exitButton";

type PostType = {
  _id: string;
  userId: { _id: string; userName: string };
  images: string[];
};

const Personal = () => {
  const { user, token } = useUser();
  const [posts, setPosts] = useState<PostType[]>([]);
  const { push } = useRouter();

  const getUserPost = async () => {
    const response = await fetch("https://ig-back-end.onrender.com/user-posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const posts = await response.json();
      setPosts(posts);
    } else {
      toast.error("gg");
    }
  };
  useEffect(() => {
    if (token) {
      getUserPost();
    }
  }, [token]);

  return (
    <div>
      <div>
        <div>
          <div className="flex m-3">
            <div
              className="flex"
              onClick={() => {
                push("/");
              }}
            >
              <BUTTON />
            </div>
            <div className="ml-30 ">{user?.userName}</div>
          </div>
          <hr />
          <div className="flex  ">
            <UNKNOWN />
            <div className="flex flex-col">
              <div className="ml-5">{user?.userName}</div>
              <Button variant="ghost">Edit profile</Button>
            </div>
          </div>
          <div>{user?.bio}</div>
          <hr />
          <div className="flex justify-evenly">
            <div>
              <div>{posts.length}</div>posts
            </div>
            <div>
              <div>{user?.followers.length}</div>followers
            </div>
            <div>
              <div>{user?.following.length}</div>following
            </div>
          </div>
          <hr />
          <div>
            {posts.length === 0 ? (
              <div className="flex flex-col items-center  ">
                <Camera />
                <div className="text-2xl font-extrabold">Share Photos</div>
                <div>
                  When you share photos, they will appear on your profile.
                </div>
                <div
                  className="text-blue-500"
                  onClick={() => {
                    push("/createPost");
                  }}
                >
                  Share your first photo
                </div>
              </div>
            ) : (
              <div className="flex w-screen flex-wrap">
                {posts.map((post) => {
                  return (
                    <div key={post._id}>
                      <img
                        className=" m-0.5 h-[180px] w-[139px]"
                        src={post.images[0]}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Personal;
