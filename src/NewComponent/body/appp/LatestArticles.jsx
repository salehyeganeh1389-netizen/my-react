import { Link } from "react-router-dom";
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

gsap.registerPlugin(ScrollTrigger);

const articles = [
  {
    id: 1,
    category: "راهنمای انتخاب",
    title: "چطور پارچه مناسب برای لباس خود انتخاب کنیم؟",
    excerpt:
      "جنس، بافت، وزن و میزان تنفس‌پذیری از مهم‌ترین عواملی هستند که قبل از خرید پارچه باید به آن‌ها توجه کنید.",
    date: "۲۸ شهریور ۱۴۰۵",
    time: "۵ دقیقه",
    image: "/file_00000000d58c820da9bfbc1b74d4fefb.png",
  },
  {
    id: 2,
    category: "شناخت پارچه",
    title: "پنبه یا لینن؛ کدام پارچه برای شما مناسب‌تر است؟",
    excerpt:
      "پنبه و لینن هر دو از الیاف طبیعی هستند، اما در لطافت، تنفس‌پذیری و کاربرد تفاوت‌هایی دارند.",
    date: "۲۴ شهریور ۱۴۰۵",
    time: "۴ دقیقه",
    image: "/file_00000000d58c820da9bfbc1b74d4fefb.png",
  },
  {
    id: 3,
    category: "پارچه‌شناسی",
    title: "چرا بافت پارچه در کیفیت لباس اهمیت دارد؟",
    excerpt:
      "ممکن است دو پارچه از نظر ظاهری شبیه باشند، اما نوع بافت آن‌ها کیفیت متفاوتی ایجاد کند.",
    date: "۲۰ شهریور ۱۴۰۵",
    time: "۳ دقیقه",
    image: "/file_00000000d58c820da9bfbc1b74d4fefb.png",
  },
  {
    id: 4,
    category: "استایل",
    title: "چطور با انتخاب درست پارچه، لباس بهتری داشته باشیم؟",
    excerpt:
      "انتخاب درست جنس و رنگ پارچه می‌تواند روی ظاهر نهایی لباس و راحتی استفاده تأثیر زیادی داشته باشد.",
    date: "۱۶ شهریور ۱۴۰۵",
    time: "۴ دقیقه",
    image: "/file_00000000d58c820da9bfbc1b74d4fefb.png",
  },
];

