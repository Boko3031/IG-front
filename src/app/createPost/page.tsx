"use client";
import { Button } from "@/components/ui/button";
import { ICON } from "../../iconFolders/icon1";
import { BUTTON } from "@/iconFolders/exitButton";
import { useRouter } from "next/navigation";
const CreatePost = () => {
  const { push } = useRouter();
  const GenerateAI = () => {
    push("/generate");
  };
  const back = () => {
    push("/");
  };
  return (
    <div>
      <BUTTON />
      <div className="flex justify-center">New photo post</div>
      <hr />
      <div className="flex flex-col justify-center ">
        <ICON />
        <div className=" flex flex-col w-[150px]">
          <Button className="bg-blue-500">Photo library</Button>
          <Button variant="ghost" onClick={GenerateAI}>
            Generate with AI{" "}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default CreatePost;
