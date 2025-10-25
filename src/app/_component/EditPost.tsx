import { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { el } from "../page";

type EditDialogType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedPost: el | null;
};

export const EditPost = ({
  isOpen,
  setIsOpen,
  selectedPost,
}: EditDialogType) => {
  const [caption, setCaption] = useState(selectedPost?.caption);
  return (
    <div>
      <div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <input
                value={caption}
                onChange={(e) => {
                  setCaption(e.target.value);
                }}
              />
              <DialogDescription>{selectedPost?.like.length}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                cancel
              </Button>
              <Button onClick={()=>{}}>edit</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
