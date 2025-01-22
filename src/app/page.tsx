import { StoryEditor } from "@/components/site/StoryEditor/StoryEditor";
import { LucideGalleryHorizontal } from "lucide-react";

export default function Home() {
  return (
    <div>
      <div className="h-1 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]" />
      <nav className="shadow-borderShadow max-w-xl mt-4 rounded-sm py-2 px-4 mx-auto max-sm:mx-4">
        <div className="flex items-center gap-2">
          <LucideGalleryHorizontal size={16} strokeWidth={1.5} />
          <span className="font-semibold ">storygen</span>
        </div>
      </nav>
      <StoryEditor />
    </div>
  );
}
