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
type commentType = {
  _id: string;
  comment: string;
  post: {
    caption: string;
  };
  user: {
    userName: string;
  };
};

const CommentFunction = () => {
  const { push } = useRouter();
  const [comments, setComments] = useState<comType>({ comments: "" });
  const [com, setCom] = useState<commentType[]>([]);

  const handleComment = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "comments") {
      setComments({ ...comments, comments: value });
    }
  };
  const { token, user } = useUser();
  const params = useParams();
  const postId = params.postId;
  const createComment = async () => {
    const response = await fetch("http://localhost:8080/comment/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const createdComment = await response.json();
      setComments(createdComment);
    }
  };
  const bringComment = async () => {
    const response = await fetch(
      `http://localhost:8080/comment/get/${postId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      const comment = await response.json();
      setCom(comment);
    }
  };
  console.log(com);

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
      <div>
        {com?.map((com) => {
          return (
            <div key={com._id}>
              <div className="flex">
                <div className="font-bold "> {user?.userName}</div>
                <div>{com.post.caption}</div>
              </div>
              <div className="flex">
                <div className="font-bold "> {com.user.userName}</div>
                <div>{com.comment}</div>
              </div>
            </div>
          );
        })}
      </div>
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
        <button
          className="text-blue-300"
          onChange={() => {
            createComment();
          }}
        >
          Comment
        </button>
      </div>
      <div className=" fixed bottom-0 ">
        <hr />
        <Footer />
      </div>
    </div>
  );
};
export default CommentFunction;
