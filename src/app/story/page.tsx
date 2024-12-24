"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./swiper.css";
import { Pagination } from "swiper/modules";
import { PrevNextTapAreas } from "./_components/PrevNextTapAreas";

export default function Page() {
  const demoStories = [
    {
      id: 1,
      background: {
        type: "image",
        value: "https://picsum.photos/1080/1921",
      },
      components: [
        {
          type: "Text",
          id: "text-1",
          content: "Slide 1",
          style: {
            color: "red",
            fontSize: "20px",
          },
          position: { x: 100, y: 200 },
        },
        {
          type: "Link",
          id: "link-1",
          content: "SELAM",
          style: {
            backgroundColor: "red",
            color: "white",
            width: "100px",
            height: "50px",
          },
          onClick: () => alert("HI"),
          position: { x: 0, y: 300 },
        },
      ],
    },
    {
      id: 2,
      background: {
        type: "image",
        value: "https://picsum.photos/1080/1920",
      },
      components: [
        {
          type: "Text",
          id: "text-2",
          content: "Another Slide",
          style: {
            color: "blue",
            fontSize: "18px",
          },
          position: { x: 50, y: 150 },
        },
        {
          type: "Link",
          id: "link-2",
          content: "Click Me",
          style: {
            backgroundColor: "green",
            color: "white",
            width: "80px",
            height: "40px",
          },
          onClick: () => alert("You clicked me!"),
          position: { x: 200, y: 400 },
        },
      ],
    },
    {
      id: 3,
      background: {
        type: "color",
        value: "white",
      },
      components: [
        {
          type: "Text",
          id: "text-4",
          content: "Slide 3",
          style: {
            color: "red",
            fontSize: "20px",
          },
          position: { x: 100, y: 200 },
        },
        {
          type: "Link",
          id: "link-1",
          content: "SELAM -3",
          style: {
            backgroundColor: "blue",
            color: "white",
            width: "100px",
            height: "50px",
          },
          onClick: () => alert("HI"),
          position: { x: 0, y: 300 },
        },
      ],
    },
  ];

  return (
    <div
      id="swiper-container"
      className="select-none h-dvh w-full sm:max-w-md mx-auto "
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

        {demoStories.map((story) => (
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
                const { type, id, content, style, position, onClick } =
                  component;
                switch (type) {
                  case "Text":
                    return (
                      <span
                        key={id}
                        style={{
                          ...style,
                          position: "absolute",
                          top: position.y,
                          left: position.x,
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
                          top: position.y,
                          left: position.x,
                        }}
                        onClick={onClick}
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
}