export default function LatestArticles() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* =========================================
         HEADER
      ========================================= */

      gsap.fromTo(
        ".latest-articles-header",
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".latest-articles-section",
            start: "top 85%",
            once: true,
          },
        }
      );

      /* =========================================
         CARDS
      ========================================= */

      gsap.fromTo(
        ".latest-article-card",
        {
          opacity: 0,
          y: 35,
          scale: 0.97,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".latest-articles-slider",
            start: "top 88%",
            once: true,
          },
        }
      );

      /* =========================================
         IMAGES
      ========================================= */

      gsap.fromTo(
        ".latest-article-image",
        {
          scale: 1.08,
        },
        {
          scale: 1,
          duration: 0.8,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".latest-articles-slider",
            start: "top 88%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      dir="rtl"
      className="
        latest-articles-section
        overflow-hidden
        bg-[#f7f6f2]
        px-5
        py-16
        sm:px-8
        sm:py-20
        lg:px-12
        lg:py-24
        xl:px-16
      "
    >
      <div className="mx-auto max-w-[1500px]">

        {/* =========================================
            HEADER
        ========================================= */}

        <div
          className="
            latest-articles-header
            mb-10
            flex
            items-end
            justify-between
          "
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#17633f]" />

              <span className="text-[9px] font-medium text-[#17633f]">
                مجله قماش
              </span>
            </div>

            <h2
              className="
                mt-3
                text-[25px]
                font-bold
                tracking-[-0.5px]
                text-[#1d2722]
                sm:text-[30px]
              "
            >
              آخرین مقالات
            </h2>

            <p className="mt-2 text-[10px] leading-6 text-[#888]">
              جدیدترین مطالب و راهنماهای قماش شیخ الاسلامی
            </p>
          </div>
        </div>

        {/* =========================================
            SWIPER
        ========================================= */}

        <div className="latest-articles-slider relative">
          <Swiper
            modules={[Navigation, FreeMode]}
            navigation={{
              nextEl: ".latest-articles-next",
              prevEl: ".latest-articles-prev",
            }}
            freeMode={{
              enabled: true,
              momentum: true,
              momentumRatio: 0.8,
            }}
            grabCursor
            resistance
            resistanceRatio={0.7}
            watchSlidesProgress
            spaceBetween={16}
            slidesPerView={1.15}
            breakpoints={{
              480: {
                slidesPerView: 1.2,
                spaceBetween: 18,
              },

              640: {
                slidesPerView: 1.8,
                spaceBetween: 20,
              },

              768: {
                slidesPerView: 2.35,
                spaceBetween: 22,
              },

              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },

              1280: {
                slidesPerView: 4,
                spaceBetween: 24,
              },

              1536: {
                slidesPerView: 4,
                spaceBetween: 26,
              },
            }}
            className="!overflow-visible"
          >
            {/* =========================================
                ARTICLE CARDS
            ========================================= */}

            {articles.map((article) => (
              <SwiperSlide
                key={article.id}
                className="!h-auto"
              >
                <article
                  className="
                    latest-article-card
                    group
                    flex
                    h-full
                    flex-col
                    overflow-hidden
                    rounded-[24px]
                    border
                    border-[#e6e1d8]
                    bg-white
                    shadow-[0_10px_35px_rgba(27,45,36,0.055)]
                    transition-all
                    duration-500
                    hover:-translate-y-2
                    hover:border-[#17633f]/20
                    hover:shadow-[0_25px_60px_rgba(23,63,47,0.13)]
                  "
                >
                  {/* IMAGE */}

                  <Link
                    to={`/articles/${article.id}`}
                    className="block"
                  >
                    <div
                      className="
                        relative
                        h-[200px]
                        overflow-hidden
                        bg-[#eceae5]
                        sm:h-[210px]
                        lg:h-[215px]
                        xl:h-[225px]
                      "
                    >
                      <img
                        src={article.image}
                        alt={article.title}
                        loading="lazy"
                        className="
                          latest-article-image
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-[1200ms]
                          ease-out
                          group-hover:scale-[1.08]
                        "
                      />

                      {/* IMAGE GRADIENT */}

                      <div
                        className="
                          absolute
                          inset-0
                          bg-gradient-to-t
                          from-black/65
                          via-black/5
                          to-transparent
                        "
                      />

                      {/* CATEGORY */}

                      <span
                        className="
                          absolute
                          right-4
                          top-4
                          rounded-full
                          border
                          border-white/50
                          bg-white/90
                          px-3
                          py-1.5
                          text-[7px]
                          font-semibold
                          text-[#17633f]
                          shadow-[0_5px_20px_rgba(0,0,0,0.1)]
                          backdrop-blur-md
                        "
                      >
                        {article.category}
                      </span>

                      {/* READING TIME */}

                      <div
                        className="
                          absolute
                          bottom-4
                          left-4
                          flex
                          items-center
                          gap-1.5
                          rounded-full
                          border
                          border-white/20
                          bg-black/25
                          px-3
                          py-1.5
                          text-[7px]
                          text-white
                          backdrop-blur-md
                          transition-all
                          duration-300
                          group-hover:bg-[#17633f]/85
                        "
                      >
                        <i className="bi bi-clock text-[8px]" />

                        <span>
                          {article.time} مطالعه
                        </span>
                      </div>

                      {/* ARTICLE NUMBER */}

                      <span
                        className="
                          absolute
                          bottom-4
                          right-4
                          text-[8px]
                          font-medium
                          tracking-[3px]
                          text-white/60
                        "
                      >
                        0{article.id}
                      </span>
                    </div>
                  </Link>

                  {/* CONTENT */}

                  <div
                    className="
                      flex
                      min-h-[215px]
                      flex-1
                      flex-col
                      p-5
                      lg:p-6
                    "
                  >
                    {/* LABEL */}

                    <div className="mb-3 flex items-center gap-2">
                      <span className="h-[2px] w-7 rounded-full bg-[#bd9257]" />

                      <span className="text-[7px] font-medium text-[#bd9257]">
                        مجله قماش
                      </span>
                    </div>

                    {/* TITLE */}

                    <h3
                      className="
                        line-clamp-2
                        text-[14px]
                        font-bold
                        leading-[1.9]
                        text-[#202522]
                        transition-colors
                        duration-300
                        group-hover:text-[#17633f]
                        lg:text-[15px]
                      "
                    >
                      {article.title}
                    </h3>

                    {/* EXCERPT */}

                    <p
                      className="
                        mt-3
                        line-clamp-2
                        text-[9px]
                        leading-6
                        text-[#7d7d78]
                        lg:text-[9.5px]
                      "
                    >
                      {article.excerpt}
                    </p>

                    {/* FOOTER */}

                    <div
                      className="
                        mt-auto
                        flex
                        items-center
                        justify-between
                        border-t
                        border-[#eeeae3]
                        pt-4
                      "
                    >
                      {/* DATE */}

                      <div
                        className="
                          flex
                          items-center
                          gap-1.5
                          text-[7px]
                          text-[#aaa]
                        "
                      >
                        <i className="bi bi-calendar3 text-[8px] text-[#bd9257]" />

                        <span>
                          {article.date}
                        </span>
                      </div>

                      {/* READ */}

                      <Link
                        to={`/articles/${article.id}`}
                        className="
                          flex
                          items-center
                          gap-2
                          text-[8px]
                          font-semibold
                          text-[#17633f]
                          transition-all
                          duration-300
                        "
                      >
                        <span>
                          مطالعه مقاله
                        </span>

                        <span
                          className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-[#dedbd4]
                            bg-[#faf9f6]
                            transition-all
                            duration-300
                            group-hover:border-[#17633f]
                            group-hover:bg-[#17633f]
                            group-hover:text-white
                            group-hover:shadow-[0_6px_18px_rgba(23,99,63,0.2)]
                          "
                        >
                          <i className="bi bi-arrow-left text-[8px]" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* =========================================
              PREVIOUS
          ========================================= */}

          <button
            type="button"
            className="
              latest-articles-prev
              absolute
              -right-2
              top-1/2
              z-30
              flex
              h-10
              w-10
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-[#dedbd4]
              bg-white
              text-[#173a2c]
              shadow-[0_8px_25px_rgba(20,30,25,0.14)]
              transition-all
              duration-300
              hover:scale-110
              hover:bg-[#17633f]
              hover:text-white
              sm:-right-5
              sm:h-11
              sm:w-11
              [&.swiper-button-disabled]:pointer-events-none
              [&.swiper-button-disabled]:scale-75
              [&.swiper-button-disabled]:opacity-0
            "
            aria-label="مقالات قبلی"
          >
            <i className="bi bi-arrow-right text-[12px]" />
          </button>

          {/* =========================================
              NEXT
          ========================================= */}

          <button
            type="button"
            className="
              latest-articles-next
              absolute
              -left-2
              top-1/2
              z-30
              flex
              h-10
              w-10
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-[#dedbd4]
              bg-white
              text-[#173a2c]
              shadow-[0_8px_25px_rgba(20,30,25,0.14)]
              transition-all
              duration-300
              hover:scale-110
              hover:bg-[#17633f]
              hover:text-white
              sm:-left-5
              sm:h-11
              sm:w-11
              [&.swiper-button-disabled]:pointer-events-none
              [&.swiper-button-disabled]:opacity-40
            "
            aria-label="مقالات بعدی"
          >
            <i className="bi bi-arrow-left text-[12px]" />
          </button>
        </div>
      </div>
    </section>
  );
}