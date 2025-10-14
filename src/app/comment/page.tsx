"use client";
import { FACE } from "@/iconFolders/face";
import { useRouter } from "next/navigation";
import { Footer } from "../_component/Footer";
import { Back } from "@/iconFolders/Back";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import { log } from "node:console";

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
    console.log(value);
  };
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
        <button className="text-blue-300">Comment</button>
      </div>
      <div className=" fixed bottom-0 ">
        <hr />
        <Footer />
      </div>
    </div>
  );
};
export default CommentFunction;
