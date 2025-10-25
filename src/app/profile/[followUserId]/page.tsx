"use client";

import { Footer } from "@/app/_component/Footer";
import { useUser } from "@/providers/authProvider";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// type el = {
//   _id: string;
//   userId: { _id: string; userName: string };
//   images: [string];
// };

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
  const [person, setPerson] = useState<user[]>([]);
  const [follow, setFollow] = useState([]);
  const { user, token } = useUser();
  const params = useParams();
  const userId = params.followUserId as string;

  // const strangeUsersPost = async () => {
  //   const response = await fetch(`http://localhost:8080/user-posts/${userId}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   if (response.ok) {
  //     const oneperson = await response.json();
  //     setPerson(oneperson);
  //   }
  // };

  const fetchUserData = async () => {
    const response = await fetch(`http://localhost:8080/user-posts/${userId}`, {
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
      `http://localhost:8080/get-user-posts/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      const posts = await response.json();
      setPosts(posts);
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
  console.log(person);
  console.log(follow);

  return (
    <div>
      <div>
        {person.map((person) => {
          return (
            <div key={person._id}>
              <div>{person.userName}</div>
              {person.email}
            </div>
          );
        })}
      </div>
      {/* <div>{user?.userName}</div>
      <hr />
      <div className="flex  items-center">
        <UNKNOWN />
        <div className="flex flex-col items-center ">
          <div>{user?.userName}</div>
          <div>
            {user?.followers.includes(user._id) ? (
              <Button
                onClick={() => {
                  UserFolower(user?._id);
                }}
              >
                Unfollow
              </Button>
            ) : (
              <Button
                onClick={() => {
                  UserFolower(user!._id);
                }}
              >
                follow
              </Button>
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
      <hr /> */}
      <Footer />
    </div>
  );
};
export default Page;
