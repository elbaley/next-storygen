"use client";

import { Stage, Layer, Text, Group, Label, Tag } from "react-konva";
import { BASE_HEIGHT, BASE_WIDTH } from "@/constants";
import { useState, useRef } from "react";
import { Baseline, Menu, Save, Trash, Type } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Popover } from "@/components/ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";

export default function Page() {
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
      setTexts((prevTexts) =>
        prevTexts.map((text) => {
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
      );
    }
  };

  const [texts, setTexts] = useState([
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
      text: "Konva Text",
      x: 100,
      y: BASE_HEIGHT - 35,
      fontSize: 18,
      background: "black",
      color: "white",
    },
  ]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddText = () => {
    const id = Date.now();
    setTexts([
      ...texts,
      {
        id,
        text: "Text",
        x: BASE_WIDTH / 2.5,
        y: BASE_HEIGHT / 2,
        fontSize: 20,
        background: "black",
        color: "white",
      },
    ]);

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
    const text = texts.find((t) => t.id === id);
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
      setTexts(
        texts.map((t) => (t.id === editingId ? { ...t, text: newText } : t)),
      );
      setEditingId(null);
    }
  };

  const handleDeleteText = () => {
    if (editingId !== null) {
      setTexts(texts.filter((t) => t.id !== editingId));
      setEditingId(null);
    }
  };

  return (
    <main className="w-full pt-4">
      <Popover>
        <PopoverTrigger asChild>
          <button className="bg-zinc-200 ml-4 hover:bg-orange-200 p-3 rounded-sm ">
            <Menu size={16} />
          </button>
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          className="rounded-sm p-2 ml-4 mt-2 shadow-[0_0_0.931px_0_rgba(0,0,0,0.17),0_0_3.127px_0_rgba(0,0,0,0.08),0_7px_14px_0_rgba(0,0,0,0.05)]"
        >
          <div>Background</div>
        </PopoverContent>
      </Popover>

      <div className="w-full flex items-center justify-center">
        <div
          className="bg-cover relative border border-black"
          style={{
            width: `${BASE_WIDTH}px`,
            height: `${BASE_HEIGHT}px`,
            backgroundImage: "url(https://picsum.photos/id/0/1080/1920)",
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
              {texts.map((t) => (
                <Group
                  key={t.id}
                  x={t.x}
                  y={t.y}
                  draggable
                  onDragEnd={(e) => {
                    const { x, y } = e.currentTarget.getAbsolutePosition();
                    setTexts(
                      texts.map((text) =>
                        text.id === t.id
                          ? {
                              ...text,
                              x,
                              y,
                            }
                          : text,
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

      <div className="flex justify-center w-full pt-4 gap-4 items-center">
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
                texts.find((t) => t.id === editingId)?.background !==
                  "transparent" && "outline outline-black ",
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
    </main>
  );
}
