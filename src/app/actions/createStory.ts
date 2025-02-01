"use server";

import type { Story } from "@/components/site/StoryEditor/StoryEditor.types";
import { env } from "@/env";

export async function createStory(stories: Story[]) {
  if (stories.length < 2) {
    throw new Error("You cannot publish a story with less than 2 slides.");
  }
  const response = await fetch(env.CF_WORKER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.CF_WORKER_SECRET}`,
    },
    body: JSON.stringify({ stories }),
  });
  const data = (await response.json()) as { id?: string };
  if (!data.id) {
    throw new Error("Something went wrong.");
  }
  return data;
}
