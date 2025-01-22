"use client";
import { BASE_HEIGHT, BASE_WIDTH } from "@/constants";
import { useState, useRef } from "react";
import { nanoid } from "nanoid";
import { GradientPreset, Story, StoryText } from "./StoryEditor.types";

export const useStoryEditor = () => {
  const [stories, setStories] = useState<Story[]>([
    {
      id: "1",
      background: {
        type: "gradient",
        value: "classic",
      },
      components: {
        texts: [
          {
            id: "1",
            text: "storygen:",
            position: {
              x: 100,
              y: 100,
            },
            fontSize: 24,
            background: "black",
            color: "white",
          },
          {
            id: "2a",
            text: "1) Create stories🎨🖌️ \n\n2) Publish easily 📤",
            position: {
              x: 40,
              y: 140,
            },
            fontSize: 24,
            background: "black",
            color: "white",
          },
          {
            id: "3",
            text: "Add New story  ↴",
            position: {
              x: 140,
              y: BASE_HEIGHT - 35,
            },
            fontSize: 18,
            background: "black",
            color: "white",
          },
        ],
      },
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
        background: {
          type: "gradient",
          value: "classic",
        },
        components: {},
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
              components: {
                ...story.components,
                texts: story.components.texts?.map((text) => {
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
              },
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
              background: {
                type: "image",
                value: url,
              },
            };
          }
          return story;
        });
      });
    };
  };

  const applyGradientPreset = (preset: GradientPreset) => {
    setStories((prevStories) => {
      return prevStories.map((story, index) => {
        if (index === activeStoryIndex) {
          return {
            ...story,
            background: {
              type: "gradient",
              value: preset,
            },
          };
        }
        return story;
      });
    });
  };
  const handleAddText = () => {
    const id = nanoid(19);
    const newText: StoryText = {
      id,
      text: "Text",
      position: {
        x: BASE_WIDTH / 2.5,
        y: BASE_HEIGHT / 2,
      },
      fontSize: 20,
      background: "black",
      color: "white",
    };

    setStories(
      stories.map((story, index) => {
        if (index !== activeStoryIndex) {
          return story;
        }

        const updatedTexts = story.components.texts
          ? [...story.components.texts, newText]
          : [newText];

        return {
          ...story,
          components: {
            ...story.components,
            texts: updatedTexts,
          },
        };
      }),
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
    const text = currentStory.components.texts?.find((t) => t.id === id);
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
                components: {
                  texts: story.components.texts?.map((t) =>
                    t.id === editingId ? { ...t, text: newText } : t,
                  ),
                },
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
                components: {
                  texts: story.components.texts?.filter(
                    (t) => t.id !== editingId,
                  ),
                },
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
    applyGradientPreset,
  };
};
