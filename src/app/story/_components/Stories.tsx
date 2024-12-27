import { useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./swiper.css";
import { Pagination } from "swiper/modules";
import { PrevNextTapAreas } from "./PrevNextTapAreas";
import { BASE_HEIGHT, BASE_WIDTH } from "@/constants";

export type TStories = Array<{
  id: number;
  background: {
    type: "color" | "image";
    value: string;
  };
  components: Array<{
    type: "Text" | "Link";
    id: string;
    content: string;
    style: {
      color: string;
      fontSize?: string;
      backgroundColor?: string;
      width?: string;
      height?: string;
    };
    position: iPosition;
    href?: string;
  }>;
}>;

type StoriesProps = {
  stories: TStories;
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
            className={`text-foreground isolate relative  !bg-cover`}
          >
            <PrevNextTapAreas />
            <div className="slider-container p-4 [&_>*]z-[9] h-full mt-8 relative">
              {story.components.map((component) => {
                const { type, id, content, style, position, href } = component;

                const { top, left } = calculatePosition(
                  position,
                  containerRef.current?.clientWidth ?? BASE_WIDTH,
                  containerRef.current?.clientHeight ?? BASE_HEIGHT,
                );

                switch (type) {
                  case "Text":
                    return (
                      <span
                        key={id}
                        style={{
                          ...style,
                          position: "absolute",
                          top,
                          left,
                        }}
                      >
                        {content}
                      </span>
                    );
                  case "Link":
                    return (
                      <button
                        key={id}
                        className="z-10 active:opacity-90"
                        style={{
                          ...style,
                          position: "absolute",
                          top,
                          left,
                        }}
                        onClick={() => {
                          window.open(href, "_blank");
                        }}
                      >
                        {content}
                      </button>
                    );
                  default:
                    return null;
                }
              })}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export type iPosition = {
  x: number;
  y: number;
};

const calculatePosition = (
  position: iPosition,

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
