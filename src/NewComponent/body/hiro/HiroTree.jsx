
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCreative } from "swiper/modules";
import gsap from "gsap";

import "swiper/css";

const slides = [
  {
    id: 1,
    image: "/file_00000000d58c820da9bfbc1b74d4fefb.png",
    smallTitle: "کالکشن جدید",
    title: "استایل متفاوت،\nانتخاب متفاوت",
    description:
      "جدیدترین محصولات را با کیفیت بالا و طراحی خاص تجربه کنید.",
  },
  {
    id: 2,
    image: "/file_00000000d58c820da9bfbc1b74d4fefb.png",
    smallTitle: "پیشنهاد ویژه",
    title: "برای استایل\nخاص شما",
    description:
      "مجموعه‌ای از محصولات منتخب با طراحی مدرن و کیفیت عالی.",
  },
  {
    id: 3,
    image: "/file_00000000d58c820da9bfbc1b74d4fefb.png",
    smallTitle: "محبوب‌ترین‌ها",
    title: "انتخابی که\nبه چشم می‌آید",
    description:
      "محصولات محبوب مشتریان را از نزدیک ببینید و انتخاب کنید.",
  },
  {
    id: 4,
    image: "/file_00000000d58c820da9bfbc1b74d4fefb.png",
    smallTitle: "فصل جدید",
    title: "تازه‌ترین‌ها\nاینجاست",
    description:
      "جدیدترین محصولات مناسب فصل را در مجموعه ما پیدا کنید.",
  },
  {
    id: 5,
    image: "/file_00000000d58c820da9bfbc1b74d4fefb.png",
    smallTitle: "تخفیف ویژه",
    title: "فرصت را\nاز دست ندهید",
    description:
      "محصولات منتخب با شرایط ویژه برای مدت محدود.",
  },
];

