"use client";

import { Stage, Layer, Text, Group, Label, Tag } from "react-konva";
import { BASE_HEIGHT, BASE_WIDTH } from "@/constants";
import { Baseline, Save, Trash, Type } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useStoryEditor } from "./useStoryEditor";
import { StoryNavigation } from "./_components/StoryNavigation";
import { StoryActionsMenu } from "./_components/StoryActionsMenu";

export const GRADIENT_PRESETS = {
  classic: "bg-gradient-to-b from-[#833ab4] via-[#fd1d1d] to-[#fcb045]",
  skyline: "bg-gradient-to-b from-[#1488CC] to-[#2B32B2]",
  cherry: "bg-gradient-to-b from-[#EB3349] to-[#F45C43]",
  vibrant: "bg-gradient-to-r from-[#ff7e5f] to-[#feb47b]",
  green: "bg-gradient-to-b from-[#051937] via-[#004d7a] to-[#008793]",
} as const;

export const StoryEditor = () => {
  const {
    stories,
    setStories,
    activeStoryIndex,
    setActiveStoryIndex,
    currentStory,
    editingId,
    setEditingId,
    inputRef,
    handleAddStory,
    handleCyclePreset,
    handleShuffleBackground,
    applyGradientPreset,
    handleAddText,
    handleEditText,
    handleUpdateText,
    handleDeleteText,
    handleDeleteStory,
    publishStory,
  } = useStoryEditor();

  return (
    <div className="w-full pt-4">
      <div className="w-full flex items-center gap-4 justify-center">
        <div
          className={cn(
            "bg-cover relative drop-shadow-md borde border-black",
            currentStory.background.type === "gradient" &&
              GRADIENT_PRESETS[currentStory.background.value],
          )}
          style={{
            width: `${BASE_WIDTH}px`,
            height: `${BASE_HEIGHT}px`,
            ...(currentStory.background.type === "color" && {
              background: currentStory.background.value,
            }),
            ...(currentStory.background.type === "image" && {
              backgroundImage: `url(${currentStory.background.value})`,
            }),
          }}
        >
          <Stage
            onClick={() => {
              if (editingId !== null) {
                setEditingId(null);
              }
            }}
            width={BASE_WIDTH}
            height={BASE_HEIGHT}
          >
            <Layer>
              {currentStory.components.texts?.map((t) => (
                <Group
                  key={t.id}
                  x={t.position.x}
                  y={t.position.y}
                  draggable
                  onDragEnd={(e) => {
                    const { x, y } = e.currentTarget.getAbsolutePosition();
                    setStories(
                      stories.map((story, index) =>
                        index === activeStoryIndex
                          ? {
                              ...story,
                              components: {
                                ...story.components,
                                texts: story.components.texts?.map((text) =>
                                  text.id === t.id
                                    ? { ...text, position: { x, y } }
                                    : text,
                                ),
                              },
                            }
                          : story,
                      ),
                    );
                  }}
                >
                  <Label>
                    <Tag cornerRadius={4} fill={t.background} />
                    <Text
                      text={t.text}
                      fontFamily="Inter"
                      fontStyle="bold"
                      padding={6}
                      shadowBlur={t.background !== "transparent" ? 0 : 0}
                      fontSize={t.fontSize}
                      fill={t.color}
                      onDblClick={() => {
                        handleEditText(t.id);
                      }}
                    />
                  </Label>
                </Group>
              ))}
            </Layer>
          </Stage>
        </div>
      </div>
      <StoryNavigation
        handleAddStory={handleAddStory}
        handleDeleteStory={handleDeleteStory}
        activeStoryIndex={activeStoryIndex}
        setActiveStoryIndex={setActiveStoryIndex}
        stories={stories}
      />
      <div className="flex justify-center items-center pt-2 gap-2">
        <StoryActionsMenu
          publishStory={publishStory}
          handleShuffleBackground={handleShuffleBackground}
          applyGradientPreset={applyGradientPreset}
        />
        {/* Toolbar */}
        <div className="flex bg-white justify-center gap-4 items-center">
          <div className="py-2 px-3  shadow-borderShadow rounded-lg min-w-96 flex gap-2">
            <button
              disabled={editingId !== null}
              onClick={handleAddText}
              className="hover:bg-orange-200 p-2 rounded-md"
            >
              <Type size={16} />
            </button>
            <Separator orientation="vertical" />
            <div className={cn("flex gap-2", editingId === null && "hidden")}>
              <button
                onClick={handleCyclePreset}
                className={cn(
                  "p-2 rounded-md",
                  currentStory.components.texts?.find((t) => t.id === editingId)
                    ?.background !== "transparent" && "outline outline-black ",
                )}
              >
                <Baseline size={16} />
              </button>
              <Input tabIndex={0} className="h-8" ref={inputRef} />
              <button
                onClick={handleUpdateText}
                className="hover:bg-orange-200 p-2 rounded-md"
              >
                <Save size={16} />
              </button>
              <button
                onClick={handleDeleteText}
                className="hover:bg-orange-200 p-2 rounded-md"
              >
                <Trash size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
