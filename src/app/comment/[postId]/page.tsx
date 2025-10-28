"use client";
import { FACE } from "@/iconFolders/face";
import { useParams, useRouter } from "next/navigation";
import { Footer } from "@/app/_component/Footer";
import { Back } from "@/iconFolders/Back";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useEffect, useState } from "react";
import { useUser } from "@/providers/authProvider";

type commentType = {
  _id: string;
  comments: string;
  post: {
    caption: string;
  };
  user: {
    userName: string;
  };
};

const CommentFunction = () => {
  const { push } = useRouter();
  const [comments, setComments] = useState<string>("");
  const [com, setCom] = useState<commentType[]>([]);
  const [posted, setPosted] = useState<boolean>(false);

  const handleComment = (event: ChangeEvent<HTMLInputElement>) => {
    setComments(event.target.value);
  };
  const { token } = useUser();
  const params = useParams();
  const postId = params.postId;
  const createComment = async () => {
    setPosted(true);
    const response = await fetch("http://localhost:8080/comment/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        postId,
        comments,
      }),
    });
    console.log(response);
    setPosted(false);
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

  useEffect(() => {
    if (token) bringComment();
  }, [posted]);
  console.log(com);
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
                <div className="font-bold "> {com.user.userName}</div>
                <div>{com.comments}</div>
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
          onClick={() => {
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
