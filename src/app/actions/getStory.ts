"use server";

import { Story } from "@/components/site/StoryEditor/StoryEditor.types";
import { env } from "@/env";

export async function getStory(id: string) {
  const response = await fetch(`${env.CF_WORKER_URL}/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${env.CF_WORKER_SECRET}`,
    },
  });

  if (!response.ok) {
    return {
      status: false,
      message: "Something wrong happened.",
    };
  }

  const data = (await response.json()) as GetStoryResponse;
  console.log("Result of getStory->", data);
  return data;
}

type GetStoryResponse = {
  status: boolean;
  message: string;
  data?: Story[];
};
