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
      <ScrollArea className="flex-1">
        <div className="flex gap-2">
          {stories.map((story, index) => (
            <button
              key={story.id}
              onClick={() => setActiveStoryIndex(index)}
              className={cn(
                "w-12 h-12 border text-center shrink-0",
                activeStoryIndex === index
                  ? "bg-blue-200 border-dashed border-muted"
                  : "bg-gray-100",
              )}
            >
              {index + 1}
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
