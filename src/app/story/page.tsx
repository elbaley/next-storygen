"use client";

import type { Story } from "@/components/site/StoryEditor/StoryEditor.types";
import { Stories } from "./_components/Stories";

export default function Page() {
  const demoStories: Story[] = [
    {
      id: "1",
      background: {
        type: "image",
        value: "https://picsum.photos/id/0/1080/1920",
      },
      components: {
        texts: [
          {
            id: "text-1",
            text: "Slide 1",
            background: "black",
            color: "white",
            fontSize: 20,
            position: { x: 100, y: 200 },
          },
        ],
        links: [
          {
            id: "link-1",
            text: "SELAM",
            href: "#",
            fontSize: 16,
            background: "red",
            color: "white",
            position: { x: 0, y: 10 },
          },
        ],
      },
    },
    {
      id: "2",
      background: {
        type: "image",
        value: "https://picsum.photos/id/169/1080/1920",
      },
      components: {
        texts: [
          {
            id: "text-1",
            text: "Slide 2",
            background: "black",
            color: "white",
            fontSize: 20,
            position: { x: 100, y: 200 },
          },
        ],
        links: [
          {
            id: "link-2",
            text: "SELAM 2",
            href: "#",
            fontSize: 16,
            background: "red",
            color: "white",
            position: { x: 0, y: 10 },
          },
        ],
      },
    },
    {
      id: "3",
      background: {
        type: "image",
        value: "https://picsum.photos/id/318/1080/1920",
      },
      components: {
        texts: [
          {
            id: "text-3",
            text: "Slide 3",
            background: "black",
            color: "white",
            fontSize: 20,
            position: { x: 100, y: 200 },
          },
        ],
        links: [
          {
            id: "link-3",
            text: "SELAM 3",
            href: "#",
            fontSize: 16,
            background: "red",
            color: "white",
            position: { x: 0, y: 10 },
          },
        ],
      },
    },
  ];

  return (
    <main className="w-full  h-dvh flex justify-center  bg-black">
      <Stories stories={demoStories} />
    </main>
  );
}
