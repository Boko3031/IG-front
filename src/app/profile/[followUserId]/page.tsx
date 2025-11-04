"use client";

import { Footer } from "@/app/_component/Footer";
import { Button } from "@/components/ui/button";
import { BUTTON } from "@/iconFolders/exitButton";
import { UNKNOWN } from "@/iconFolders/unknown";
import { useUser } from "@/providers/authProvider";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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
type el2 = {
  _id: string;
  userId: { _id: string; userName: string };
  caption: string;
  like: string;
  images: string;
  comment: string;
};

const Page = () => {
  const [posts, setPosts] = useState<el2[] | []>([]);
  const [person, setPerson] = useState<user | null>(null);
  const [follow, setFollow] = useState([]);
  const { user, token } = useUser();
  const { push } = useRouter();
  const params = useParams();
  const userId = params.followUserId as string;

  const fetchUserData = async () => {
    const response = await fetch(`https://ig-back-end.onrender.com/user-posts/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const posts = await response.json();
      setPerson(posts);
    } else {
      toast.error("gg");
    }
  };

  const fetchUserPosts = async () => {
    const response = await fetch(
      `https://ig-back-end.onrender.com/get-user-posts/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      const post = await response.json();
      setPosts(post);
      fetchUserData();
    } else {
      toast.error("gg");
    }
  };
  useEffect(() => {
    if (token) {
      fetchUserData();
      fetchUserPosts();
    }
  }, [token]);

  const UserFolower = async () => {
    const response = await fetch(
      `https://ig-back-end.onrender.com/toggle-follow/${userId}`,
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

  return (
    <div>
      <div>
        {
          <div key={person?._id}>
            <div className="flex m-3">
              <div
                className="flex"
                onClick={() => {
                  push("/");
                }}
              >
                <BUTTON />
              </div>
              <div className="ml-30 ">{person?.userName}</div>
            </div>
            <hr />
            <div className="flex gap-2">
              <div className="flex  items-center">
                <UNKNOWN />
              </div>
              <div className="flex flex-col items-center ">
                <div>{person?.userName}</div>
                {person?.followers.includes(user!._id) ? (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      UserFolower();
                    }}
                  >
                    Unfollow
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      UserFolower();
                    }}
                  >
                    follow
                  </Button>
                )}
              </div>
            </div>
          </div>
        }
      </div>
      <hr />
      <div>{person?.bio}</div>
      <hr />
      <div className="flex justify-evenly">
        <div>
          <div>{posts.length}</div>posts
        </div>
        <div>
          <div>{person?.followers.length}</div>followers
        </div>
        <div>
          <div>{person?.following.length}</div>following
        </div>
      </div>
      <hr />
      <div>
        <div>
          {
            <div>
              {posts.length === 0 ? (
                <div className="flex flex-col items-center  ">
                  <div>This person has no posts.</div>
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
          }
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Page;
