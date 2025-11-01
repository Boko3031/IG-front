import { HOME } from "@/iconFolders/home";
import { PLUS } from "@/iconFolders/plus";
import { useRouter } from "next/navigation";
import { SEARCH } from "@/iconFolders/search";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/providers/authProvider";

export const Footer = () => {
  const { push } = useRouter();
  const { user } = useUser();
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
            push("/search");
          }}
        >
          <SEARCH />
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
          <Avatar>
            <AvatarImage src={user?.profilePic} />
            <AvatarFallback>
              {user?.userName.charAt(0).toUpperCase()}
              {user?.userName.charAt(1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};
