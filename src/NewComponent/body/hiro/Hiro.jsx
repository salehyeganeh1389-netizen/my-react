import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

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
  const [current, setCurrent] = useState(0);

  const currentRef = useRef(0);
  const slidesRef = useRef([]);
  const progressRef = useRef(null);

  const progressTweenRef = useRef(null);

  const isAnimating = useRef(false);
  const isHovered = useRef(false);

  const animateSlide = (nextIndex, direction = 1) => {
    if (isAnimating.current) return;

    const currentIndex = currentRef.current;

    if (currentIndex === nextIndex) return;

    const currentSlide = slidesRef.current[currentIndex];
    const nextSlide = slidesRef.current[nextIndex];

    if (!currentSlide || !nextSlide) return;

    isAnimating.current = true;

    /*
      Progress فعلی متوقف می‌شود
    */

    if (progressTweenRef.current) {
      progressTweenRef.current.kill();
    }

    const currentContent = currentSlide.querySelector(".slide-content");
    const nextContent = nextSlide.querySelector(".slide-content");

    const currentElements = currentContent.children;
    const nextElements = nextContent.children;

    /*
      اسلاید مقصد خارج از صفحه قرار می‌گیرد
    */

    gsap.set(nextSlide, {
      xPercent: direction === 1 ? 100 : -100,
      zIndex: 20,
      visibility: "visible",
    });

    gsap.set(currentSlide, {
      xPercent: 0,
      zIndex: 10,
    });

    /*
      متن اسلاید مقصد
    */

    gsap.set(nextElements, {
      opacity: 0,
      y: 35,
    });

    const tl = gsap.timeline({
      defaults: {
        overwrite: true,
      },

      onComplete: () => {
        /*
          اسلاید قبلی مخفی می‌شود
        */

        gsap.set(currentSlide, {
          xPercent: 0,
          zIndex: 0,
          visibility: "hidden",
        });

        /*
          اسلاید جدید فعال می‌شود
        */

        gsap.set(nextSlide, {
          xPercent: 0,
          zIndex: 10,
        });

        currentRef.current = nextIndex;
        setCurrent(nextIndex);

        isAnimating.current = false;
      },
    });

    /*
      خروج اسلاید فعلی
    */

    tl.to(
      currentSlide,
      {
        xPercent: direction === 1 ? -100 : 100,
        duration: 0.9,
        ease: "power4.inOut",
      },
      0
    );

    /*
      ورود اسلاید جدید
    */

    tl.to(
      nextSlide,
      {
        xPercent: 0,
        duration: 0.9,
        ease: "power4.inOut",
      },
      0
    );

    /*
      خروج متن قبلی
    */

    tl.to(
      currentElements,
      {
        opacity: 0,
        y: -25,
        duration: 0.3,
        stagger: 0.04,
        ease: "power2.in",
      },
      0
    );

    /*
      ورود متن جدید
    */

    tl.to(
      nextElements,
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: "power3.out",
      },
      0.35
    );
  };

  const nextSlide = () => {
    if (isAnimating.current) return;

    const nextIndex =
      currentRef.current === slides.length - 1
        ? 0
        : currentRef.current + 1;

    animateSlide(nextIndex, 1);
  };

  const prevSlide = () => {
    if (isAnimating.current) return;

    const prevIndex =
      currentRef.current === 0
        ? slides.length - 1
        : currentRef.current - 1;

    animateSlide(prevIndex, -1);
  };

  const goToSlide = (index) => {
    if (isAnimating.current) return;

    const currentIndex = currentRef.current;

    if (index === currentIndex) return;

    const direction = index > currentIndex ? 1 : -1;

    animateSlide(index, direction);
  };

  /*
    راه‌اندازی اولیه
  */

  useEffect(() => {
    const firstSlide = slidesRef.current[0];

    if (!firstSlide) return;

    gsap.set(firstSlide, {
      xPercent: 0,
      zIndex: 10,
      visibility: "visible",
    });

    /*
      بقیه اسلایدها مخفی
    */

    slidesRef.current.forEach((slide, index) => {
      if (index !== 0) {
        gsap.set(slide, {
          xPercent: 0,
          zIndex: 0,
          visibility: "hidden",
        });
      }
    });

    /*
      انیمیشن ورود متن اسلاید اول
    */

    const firstContent = firstSlide.querySelector(".slide-content");

    gsap.set(firstContent.children, {
      opacity: 0,
      y: 35,
    });

    gsap.to(firstContent.children, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
    });

    return () => {
      if (progressTweenRef.current) {
        progressTweenRef.current.kill();
      }
    };
  }, []);

  /*
    Progress Bar + Auto Play
    هر دو دقیقاً یک تایمر هستند.
  */

  useEffect(() => {
    if (!progressRef.current) return;

    if (progressTweenRef.current) {
      progressTweenRef.current.kill();
    }

    gsap.set(progressRef.current, {
      width: "0%",
    });

    progressTweenRef.current = gsap.to(progressRef.current, {
      width: "100%",
      duration: 6,
      ease: "none",

      onComplete: () => {
        if (!isHovered.current && !isAnimating.current) {
          nextSlide();
        }
      },
    });

    /*
      اگر هنگام ساخت Progress موس روی Hero باشد،
      Progress متوقف می‌شود.
    */

    if (isHovered.current) {
      progressTweenRef.current.pause();
    }

    return () => {
      if (progressTweenRef.current) {
        progressTweenRef.current.kill();
      }
    };
  }, [current]);

  /*
    توقف هنگام ورود موس
  */

  const handleMouseEnter = () => {
    isHovered.current = true;

    if (progressTweenRef.current) {
      progressTweenRef.current.pause();
    }
  };

  /*
    ادامه هنگام خروج موس
  */

  const handleMouseLeave = () => {
    isHovered.current = false;

    if (progressTweenRef.current) {
      progressTweenRef.current.resume();
    }
  };

  return (
    <section
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="
        relative
        h-[520px]
        w-full
        overflow-hidden
        bg-black
        sm:h-[580px]
        lg:h-[650px]
      "
      dir="rtl"
    >
      {/* ================= SLIDES ================= */}

      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            ref={(el) => {
              slidesRef.current[index] = el;
            }}
            className="
              absolute
              inset-0
              overflow-hidden
            "
          >
            {/* IMAGE */}

            <img
              src={slide.image}
              alt={slide.title.replace("\n", " ")}
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
              "
            />

            {/* DARK OVERLAY */}

            <div
              className="
                absolute
                inset-0
                bg-black/35
              "
            />

            {/* GRADIENT */}

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-l
                from-black/70
                via-black/25
                to-transparent
              "
            />

            {/* CONTENT */}

            <div
              className="
                slide-content
                absolute
                inset-0
                mx-auto
                flex
                h-full
                max-w-7xl
                items-center
                px-6
                sm:px-10
                lg:px-16
              "
            >
              <div className="max-w-[650px] text-white">
                <span
                  className="
                    mb-4
                    block
                    text-sm
                    font-medium
                    tracking-wide
                    text-white/80
                    sm:text-base
                  "
                >
                  {slide.smallTitle}
                </span>

                <h1
                  className="
                    whitespace-pre-line
                    text-4xl
                    font-bold
                    leading-[1.15]
                    sm:text-5xl
                    lg:text-7xl
                  "
                >
                  {slide.title}
                </h1>

                <p
                  className="
                    mt-5
                    max-w-[500px]
                    text-sm
                    leading-7
                    text-white/80
                    sm:text-base
                  "
                >
                  {slide.description}
                </p>

                <button
                  type="button"
                  className="
                    mt-7
                    rounded-full
                    bg-white
                    px-7
                    py-3
                    text-sm
                    font-bold
                    text-black
                    transition-all
                    duration-300
                    hover:bg-white/90
                    hover:px-9
                  "
                >
                  مشاهده محصولات
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= BOTTOM CONTROLS ================= */}

      <div
        className="
          absolute
          bottom-7
          left-0
          right-0
          z-50
          mx-auto
          flex
          max-w-7xl
          items-center
          justify-between
          px-6
          sm:px-10
          lg:px-16
        "
      >
        {/* PROGRESS */}

        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-white">
            {String(current + 1).padStart(2, "0")}
          </span>

          <div
            className="
              h-[2px]
              w-24
              overflow-hidden
              bg-white/30
              sm:w-40
            "
          >
            <div
              ref={progressRef}
              className="h-full w-0 bg-white"
            />
          </div>

          <span className="text-sm text-white/50">
            {String(slides.length).padStart(2, "0")}
          </span>
        </div>

        {/* ARROWS */}

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prevSlide}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
              border-white/30
              text-white
              transition-all
              duration-300
              hover:border-white
              hover:bg-white
              hover:text-black
            "
            aria-label="اسلاید قبلی"
          >
            ←
          </button>

          <button
            type="button"
            onClick={nextSlide}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
              border-white/30
              text-white
              transition-all
              duration-300
              hover:border-white
              hover:bg-white
              hover:text-black
            "
            aria-label="اسلاید بعدی"
          >
            →
          </button>
        </div>
      </div>

      {/* ================= SLIDE NUMBERS ================= */}

      <div
        className="
          absolute
          right-6
          top-1/2
          z-50
          hidden
          -translate-y-1/2
          flex-col
          gap-4
          lg:flex
        "
      >
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => goToSlide(index)}
            className={`
              text-xs
              transition-all
              duration-300
              ${
                current === index
                  ? "text-white"
                  : "text-white/40 hover:text-white"
              }
            `}
          >
            {String(index + 1).padStart(2, "0")}
          </button>
        ))}
      </div>
    </section>
  );
}












