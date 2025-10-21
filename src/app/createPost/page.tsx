"use client";
import { Button } from "@/components/ui/button";
import { ICON } from "../../iconFolders/icon1";
import { BUTTON } from "@/iconFolders/exitButton";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import { upload } from "@vercel/blob/client";
const CreatePost = () => {
  const { push } = useRouter();
  const [file, setFile] = useState<File | null>(null);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) return;
    setFile(selectedFile!);
  };
  console.log(file);

  const uploadedImage = async () => {
    if (!file) return;
    const uploaded = await upload(file.name, file, {
      access: "public",
      handleUploadUrl: "/api/upload",
    });
    console.log(uploaded);
  };
  console.log(file);

  return (
    <div>
      <div
        onClick={() => {
          push("/");
        }}
      >
        <BUTTON />
      </div>
      <div className="flex justify-center">New photo post</div>
      <hr />
      <div className="flex flex-col items-center w-full">
        <ICON />
        <div className=" flex flex-col w-[200px]">
          <div className="flex">
            <Input
              type="file"
              className="bg-blue-500"
              accept="image/*"
              onChange={handleFile}
            />
            <Button onClick={uploadedImage}>Upload</Button>
          </div>
          <Button
            variant="ghost"
            onClick={() => {
              push("/generate");
            }}
          >
            Generate with AI
          </Button>
        </div>
      </div>
    </div>
  );
};
export default CreatePost;
