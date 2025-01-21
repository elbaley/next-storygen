import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Story } from "../StoryEditor.types";
import { cn } from "@/lib/utils";

type StoryNavigationProps = {
  stories: Story[];
  setActiveStoryIndex: (index: number) => void;
  handleAddStory: () => void;
  activeStoryIndex: number;
};

export const StoryNavigation = ({
  stories,
  handleAddStory,
  setActiveStoryIndex,
  activeStoryIndex,
}: StoryNavigationProps) => {
  return (
    <div className="mx-auto max-w-[320px] flex gap-2 items-center">
      <ScrollArea className="flex-1 ">
        <div className="flex gap-2 overflow-visible px-5 py-5 -translate-x-5">
          {stories.map((story, index) => (
            <button
              key={story.id}
              onClick={() => setActiveStoryIndex(index)}
              className={cn(
                "group flex h-10 w-10 select-none items-center justify-center rounded-lg border border-zinc-100 bg-white leading-8 text-zinc-950 shadow-[0_-1px_0_0px_#d4d4d8_inset,0_0_0_1px_#f4f4f5_inset,0_0.5px_0_1.5px_#fff_inset] hover:bg-zinc-50 hover:via-zinc-900 hover:to-zinc-800 active:shadow-[-1px_0px_1px_0px_#e4e4e7_inset,1px_0px_1px_0px_#e4e4e7_inset,0px_0.125rem_1px_0px_#d4d4d8_inset]",
                activeStoryIndex === index
                  ? "shadow-[-1px_0px_1px_0px_#e4e4e7_inset,1px_0px_1px_0px_#e4e4e7_inset,0px_0.125rem_1px_0px_#d4d4d8_inset]"
                  : "",
              )}

              // className={cn(
              //   "w-12 h-12 rounded-sm  border-secondary bg-white border drop-shadow-lg",
              //   // activeStoryIndex === index
              //   //   ? "bg-blue-200 border-dashed border-muted"
              //   //   : "bg-gray-100",
              // )}
            >
              <span
                className={cn(
                  "flex items-center group-active:[transform:translate3d(0,1px,0)]",
                  activeStoryIndex === index
                    ? "[transform:translate3d(0,1px,0)]"
                    : "",
                )}
              >
                {index + 1}
              </span>
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <button
        onClick={handleAddStory}
        className="w-12 h-12 bg-green-100  hover:bg-green-200"
      >
        +
      </button>
    </div>
  );
};
