"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BUTTON } from "@/iconFolders/exitButton";
import { ChangeEvent, useState } from "react";

const Generate = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const HF_TOKEN = process.env.HF_TOKEN;

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const generateImage = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setImageUrl("");

    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HF_TOKEN}`,
      };
      const response = await fetch(
        `https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0`,
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
      const URLIMG = URL.createObjectURL(blob);
      setImageUrl(URLIMG);
    } catch (err) {
      setIsLoading(false);
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
          images Describe what's on your mind. For best results, be specific
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
          disabled={!prompt.trim() || isLoading}
          className={`bg-blue-500  w-[200px] transition-all duration-200 font-semibold rounded-lg ${
            !prompt.trim() || isLoading
              ? "bg-gray-700 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-300 transform hover:scale-105"
          }`}
        >
          {isLoading ? (
            <div className="flex justify-items-center">
              <div className="animate-spin border-white rounded-full h-5 w-5  mr-3"></div>
              Generating ...
            </div>
          ) : (
            "Generate image"
          )}
        </Button>
      </div>
      {/* {isLoading && (
        <div className="text-center bg-purple-50 rounded-lg">
          <div className="text-purple-400">unshij bnnn</div>
          <div className="text-sm text-purple-500">
            this may take 10-30 second
          </div>
        </div>
      )} */}
      {imageUrl && (
        <div>
          <div className="text-xl font-semibold text-gray-800">
            Your generated Image
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <img
              className="w-full h-auto rounded-lg shadow-md "
              src={imageUrl}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default Generate;
