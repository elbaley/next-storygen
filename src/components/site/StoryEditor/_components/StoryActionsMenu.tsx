import { LucideShuffle, Menu, Save } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { GRADIENT_PRESETS } from "../StoryEditor";
import type { GradientPreset } from "../StoryEditor.types";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useAlertStore } from "@/store/storeAlert";

type StoryActionsMenuProps = {
  publishStory: () => Promise<void>;
  applyGradientPreset: (preset: GradientPreset) => void;
  handleShuffleBackground: () => void;
};

export const StoryActionsMenu = ({
  publishStory,
  applyGradientPreset,
  handleShuffleBackground,
}: StoryActionsMenuProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const showAlert = useAlertStore((state) => state.showAlert);

  return (
    <Popover open={menuOpen} onOpenChange={setMenuOpen}>
      <PopoverTrigger asChild>
        <button className="bg-white hover:bg-orange-200 p-4 rounded-sm shadow-borderShadow">
          <Menu size={16} />
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        className="bg-white rounded-sm p-2 ml-4 mb-2 shadow-borderShadow max-w-56 "
      >
        <div className="flex flex-col gap-2 pb-2">
          <button
            onClick={() => {
              showAlert({
                title: "Publish Story",
                description:
                  "Are you sure you want to publish this story? \nStories are public and can be viewed by anyone. Stories are deleted after 24 hours.",
                action: {
                  onClick: async () => {
                    await publishStory();
                  },
                  label: "Publish",
                },
              });
            }}
            className="flex gap-2 items-center hover:bg-orange-200 px-2 rounded-sm py-1"
          >
            <Save strokeWidth={1.5} size={16} />
            <span className="text-sm">Publish</span>
          </button>
        </div>
        <Separator orientation="horizontal" />
        <span className="text-xs">Story background</span>
        <div className="flex gap-2">
          {Object.keys(GRADIENT_PRESETS).map((preset) => {
            return (
              <button
                key={preset}
                onClick={() => {
                  applyGradientPreset(preset as GradientPreset);
                }}
                className={cn(
                  "flex justify-center items-center h-6 aspect-square rounded-sm border hover:opacity-70",
                  GRADIENT_PRESETS[preset as GradientPreset],
                )}
              />
            );
          })}
          <button
            onClick={handleShuffleBackground}
            className="flex justify-center items-center h-6 aspect-square rounded-sm border hover:opacity-70"
          >
            <LucideShuffle size={16} strokeWidth={1.5} />
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
