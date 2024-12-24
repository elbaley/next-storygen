import { useSwiper } from "swiper/react";
export const PrevNextTapAreas = () => {
  const swiper = useSwiper();
  return (
    <>
      <div
        id="prev-area"
        slot="wrapper-start"
        className="absolute left-0 top-0 h-full w-[30%] bg-red-500/0  z-[6] active:bg-gradient-to-r from-black/10 to-black/0 "
        onClick={() => {
          swiper?.slidePrev();
        }}
      ></div>
      <div
        id="next-area"
        slot="wrapper-start"
        className="absolute right-0 z-[6] top-0 h-full w-[70%] bg-blue-500/0 "
        // onClick={() => swiper.slideNext()}
        onClick={() => {
          console.log("Trying slide next...");
          console.log(swiper);

          swiper.slideNext();
        }}
      ></div>
    </>
  );
};
