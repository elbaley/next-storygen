import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Story } from "../StoryEditor.types";
import { cn } from "@/lib/utils";
import { LucidePlus, LucideTrash } from "lucide-react";
import { useEffect, useRef } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

type StoryNavigationProps = {
  stories: Story[];
  setActiveStoryIndex: (index: number) => void;
  handleAddStory: () => void;
  handleDeleteStory: (id: string) => void;
  activeStoryIndex: number;
};

export const StoryNavigation = ({
  stories,
  handleAddStory,
  handleDeleteStory,
  setActiveStoryIndex,
  activeStoryIndex,
}: StoryNavigationProps) => {
  const newStoryButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (newStoryButtonRef.current) {
      newStoryButtonRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [newStoryButtonRef, activeStoryIndex]);

  return (
    <div className="mx-auto max-w-[320px] flex gap-2 items-center">
      <ScrollArea type="scroll" className="flex-1 ">
        <div className="flex gap-2  pl-5 py-3 -translate-x-5">
          {stories.map((story, index) => (
            <ContextMenu key={story.id}>
              <ContextMenuTrigger className="">
                <button
                  ref={index === activeStoryIndex ? newStoryButtonRef : null}
                  onClick={() => setActiveStoryIndex(index)}
                  className={cn(
                    "group flex h-10 w-10 select-none items-center justify-center rounded-lg border border-zinc-100 bg-white leading-8 text-zinc-950 shadow-[0_-1px_0_0px_#d4d4d8_inset,0_0_0_1px_#f4f4f5_inset,0_0.5px_0_1.5px_#fff_inset] hover:bg-zinc-50 hover:via-zinc-900 hover:to-zinc-800 active:shadow-[-1px_0px_1px_0px_#e4e4e7_inset,1px_0px_1px_0px_#e4e4e7_inset,0px_0.125rem_1px_0px_#d4d4d8_inset]",
                    activeStoryIndex === index
                      ? "bg-zinc-100 via-zinc-900 to-zinc-800 hover:bg-zinc-100"
                      : "",
                  )}
                >
                  <span
                    className={cn(
                      "select-none flex items-center group-active:[transform:translate3d(0,1px,0)]",
                      activeStoryIndex === index
                        ? "[transform:translate3d(0,1px,0)] font-semibold "
                        : "",
                    )}
                  >
                    {index + 1}
                  </span>
                </button>
              </ContextMenuTrigger>
              <ContextMenuContent className="select-none">
                <ContextMenuItem
                  onClick={() => {
                    handleDeleteStory(story.id);
                  }}
                  className="flex gap-2 items-center"
                >
                  <LucideTrash size={16} strokeWidth={2} />
                  Delete Story
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <button
        onClick={handleAddStory}
        className={cn(
          "group flex h-10 w-10 select-none items-center justify-center rounded-lg border border-zinc-100 bg-white leading-8 text-zinc-950 shadow-[0_-1px_0_0px_#d4d4d8_inset,0_0_0_1px_#f4f4f5_inset,0_0.5px_0_1.5px_#fff_inset] hover:bg-zinc-50 hover:via-zinc-900 hover:to-zinc-800 active:shadow-[-1px_0px_1px_0px_#e4e4e7_inset,1px_0px_1px_0px_#e4e4e7_inset,0px_0.125rem_1px_0px_#d4d4d8_inset]",
        )}
      >
        <span
          className={cn(
            "flex items-center group-active:[transform:translate3d(0,1px,0)]",
          )}
        >
          <LucidePlus size={16} strokeWidth={1.75} />
        </span>
      </button>
    </div>
  );
};
