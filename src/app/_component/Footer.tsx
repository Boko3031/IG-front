import { HOME } from "@/iconFolders/home";
import { PLUS } from "@/iconFolders/plus";
import { USER } from "@/iconFolders/user";
import { useRouter } from "next/navigation";

export const Footer = () => {
  const { push } = useRouter();
  return (
    <div className=" fixed bottom-0 bg-white">
      <div className="flex justify-evenly w-screen px-4 py-2">
        <div
          onClick={() => {
            push("/");
          }}
        >
          <HOME />
        </div>
        <div
          onClick={() => {
            push("/createPost");
          }}
        >
          <PLUS />
        </div>
        <div
          onClick={() => {
            push("/profile");
          }}
        >
          <USER />
        </div>
      </div>
    </div>
  );
};
