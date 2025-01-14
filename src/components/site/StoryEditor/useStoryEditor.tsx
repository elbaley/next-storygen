"use client";
import { BASE_HEIGHT, BASE_WIDTH } from "@/constants";
import { useState, useRef } from "react";
import { nanoid } from "nanoid";
import { Story } from "./StoryEditor.types";

export const useStoryEditor = () => {
  const [stories, setStories] = useState<Story[]>([
    {
      id: "1",
      backgroundImage: "https://picsum.photos/id/721/1080/1920?blur=10",
      texts: [
        {
          id: "1",
          text: "Hello World",
          x: 0,
          y: 0,
          fontSize: 24,
          background: "black",
          color: "white",
        },
        {
          id: "2",
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddStory = () => {
    setStories([
      ...stories,
      {
        id: nanoid(19),
        backgroundImage: "https://picsum.photos/id/721/1080/1920?blur=10",
        texts: [],
      },
    ]);
    setActiveStoryIndex(stories.length);
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

  const getRandomBackgroundUrl = () => {
    const randomId = Math.floor(Math.random() * 1000);
    return `https://picsum.photos/id/${randomId}/1080/1920`;
  };
  const handleShuffleBackground = () => {
    const url = getRandomBackgroundUrl();
    const img = new Image();
    img.src = url;
    img.onload = () => {
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
  };

  const handleAddText = () => {
    const id = nanoid(19);
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

  const handleEditText = (id: string) => {
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

  return {
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
  };
};
