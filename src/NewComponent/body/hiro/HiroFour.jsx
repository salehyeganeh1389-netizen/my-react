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
  const dotsRef = useRef([]);
  const [current, setCurrent] = useState(0);
  const [isHover, setIsHover] = useState(false);

  // =========================
  // DOTS
  // =========================

  const animateDots = (activeIndex) => {
    dotsRef.current.forEach((dot, index) => {
      if (!dot) return;

      gsap.killTweensOf(dot);

      if (index === activeIndex) {
        gsap.to(dot, {
          width: 34,
          scale: 1,
          opacity: 1,
          duration: 0.45,
          ease: "power3.out",
        });
      } else {
        gsap.to(dot, {
          width: 8,
          scale: 1,
          opacity: 0.45,
          duration: 0.35,
          ease: "power2.out",
        });
      }
    });
  };

  // =========================
  // SLIDE ANIMATION
  // =========================

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

  // =========================
  // SWIPER INIT
  // =========================

  const handleSwiper = (swiper) => {
    swiperRef.current = swiper;

    const index = swiper.realIndex;

    setCurrent(index);

    setTimeout(() => {
      animateSlide(swiper);
      animateDots(index);
    }, 50);
  };

  // =========================
  // SLIDE CHANGE
  // =========================

  const handleSlideChange = (swiper) => {
    const index = swiper.realIndex;

    setCurrent(index);

    animateSlide(swiper);
    animateDots(index);
  };

  // =========================
  // GO TO SLIDE
  // =========================

  const goToSlide = (index) => {
    swiperRef.current?.slideToLoop(index);
  };

  // =========================
  // NEXT / PREVIOUS
  // =========================

  const nextSlide = () => {
    swiperRef.current?.slideNext();
  };

  const prevSlide = () => {
    swiperRef.current?.slidePrev();
  };

  // =========================
  // HOVER
  // =========================

  const handleMouseEnter = () => {
    setIsHover(true);
    swiperRef.current?.autoplay?.pause();
  };

  const handleMouseLeave = () => {
    setIsHover(false);
    swiperRef.current?.autoplay?.resume();
  };

  // =========================
  // NEXT PREVIEW
  // =========================

  const nextIndex = (current + 1) % slides.length;
  const nextSlideData = slides[nextIndex];

  return (
    <section
      dir="rtl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="
        relative
        h-[580px]
        w-full
        overflow-hidden
        bg-[#111]

        sm:h-[620px]

        md:h-[680px]

        lg:h-[720px]

        xl:h-[760px]

        2xl:h-[800px]
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
        speed={2000}
        slidesPerView={1}
        grabCursor={true}
        allowTouchMove={true}
        autoplay={{
          delay: 4000,
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

              {/* IMAGE */}

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

              {/* OVERLAY */}

              <div
                className="
                  hero-overlay
                  absolute
                  inset-0
                  bg-gradient-to-l
                  from-black/90
                  via-black/50
                  to-black/15
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-black/15
                  sm:bg-black/10
                "
              />

              {/* ================= DECORATION ================= */}

              <div
                className="
                  hero-decoration
                  absolute
                  bottom-[15%]
                  left-[5%]
                  hidden
                  h-32
                  w-32
                  rounded-full
                  border
                  border-white/10
                  lg:block
                  lg:h-40
                  lg:w-40
                  xl:left-[8%]
                "
              />

              <div
                className="
                  absolute
                  bottom-[20%]
                  left-[10%]
                  hidden
                  h-16
                  w-16
                  rounded-full
                  border
                  border-white/10
                  lg:block
                  xl:left-[12%]
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
                  max-w-[1500px]
                  items-center
                  px-5

                  sm:px-8

                  md:px-10

                  lg:px-14

                  xl:px-20

                  2xl:px-24
                "
              >
                <div
                  className="
                    w-full
                    max-w-[680px]
                    text-white
                    [perspective:1000px]

                    sm:max-w-[700px]

                    lg:max-w-[760px]

                    xl:max-w-[820px]
                  "
                >
                  {/* SMALL TITLE */}

                  <div
                    className="
                      hero-small-title
                      mb-4
                      flex
                      items-center
                      gap-2.5

                      sm:mb-5
                      sm:gap-3

                      lg:mb-6
                    "
                  >
                    <span
                      className="
                        h-px
                        w-7
                        bg-white/90

                        sm:w-10

                        lg:w-12
                      "
                    />

                    <span
                      className="
                        text-[10px]
                        font-medium
                        tracking-[0.15em]
                        text-white/80

                        sm:text-xs

                        md:text-sm
                      "
                    >
                      {slide.smallTitle}
                    </span>
                  </div>

                  {/* TITLE */}

                  <h1
                    className="
                      hero-title
                      max-w-[600px]
                      whitespace-pre-line
                      text-[34px]
                      font-bold
                      leading-[1.12]
                      tracking-tight

                      min-[400px]:text-[38px]

                      sm:text-5xl
                      sm:leading-[1.08]

                      md:text-6xl

                      lg:text-[70px]

                      xl:text-[82px]

                      2xl:text-[90px]
                    "
                  >
                    {slide.title}
                  </h1>

                  {/* DESCRIPTION */}

                  <p
                    className="
                      hero-description
                      mt-5
                      max-w-[430px]
                      text-[12px]
                      leading-7
                      text-white/70

                      sm:mt-6
                      sm:max-w-[500px]
                      sm:text-sm
                      sm:leading-7

                      md:text-base
                      md:leading-8

                      lg:max-w-[550px]
                    "
                  >
                    {slide.description}
                  </p>

                  {/* BUTTONS */}

                  <div
                    className="
                      hero-buttons
                      mt-6
                      flex
                      flex-wrap
                      items-center
                      gap-2.5

                      sm:mt-8
                      sm:gap-3

                      md:mt-9
                    "
                  >
                    <button
                      type="button"
                      className="
                        group
                        flex
                        min-h-[42px]
                        items-center
                        gap-2
                        rounded-full
                        bg-white
                        px-5
                        py-2.5
                        text-[11px]
                        font-bold
                        text-black
                        transition-all
                        duration-500
                        hover:px-7

                        sm:min-h-[46px]
                        sm:px-6
                        sm:py-3
                        sm:text-xs

                        md:min-h-[50px]
                        md:px-7
                        md:text-sm
                      "
                    >
                      <span>مشاهده محصولات</span>

                      <span
                        className="
                          text-sm
                          transition-transform
                          duration-300
                          group-hover:-translate-x-1

                          sm:text-base
                        "
                      >
                        ←
                      </span>
                    </button>

                    <button
                      type="button"
                      className="
                        min-h-[42px]
                        rounded-full
                        border
                        border-white/30
                        bg-white/5
                        px-5
                        py-2.5
                        text-[11px]
                        text-white
                        backdrop-blur-md
                        transition-all
                        duration-300
                        hover:border-white/70
                        hover:bg-white/10

                        sm:min-h-[46px]
                        sm:px-6
                        sm:py-3
                        sm:text-xs

                        md:min-h-[50px]
                        md:px-7
                        md:text-sm
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

      {/* ================= PAGINATION ================= */}

      <div
        className="
          absolute
          bottom-5
          left-1/2
          z-30
          flex
          -translate-x-1/2
          items-center
          gap-2
          rounded-full
          border
          border-white/10
          bg-black/20
          px-3
          py-2
          backdrop-blur-xl

          sm:bottom-7
          sm:gap-2.5
          sm:px-4
          sm:py-2.5
        "
      >
        {[...slides].reverse().map((slide) => {
          const index = slides.findIndex(
            (item) => item.id === slide.id
          );

          return (
            <button
              key={slide.id}
              type="button"
              aria-label={`رفتن به اسلاید ${index + 1}`}
              onClick={() => goToSlide(index)}
              ref={(el) => {
                dotsRef.current[index] = el;
              }}
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-white
                opacity-45
                transition-none

                sm:h-2
                sm:w-2
              "
            />
          );
        })}
      </div>

      {/* ================================================= */}
      {/* LEFT SIDE CONTROLS                               */}
      {/* ================================================= */}

      <div
        className="
          absolute
          bottom-5
          left-5
          z-30
          flex
          items-center
          gap-2

          sm:bottom-7
          sm:left-8
          sm:gap-3

          lg:left-10
        "
      >
        {/* NEXT - سمت راست */}

        <button
          type="button"
          onClick={nextSlide}
          aria-label="اسلاید بعدی"
          className="
            group
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            border
            border-white/20
            bg-black/20
            text-sm
            text-white
            backdrop-blur-xl
            transition-all
            duration-300
            hover:border-white
            hover:bg-white
            hover:text-black

            sm:h-11
            sm:w-11

            md:h-12
            md:w-12
            md:text-lg
          "
        >
          <span className="transition-transform duration-300 group-hover:translate-x-0.5">
            →
          </span>
        </button>

        {/* PREVIOUS - سمت چپ */}

        <button
          type="button"
          onClick={prevSlide}
          aria-label="اسلاید قبلی"
          className="
            group
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            border
            border-white/20
            bg-black/20
            text-sm
            text-white
            backdrop-blur-xl
            transition-all
            duration-300
            hover:border-white
            hover:bg-white
            hover:text-black

            sm:h-11
            sm:w-11

            md:h-12
            md:w-12
            md:text-lg
          "
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-0.5">
            ←
          </span>
        </button>
      </div>

      {/* ================================================= */}
      {/* NEXT PREVIEW - RIGHT SIDE                        */}
      {/* ================================================= */}

      <div
        onClick={nextSlide}
        className="
          group
          absolute
          bottom-5
          right-5
          z-30
          hidden
          h-[82px]
          w-[140px]
          cursor-pointer
          overflow-hidden
          rounded-2xl
          border
          border-white/20
          bg-black/20
          shadow-2xl
          backdrop-blur-md

          sm:bottom-7
          sm:right-8
          sm:block
          sm:h-[92px]
          sm:w-[160px]

          md:h-[96px]
          md:w-[170px]

          lg:right-10
          lg:h-[105px]
          lg:w-[185px]
        "
      >
        {/* IMAGE */}

        <img
          src={nextSlideData.image}
          alt={nextSlideData.title.replace("\n", " ")}
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            transition-transform
            duration-700
            group-hover:scale-110
          "
        />

        {/* DARK OVERLAY */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-l
            from-black/80
            via-black/55
            to-black/25
          "
        />

        {/* CONTENT */}

        <div
          className="
            relative
            z-10
            flex
            h-full
            flex-col
            justify-center
            px-3
            text-right
            text-white

            sm:px-4
          "
        >
          <span
            className="
              text-[7px]
              font-medium
              tracking-wide
              text-white/55

              sm:text-[8px]

              lg:text-[9px]
            "
          >
            اسلاید بعدی
          </span>

          <span
            className="
              mt-0.5
              text-[8px]
              text-white/60

              sm:text-[9px]
            "
          >
            {nextSlideData.smallTitle}
          </span>

          <h3
            className="
              mt-0.5
              whitespace-pre-line
              text-[11px]
              font-bold
              leading-4

              sm:text-xs

              lg:text-sm
              lg:leading-5
            "
          >
            {nextSlideData.title}
          </h3>
        </div>

        {/* ARROW */}

        <div
          className="
            absolute
            bottom-2
            left-2
            z-20
            flex
            h-6
            w-6
            items-center
            justify-center
            rounded-full
            bg-white/15
            text-[10px]
            text-white
            backdrop-blur-md
            transition-all
            duration-300
            group-hover:scale-110
            group-hover:bg-white
            group-hover:text-black
          "
        >
          →
        </div>
      </div>

      {/* ================= HOVER STATE ================= */}

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
      />
    </section>
  );
}