"use server";

import { Story } from "@/components/site/StoryEditor/StoryEditor.types";

export async function getStory(id: string) {
  const response = await fetch(
    `${process.env.CF_WORKER_URL!}//next-storygen.lebafurkan.workers.dev/${id}`,
    {
      method: "GET",
    },
  );

  const data = (await response.json()) as Story[];
  return data;
}
