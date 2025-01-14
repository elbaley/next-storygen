"use client";

import { Stage, Layer, Text, Group, Label, Tag } from "react-konva";
import { BASE_HEIGHT, BASE_WIDTH } from "@/constants";
import { Baseline, LucideShuffle, Menu, Save, Trash, Type } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useStoryEditor } from "./useStoryEditor";

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
    handleAddText,
    handleEditText,
    handleUpdateText,
    handleDeleteText,
  } = useStoryEditor();

  return (
    <div className="w-full pt-4">
      <div className="w-full flex items-center gap-4 justify-center">
        {/* Sidebar for story selection */}
        <div>
          <ScrollArea className="h-64 w-12">
            <div className="space-y-2">
              {stories.map((story, index) => (
                <button
                  key={story.id}
                  onClick={() => setActiveStoryIndex(index)}
                  className={cn(
                    "w-12 h-12 border text-center shrink-0",
                    activeStoryIndex === index ? "bg-blue-200" : "bg-gray-100",
                  )}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </ScrollArea>
          <button
            onClick={handleAddStory}
            className="w-12 h-12 bg-green-100 mt-4 hover:bg-green-200"
          >
            +
          </button>
        </div>
        <div
          className="bg-cover relative border border-black"
          style={{
            width: `${BASE_WIDTH}px`,
            height: `${BASE_HEIGHT}px`,
            ...(currentStory.background && {
              background: currentStory.background,
            }),
            ...(currentStory.backgroundImage && {
              backgroundImage: `url(${currentStory.backgroundImage})`,
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
              {currentStory.texts.map((t) => (
                <Group
                  key={t.id}
                  x={t.x}
                  y={t.y}
                  draggable
                  onDragEnd={(e) => {
                    const { x, y } = e.currentTarget.getAbsolutePosition();
                    setStories(
                      stories.map((story, index) =>
                        index === activeStoryIndex
                          ? {
                              ...story,
                              texts: story.texts.map((text) =>
                                text.id === t.id ? { ...text, x, y } : text,
                              ),
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
                      fontVariant="bold"
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
      <div className="flex justify-center items-center pt-4 gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <button className="bg-purple-100  hover:bg-purple-200 p-4 rounded-sm ">
              <Menu size={16} />
            </button>
          </PopoverTrigger>
          <PopoverContent
            side="top"
            className="bg-white rounded-sm p-2 ml-4 mb-2 shadow-[0_0_0.931px_0_rgba(0,0,0,0.17),0_0_3.127px_0_rgba(0,0,0,0.08),0_7px_14px_0_rgba(0,0,0,0.05)]"
          >
            <span className="text-sm">Background</span>
            <div className="flex gap-2">
              <button
                onClick={handleShuffleBackground}
                className="flex justify-center items-center h-6 aspect-square rounded-sm border hover:opacity-70"
              >
                <LucideShuffle size={16} strokeWidth={1.5} />
              </button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Toolbar */}
        <div className="flex justify-center gap-4 items-center">
          <div className="py-2 px-3  shadow-[0_0_0.931px_0_rgba(0,0,0,0.17),0_0_3.127px_0_rgba(0,0,0,0.08),0_7px_14px_0_rgba(0,0,0,0.05)] rounded-lg min-w-96 flex gap-2">
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
                  currentStory.texts.find((t) => t.id === editingId)
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
