"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BUTTON } from "@/iconFolders/exitButton";
import { useUser } from "@/providers/authProvider";
import { upload } from "@vercel/blob/client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

const Generate = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const HF_TOKEN = process.env.HF_TOKEN;
  const { token, user } = useUser();
  const { push } = useRouter();
  const [caption, setCaption] = useState("");

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };
  const handleCaption = (e: ChangeEvent<HTMLInputElement>) => {
    setCaption(e.target.value);
  };

  const generateImage = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);

    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HF_TOKEN}`,
      };
      const response = await fetch(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            inputs: prompt,
            parameters: {
              negative_prompt: "blurry,bad quality ,distorted",
              num_inference_steps: 20,
              quidance_scale: 7.5,
            },
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status:${response.status}`);
      }
      const blob = await response.blob();

      const file = new File([blob], "generated.png", { type: "image/png" });
      const uploaded = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
      });
      console.log(uploaded);

      setImageUrl((prev) => {
        return [...prev, uploaded.url];
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  const CreatingPost = async () => {
    const response = await fetch("http://localhost:8080/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        userId: user?._id,
        caption: caption,
        images: imageUrl,
      }),
    });

    if (response.ok) {
      await response.json();
      toast.success("new post success", { richColors: true });
      push("/");
    } else {
      toast.error("failed", { richColors: true });
    }
  };

  return (
    <div>
      <div className="flex justify-items-between">
        <BUTTON />
        <div>New photo post</div>
      </div>
      <hr />
      <div>
        <div className="text-3xl font-bold text-center subpixel-antialiased ">
          Explore AI generated
        </div>
        <div className="text-lg text-muted-foreground">
          images Describe what is on your mind. For best results, be specific
        </div>
      </div>
      <div>
        <Input
          placeholder="Example: Im walking in fog like Bladerunner 2049"
          className="w-[400px] h-[100px]"
          value={prompt}
          onChange={(e) => {
            handleInput(e);
          }}
          disabled={isLoading}
        />
        <Button
          onClick={generateImage}
          className="bg-blue-500  w-[200px] transition-all duration-200 font-semibold rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-300 transform hover:scale-105"
        >
          Generate
        </Button>
      </div>
      {imageUrl && (
        <div>
          <div className="text-xl font-semibold text-gray-800">
            Your generated Image
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            {imageUrl.map((url) => (
              <img
                key={url}
                className="w-full h-auto rounded-lg shadow-md "
                src={url}
              />
            ))}
          </div>
        </div>
      )}
      <Input
        value={caption}
        placeholder="Caption!!!"
        onChange={(e) => {
          handleCaption(e);
        }}
      ></Input>
      <Button onClick={CreatingPost}>Create Post</Button>
    </div>
  );
};
export default Generate;
