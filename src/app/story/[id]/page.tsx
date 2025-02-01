import { Stories } from "./_components/Stories";
import { notFound } from "next/navigation";
import { getStory } from "@/app/actions/getStory";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  if (!id) {
    notFound();
  }

  const res = await getStory(id);
  const stories = res.data ?? [];

  return (
    <main className="w-full  h-full min-h-dvh flex justify-center  items-center bg-black">
      {res.status && stories ? (
        <Stories stories={stories} />
      ) : (
        <h1 className="text-white">Error</h1>
      )}
    </main>
  );
}
