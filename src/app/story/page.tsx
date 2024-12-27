"use client";

import { Stories, TStories } from "./_components/Stories";

export default function Page() {
  const demoStories: TStories = [
    {
      id: 1,
      background: {
        type: "image",
        value: "https://picsum.photos/id/0/1080/1920",
      },
      components: [
        {
          type: "Text",
          id: "text-1",
          content: "Slide 1",
          style: {
            color: "white",
            fontSize: "20px",
          },
          position: { x: 100, y: 200 },
        },
        {
          type: "Link",
          id: "link-1",
          content: "SELAM",
          style: {
            backgroundColor: "red",
            color: "white",
            width: "100px",
            height: "50px",
          },
          href: "#",
          position: { x: 0, y: 10 },
        },
      ],
    },
    {
      id: 2,
      background: {
        type: "image",
        value: "https://picsum.photos/id/169/1080/1920",
      },
      components: [
        {
          type: "Text",
          id: "text-2",
          content: "Another Slide",
          style: {
            color: "blue",
            fontSize: "18px",
          },
          position: { x: 50, y: 150 },
        },
        {
          type: "Link",
          id: "link-2",
          content: "Click Me",
          style: {
            backgroundColor: "green",
            color: "white",
            width: "80px",
            height: "40px",
          },
          href: "#",
          position: { x: 138, y: 0 },
        },
      ],
    },
    {
      id: 3,
      background: {
        type: "image",
        // value: "white",
        value: "https://picsum.photos/id/318/1080/1920",
      },
      components: [
        {
          type: "Text",
          id: "text-4",
          content: "Slide 3",
          style: {
            color: "red",
            fontSize: "20px",
          },
          position: { x: 100, y: 200 },
        },
        {
          type: "Link",
          id: "link-1",
          content: "SELAM -3",
          style: {
            backgroundColor: "blue",
            color: "white",
            width: "100px",
            height: "50px",
          },
          href: "#",
          position: { x: 0, y: 300 },
        },
      ],
    },
  ];

  return (
    <main className="w-full  h-dvh flex justify-center  bg-red-500/10">
      <Stories stories={demoStories} />
    </main>
  );
}
