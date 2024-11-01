"use client";
import { cn } from "@/utils";
import Image from "next/image";
import { useState } from "react";
import { Swiper as SwiperObject } from "swiper";
import { Autoplay, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface Props {
  images: string[];
}

export const ProductImageSwiper = ({ images }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [swiper, setSwiper] = useState<SwiperObject>();

  return (
    <div className="sm:col-span-3 flex gap-3 flex-col-reverse lg:flex-row justify-end">
      <div className="flex shrink-0 gap-4 flex-row lg:flex-col justify-center lg:justify-start">
        {images.map((img, i) => (
          <Image
            key={img}
            src={`/images/products/${img}`}
            width={200}
            height={200}
            alt={`Product image: ${img}`}
            className={cn(
              "aspect-[4/3] w-40 object-cover rounded object-left-top",
              selectedIndex === i && "ring-2 ring-blue-500",
            )}
            onClick={() => swiper?.slideTo(i)}
          />
        ))}
      </div>
      <div className="overflow-hidden">
        <Swiper
          className="rounded"
          spaceBetween={10}
          autoplay={{ delay: 4000 }}
          mousewheel={true}
          modules={[Mousewheel, Autoplay]}
          onSwiper={(swiper) => setSwiper(swiper)}
          onSlideChange={(data) => setSelectedIndex(data.activeIndex)}
        >
          {images.map((img) => (
            <SwiperSlide key={img}>
              <Image
                src={`/images/products/${img}`}
                width={420}
                height={420}
                alt="Product image"
                className="rounded w-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
