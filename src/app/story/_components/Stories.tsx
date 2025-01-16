import { useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./swiper.css";
import { Pagination } from "swiper/modules";
import { PrevNextTapAreas } from "./PrevNextTapAreas";
import { BASE_HEIGHT, BASE_WIDTH } from "@/constants";
import {
  type Position,
  type Story,
} from "@/components/site/StoryEditor/StoryEditor.types";

type StoriesProps = {
  stories: Story[];
};
export const Stories = ({ stories }: StoriesProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={containerRef}
      id="swiper-container"
      className="select-none aspect"
    >
      <Swiper
        className="h-full relative "
        spaceBetween={50}
        pagination={{
          clickable: false,
          el: ".custom-pagination",
          renderBullet: (_, className) => {
            return `<span class="${className} custom-bullet"></span>`;
          },
        }}
        slidesPerView={1}
        modules={[Pagination]}
        onSlideChange={() => console.log("slide change")}
      >
        <div
          slot="container-start"
          className="custom-pagination-container absolute top-0 w-full z-[6]"
        >
          <div className="custom-pagination"></div>
        </div>
        {stories.map((story) => (
          <SwiperSlide
            key={story.id}
            style={{
              ...(story.background.type === "image" && {
                backgroundImage: `url('${story.background.value}')`,
              }),
              ...(story.background.type !== "image" && {
                background: `white`,
              }),
            }}
            className={`text-foreground isolate relative !bg-cover`}
          >
            <PrevNextTapAreas />
            <div className="slider-container p-4 [&_>*]z-[9] h-full mt-8 relative">
              {/* Render Text Components */}
              {story.components.texts?.map((text) => {
                const {
                  id,
                  text: content,
                  position,
                  fontSize,
                  background,
                  color,
                } = text;
                const { top, left } = calculatePosition(
                  position,
                  containerRef.current?.clientWidth ?? BASE_WIDTH,
                  containerRef.current?.clientHeight ?? BASE_HEIGHT,
                );

                return (
                  <span
                    key={id}
                    style={{
                      position: "absolute",
                      top,
                      left,
                      fontSize,
                      backgroundColor: background,
                      color,
                    }}
                  >
                    {content}
                  </span>
                );
              })}

              {/* Render Link Components */}
              {story.components.links?.map((link) => {
                const {
                  id,
                  text: content,
                  href,
                  position,
                  fontSize,
                  background,
                  color,
                } = link;

                const { top, left } = calculatePosition(
                  position,
                  containerRef.current?.clientWidth ?? BASE_WIDTH,
                  containerRef.current?.clientHeight ?? BASE_HEIGHT,
                );

                return (
                  <button
                    key={id}
                    className="z-10 active:opacity-90"
                    style={{
                      position: "absolute",
                      top,
                      left,
                      fontSize,
                      backgroundColor: background,
                      color,
                    }}
                    onClick={() => {
                      window.open(href, "_blank");
                    }}
                  >
                    {content}
                  </button>
                );
              })}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const calculatePosition = (
  position: Position,
  containerWidth?: number,
  containerHeight?: number,
) => {
  const width = containerWidth ?? BASE_WIDTH;
  const height = containerHeight ?? BASE_HEIGHT;

  return {
    top: `${(position.y / BASE_HEIGHT) * height}px`,
    left: `${(position.x / BASE_WIDTH) * width}px`,
  };
};
