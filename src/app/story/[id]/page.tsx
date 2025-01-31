// "use client";
//

import type { Story } from "@/components/site/StoryEditor/StoryEditor.types";
import { Stories } from "./_components/Stories";
import { notFound } from "next/navigation";
import { getStory } from "@/app/actions/getStory";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  console.log(id);

  if (!id) {
    notFound();
  }

  const stories = await getStory(id);

  const cfStoryCache: Story[] = [
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
              y: 534, //ORIGINAL
              // y: 500,
            },
            fontSize: 18,
            background: "black",
            color: "white",
          },
        ],
      },
    },
  ];
  return (
    <main className="w-full  h-dvh flex justify-center  items-center bg-black">
      <Stories stories={stories} />
    </main>
  );
}