export default function HeroSlider() {
  const swiperRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [isHover, setIsHover] = useState(false);

  const animateSlide = (swiper) => {
    const activeSlide = swiper.slides[swiper.activeIndex];

    if (!activeSlide) return;

    const image = activeSlide.querySelector(".hero-image");
    const overlay = activeSlide.querySelector(".hero-overlay");
    const content = activeSlide.querySelector(".hero-content");
    const smallTitle = activeSlide.querySelector(".hero-small-title");
    const title = activeSlide.querySelector(".hero-title");
    const description = activeSlide.querySelector(".hero-description");
    const buttons = activeSlide.querySelector(".hero-buttons");
    const decoration = activeSlide.querySelector(".hero-decoration");

    gsap.killTweensOf([
      image,
      overlay,
      content,
      smallTitle,
      title,
      description,
      buttons,
      decoration,
    ]);

    /*
      حالت اولیه
    */

    gsap.set(image, {
      scale: 1.18,
      xPercent: -3,
    });

    gsap.set(overlay, {
      opacity: 0.4,
    });

    gsap.set(content, {
      opacity: 1,
    });

    gsap.set(smallTitle, {
      opacity: 0,
      y: 30,
    });

    gsap.set(title, {
      opacity: 0,
      y: 70,
      rotateX: 25,
    });

    gsap.set(description, {
      opacity: 0,
      y: 35,
    });

    gsap.set(buttons, {
      opacity: 0,
      y: 30,
    });

    gsap.set(decoration, {
      opacity: 0,
      scale: 0.7,
      rotate: -15,
    });

    /*
      انیمیشن اصلی
    */

    const tl = gsap.timeline();

    tl.to(
      image,
      {
        scale: 1,
        xPercent: 0,
        duration: 2.2,
        ease: "power3.out",
      },
      0
    );

    tl.to(
      overlay,
      {
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
      },
      0
    );

    tl.to(
      smallTitle,
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
      },
      0.25
    );

    tl.to(
      title,
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        ease: "power4.out",
      },
      0.35
    );

    tl.to(
      description,
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
      },
      0.65
    );

    tl.to(
      buttons,
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
      },
      0.8
    );

    tl.to(
      decoration,
      {
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 1,
        ease: "back.out(1.7)",
      },
      0.6
    );
  };

  const handleSwiper = (swiper) => {
    swiperRef.current = swiper;

    setCurrent(swiper.realIndex);

    setTimeout(() => {
      animateSlide(swiper);
    }, 50);
  };

  const handleSlideChange = (swiper) => {
    setCurrent(swiper.realIndex);

    animateSlide(swiper);
  };

  const nextSlide = () => {
    swiperRef.current?.slideNext();
  };

  const prevSlide = () => {
    swiperRef.current?.slidePrev();
  };

  const handleMouseEnter = () => {
    setIsHover(true);
    swiperRef.current?.autoplay?.pause();
  };

  const handleMouseLeave = () => {
    setIsHover(false);
    swiperRef.current?.autoplay?.resume();
  };

  return (
    <section
      dir="rtl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="
        relative
        h-[520px]
        w-full
        overflow-hidden
        bg-[#111]
        sm:h-[600px]
        lg:h-[700px]
      "
    >
      {/* ================= SWIPER ================= */}

      <Swiper
        modules={[Autoplay, EffectCreative]}
        effect="creative"
        creativeEffect={{
          prev: {
            translate: ["-100%", 0, -1],
            opacity: 0.3,
          },
          next: {
            translate: ["100%", 0, 0],
            opacity: 0.3,
          },
        }}
        loop={true}
        speed={1100}
        slidesPerView={1}
        grabCursor={true}
        allowTouchMove={true}
        autoplay={{
          delay: 6500,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        onSwiper={handleSwiper}
        onSlideChange={handleSlideChange}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full overflow-hidden">
              {/* ================= IMAGE ================= */}

              <img
                src={slide.image}
                alt={slide.title.replace("\n", " ")}
                className="
                  hero-image
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                  will-change-transform
                "
              />

              {/* ================= OVERLAY ================= */}

              <div
                className="
                  hero-overlay
                  absolute
                  inset-0
                  bg-gradient-to-l
                  from-black/85
                  via-black/45
                  to-black/10
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-black/20
                "
              />

              {/* ================= DECORATION ================= */}

              <div
                className="
                  hero-decoration
                  absolute
                  bottom-[18%]
                  left-[8%]
                  hidden
                  h-40
                  w-40
                  rounded-full
                  border
                  border-white/10
                  lg:block
                "
              />

              <div
                className="
                  absolute
                  bottom-[22%]
                  left-[12%]
                  hidden
                  h-20
                  w-20
                  rounded-full
                  border
                  border-white/10
                  lg:block
                "
              />

              {/* ================= CONTENT ================= */}

              <div
                className="
                  hero-content
                  absolute
                  inset-0
                  mx-auto
                  flex
                  max-w-7xl
                  items-center
                  px-6
                  sm:px-10
                  lg:px-16
                "
              >
                <div
                  className="
                    max-w-[700px]
                    text-white
                    [perspective:1000px]
                  "
                >
                  {/* SMALL TITLE */}

                  <div
                    className="
                      hero-small-title
                      mb-5
                      flex
                      items-center
                      gap-3
                    "
                  >
                    <span
                      className="
                        h-[1px]
                        w-12
                        bg-white
                      "
                    />

                    <span
                      className="
                        text-xs
                        font-medium
                        tracking-[0.2em]
                        text-white/80
                        sm:text-sm
                      "
                    >
                      {slide.smallTitle}
                    </span>
                  </div>

                  {/* TITLE */}

                  <h1
                    className="
                      hero-title
                      whitespace-pre-line
                      text-4xl
                      font-bold
                      leading-[1.08]
                      tracking-tight
                      sm:text-6xl
                      lg:text-[82px]
                    "
                  >
                    {slide.title}
                  </h1>

                  {/* DESCRIPTION */}

                  <p
                    className="
                      hero-description
                      mt-6
                      max-w-[540px]
                      text-sm
                      leading-8
                      text-white/70
                      sm:text-base
                    "
                  >
                    {slide.description}
                  </p>

                  {/* BUTTONS */}

                  <div
                    className="
                      hero-buttons
                      mt-8
                      flex
                      items-center
                      gap-3
                    "
                  >
                    <button
                      type="button"
                      className="
                        group
                        flex
                        items-center
                        gap-3
                        rounded-full
                        bg-white
                        px-7
                        py-3.5
                        text-sm
                        font-bold
                        text-black
                        transition-all
                        duration-500
                        hover:px-9
                      "
                    >
                      مشاهده محصولات

                      <span
                        className="
                          transition-transform
                          duration-300
                          group-hover:-translate-x-1
                        "
                      >
                        ←
                      </span>
                    </button>

                    <button
                      type="button"
                      className="
                        rounded-full
                        border
                        border-white/30
                        bg-white/5
                        px-7
                        py-3.5
                        text-sm
                        text-white
                        backdrop-blur-md
                        transition-all
                        duration-300
                        hover:border-white/70
                        hover:bg-white/10
                      "
                    >
                      درباره ما
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ================= FLOATING CONTROL ================= */}

      <div
        className="
          absolute
          bottom-7
          left-6
          z-30
          flex
          items-center
          gap-3
          sm:left-10
        "
      >
        <button
          type="button"
          onClick={prevSlide}
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            border
            border-white/20
            bg-black/20
            text-lg
            text-white
            backdrop-blur-xl
            transition-all
            duration-300
            hover:border-white
            hover:bg-white
            hover:text-black
          "
        >
          ←
        </button>

        <button
          type="button"
          onClick={nextSlide}
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            border
            border-white/20
            bg-black/20
            text-lg
            text-white
            backdrop-blur-xl
            transition-all
            duration-300
            hover:border-white
            hover:bg-white
            hover:text-black
          "
        >
          →
        </button>
      </div>

      {/* ================= NEXT PREVIEW ================= */}

      <div
        onClick={nextSlide}
        className="
          group
          absolute
          bottom-7
          right-6
          z-30
          hidden
          h-[100px]
          w-[175px]
          cursor-pointer
          overflow-hidden
          rounded-2xl
          border
          border-white/20
          bg-black/20
          shadow-2xl
          backdrop-blur-sm
          sm:block
          lg:right-10
        "
      >
        <img
          src={slides[(current + 1) % slides.length].image}
          alt=""
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-700
            group-hover:scale-110
          "
        />

        <div
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            bg-black/40
          "
        >
          <div className="text-center text-white">
            <span className="block text-[10px] text-white/60">
              اسلاید بعدی
            </span>

            <span className="mt-1 block text-xs font-bold">
              {slides[(current + 1) % slides.length].smallTitle}
            </span>
          </div>
        </div>
      </div>

      {/* ================= PAUSE ================= */}

      <div
        className={`
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          z-40
          -translate-x-1/2
          -translate-y-1/2
          transition-all
          duration-500
          ${
            isHover
              ? "scale-100 opacity-100"
              : "scale-75 opacity-0"
          }
        `}
      >
        <div
          className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-full
            border
            border-white/20
            bg-black/20
            text-xs
            tracking-widest
            text-white
            backdrop-blur-xl
          "
        >
          II
        </div>
      </div>
    </section>
  );
}