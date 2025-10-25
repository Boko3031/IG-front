"use client";
import { useUser } from "@/providers/authProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { COMMENT } from "@/iconFolders/comment";
import { Footer } from "./_component/Footer";
import { Header } from "./_component/Header";
import { Heart } from "lucide-react";
import Link from "next/link";
import { EditPost } from "./_component/EditPost";
import { Story } from "./_component/story";
import { Button } from "@/components/ui/button";

export type el = {
  _id: string;
  userId: { _id: string; userName: string };
  caption: string;
  like: string;
  images: string[];
  comment: string;
};

export default function Home() {
  const { user, token } = useUser();
  const { push } = useRouter();
  const [post, setPost] = useState<el[]>();
  const [likedPost, setLikedPost] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<el | null>(null);
  const myId = user?._id;

  const AllPost = async () => {
    const response = await fetch("http://localhost:8080/post", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const newPost = await response.json();
      setPost(newPost);
    }
  };

  const PostLike = async (postId: string) => {
    const response = await fetch(
      `http://localhost:8080/toggle-like/${postId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      const likes = await response.json();
      setLikedPost(likes);
      AllPost();
    }
  };
  useEffect(() => {
    if (!token) {
      push("/login");
    } else {
      AllPost();
    }
  }, []);

  return (
    <div>
      <Header />
      <hr />
      <div>
        {post?.map((post) => {
          return (
            <div key={post._id}>
              <Link href={`profile/${post.userId._id}`}>
                <div
                  style={{ backgroundImage: `url('unknown.svg')` }}
                  className="w-[25px] h-[25px] bg-center shadow-2xl font-bold  "
                >
                  <div className="pl-8">{post.userId.userName}</div>
                </div>
              </Link>

              <Button
                onClick={() => {
                  setIsOpen(true);
                  setSelectedPost(post);
                }}
              >
                edit
              </Button>
              {selectedPost && (
                <EditPost
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  selectedPost={selectedPost!}
                />
              )}
              <Story post={post} />
              <div className="flex">
                <div
                  className=" px-2 py-2"
                  onClick={() => {
                    PostLike(post?._id);
                  }}
                >
                  {post.like.includes(myId!) ? (
                    <div>
                      <Heart fill="red" color="red" />
                    </div>
                  ) : (
                    <div>
                      <Heart />
                    </div>
                  )}
                </div>
                <div
                  className=" px-2 py-2"
                  onClick={() => {
                    push(`/comment/${post._id}`);
                  }}
                >
                  <COMMENT />
                </div>
              </div>
              <div className="font-bold">{post.like.length} likes</div>
              <div>{post.caption}</div>
              <div className="text-gray-400">
                {/* View all {post.comment.length} comments */}
              </div>
              <div
                onClick={() => {
                  push(`/comment/${post._id}`);
                }}
                className="text-gray-400"
              >
                Add a comment...
              </div>
              <hr />
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}
