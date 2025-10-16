"use client";
import { FACE } from "@/iconFolders/face";
import { useParams, useRouter } from "next/navigation";
import { Footer } from "@/app/_component/Footer";
import { Back } from "@/iconFolders/Back";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useEffect, useState } from "react";
import { useUser } from "@/providers/authProvider";

type comType = {
  comments: string;
};

const CommentFunction = () => {
  const { push } = useRouter();
  const [comments, setComments] = useState<comType>({ comments: "" });

  const handleComment = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "comments") {
      setComments({ ...comments, comments: value });
    }
  };
  const { token, user } = useUser();
  const params = useParams();
  const postId = params.postId;
  const bringComment = async () => {
    const response = await fetch(
      `http://localhost:8080/comment/get/${postId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      await response.json();
    }
  };
  useEffect(() => {
    if (!token) {
    } else {
      bringComment();
    }
  }, []);

  return (
    <div>
      <div
        onClick={() => {
          push("/");
        }}
      >
        <Back />
      </div>
      <div>Comment</div>
      <hr />
      <div className="fixed bottom-1 mb-10 flex items-center justify-evenly w-full">
        <div className="flex ">
          <FACE />
          <Input
            placeholder="Add comment ..."
            name="comments"
            onChange={(e) => {
              handleComment(e);
            }}
          />
        </div>
        <button className="text-blue-300" onChange={()=>{}}>Comment</button>
      </div>
      <div className=" fixed bottom-0 ">
        <hr />
        <Footer />
      </div>
    </div>
  );
};
export default CommentFunction;
