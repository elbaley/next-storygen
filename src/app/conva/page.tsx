"use client";

import { Stage, Layer, Text, Group, Label, Tag } from "react-konva";
import { BASE_HEIGHT, BASE_WIDTH } from "@/constants";
import { useState, useRef } from "react";
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

export default function Page() {
  const [stories, setStories] = useState([
    {
      id: 1,
      backgroundImage: "https://picsum.photos/id/0/1080/1920",
      texts: [
        {
          id: 1,
          text: "Hello World",
          x: 0,
          y: 0,
          fontSize: 24,
          background: "black",
          color: "white",
        },
        {
          id: 2,
          text: "Story 1 Text",
          x: 100,
          y: BASE_HEIGHT - 35,
          fontSize: 18,
          background: "black",
          color: "white",
        },
      ],
    },
    {
      id: 2,
      background: "black",
      texts: [
        {
          id: 1,
          text: "Hello World",
          x: 0,
          y: 0,
          fontSize: 24,
          background: "black",
          color: "white",
        },
        {
          id: 2,
          text: "Story 1 Text",
          x: 100,
          y: BASE_HEIGHT - 35,
          fontSize: 18,
          background: "black",
          color: "white",
        },
      ],
    },
  ]);

  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const currentStory = stories[activeStoryIndex];
  const [editingId, setEditingId] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddStory = () => {
    setStories([
      ...stories,
      {
        id: Date.now(),
        background: "white",
        texts: [],
      },
    ]);
    setActiveStoryIndex(stories.length); // Set the new story as active
  };

  const backgroundPresets = [
    {
      id: 0,
      background: "black",
      color: "white",
    },
    {
      id: 1,
      background: "white",
      color: "black",
    },
    {
      id: 2,
      background: "transparent",
      color: "black",
    },
  ] as const;

  const handleCyclePreset = () => {
    if (editingId !== null) {
      setStories((prevStories) => {
        return prevStories.map((story, index) => {
          if (index === activeStoryIndex) {
            return {
              ...story,
              texts: story.texts.map((text) => {
                if (text.id === editingId) {
                  const currentPresetIndex = backgroundPresets.findIndex(
                    (preset) =>
                      preset.background === text.background &&
                      preset.color === text.color,
                  );
                  const nextPresetIndex =
                    (currentPresetIndex + 1) % backgroundPresets.length;
                  return {
                    ...text,
                    background: backgroundPresets[nextPresetIndex].background,
                    color: backgroundPresets[nextPresetIndex].color,
                  };
                }
                return text;
              }),
            };
          }
          return story;
        });
      });
    }
  };

  const handleShuffleBackground = () => {
    const randomId = Math.floor(Math.random() * 100);
    const url = `https://picsum.photos/id/${randomId}/1080/1920`;

    setStories((prevStories) => {
      return prevStories.map((story, index) => {
        if (index === activeStoryIndex) {
          return {
            ...story,
            backgroundImage: url,
            background: undefined,
          };
        }
        return story;
      });
    });
  };

  const handleAddText = () => {
    const id = Date.now();
    const newText = {
      id,
      text: "Text",
      x: BASE_WIDTH / 2.5,
      y: BASE_HEIGHT / 2,
      fontSize: 20,
      background: "black",
      color: "white",
    };

    setStories(
      stories.map((story, index) =>
        index === activeStoryIndex
          ? { ...story, texts: [...story.texts, newText] }
          : story,
      ),
    );

    setEditingId(id);
    if (inputRef.current) {
      inputRef.current.value = "Text";
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const handleEditText = (id: number) => {
    setEditingId(id);
    const text = currentStory.texts.find((t) => t.id === id);
    if (text && inputRef.current) {
      inputRef.current.value = text.text;
      inputRef.current.focus();

      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const handleUpdateText = () => {
    if (editingId !== null && inputRef.current) {
      const newText = inputRef.current.value;
      setStories(
        stories.map((story, index) =>
          index === activeStoryIndex
            ? {
                ...story,
                texts: story.texts.map((t) =>
                  t.id === editingId ? { ...t, text: newText } : t,
                ),
              }
            : story,
        ),
      );

      setEditingId(null);
    }
  };

  const handleDeleteText = () => {
    if (editingId !== null) {
      setStories(
        stories.map((story, index) =>
          index === activeStoryIndex
            ? {
                ...story,
                texts: story.texts.filter((t) => t.id !== editingId),
              }
            : story,
        ),
      );
      setEditingId(null);
    }
  };

  return (
    <main className="w-full pt-4">
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
        <div className="flex justify-center wfull  gap-4 items-center">
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
    </main>
  );
}
