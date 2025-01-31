"use server";

import type { Story } from "@/components/site/StoryEditor/StoryEditor.types";

export async function createStory(stories: Story[]) {
  const response = await fetch(process.env.CF_WORKER_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ stories }),
  });

  const data = await response.json();
  return data;
}
