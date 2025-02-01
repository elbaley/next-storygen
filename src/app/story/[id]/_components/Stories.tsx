"use client";
import { useEffect, useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./swiper.css";
import "swiper/css/effect-cube";
import { Pagination, EffectCube } from "swiper/modules";
import { PrevNextTapAreas } from "./PrevNextTapAreas";
import { BASE_HEIGHT, BASE_WIDTH } from "@/constants";
import {
  type Position,
  type Story,
} from "@/components/site/StoryEditor/StoryEditor.types";
import { cn } from "@/lib/utils";
import { GRADIENT_PRESETS } from "@/components/site/StoryEditor/StoryEditor";

type StoriesProps = {
  stories: Story[];
};
export const Stories = ({ stories }: StoriesProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerDimensions, setContainerDimensions] = useState({
    width: BASE_WIDTH,
    height: BASE_HEIGHT,
  });

  useEffect(() => {
    if (containerRef.current) {
      const { clientWidth, clientHeight } = containerRef.current;
      setContainerDimensions({ width: clientWidth, height: clientHeight });
    }
  }, []);

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
        effect={"cube"}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        modules={[Pagination, EffectCube]}
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
              // ...(story.background.type !== "image" && {
              //   background: `white`,
              // }),
            }}
            className={cn(
              "text-foreground isolate relative !bg-cover",
              story.background.type === "gradient" &&
                GRADIENT_PRESETS[story.background.value],
            )}
          >
            <PrevNextTapAreas />
            <div className="slider-container bg-red-500/10  [&_>*]z-[9] h-full  relative">
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

                const scaleFactor = containerDimensions.width / BASE_WIDTH;
                const { top, left } = calculatePosition(
                  position,
                  containerDimensions.width,
                  containerDimensions.height,
                );

                return (
                  <span
                    key={id}
                    className="px-1 font-bold leading-[30px] rounded-sm p-[4px] whitespace-break-spaces"
                    style={{
                      position: "absolute",
                      top,
                      left,
                      fontSize: `${fontSize * scaleFactor}px`,
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
