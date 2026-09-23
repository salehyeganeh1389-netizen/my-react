import { Link } from "react-router-dom";
import { useLayoutEffect, useRef } from "react";
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
  {
    id: 5,
    category: "نگهداری",
    title: "چطور از لباس‌های خود بهتر مراقبت کنیم؟",
    excerpt:
      "شست‌وشو، خشک‌کردن و نگهداری صحیح می‌تواند روی ظاهر و طول عمر پارچه و لباس تأثیر زیادی داشته باشد.",
    date: "۱۲ شهریور ۱۴۰۵",
    time: "۳ دقیقه",
    image: "/file_00000000d58c820da9bfbc1b74d4fefb.png",
  },
];

export default function LatestArticles() {
  const sectionRef = useRef(null);

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
          duration: 0.45,
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
          y: 40,
          scale: 0.97,
          rotateX: 4,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.45,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".latest-articles-slider",
            start: "top 88%",
            once: true,
          },
        }
      );

      /* =========================================
         IMAGE REVEAL
      ========================================= */

      gsap.fromTo(
        ".latest-article-image",
        {
          scale: 1.06,
        },
        {
          scale: 1,
          duration: 0.65,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".latest-articles-slider",
            start: "top 88%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      dir="rtl"
      className="
        latest-articles-section
        overflow-hidden
        bg-[#f7f6f2]
        px-5
        py-16
        sm:px-8
        sm:py-20
        lg:px-16
        lg:py-24
      "
    >
      <div className="mx-auto max-w-[1400px]">

        {/* =========================================
            HEADER
        ========================================= */}

        <div
          className="
            latest-articles-header
            mb-9
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
                sm:text-[30px]
              "
            >
              آخرین مقالات
            </h2>

            <p className="mt-2 text-[10px] leading-6 text-[#888]">
              جدیدترین مطالب و راهنماهای قماش شیخ الاسلامی
            </p>
          </div>

          <Link
            to="/articles"
            className="
              hidden
              items-center
              gap-2
              text-[9px]
              font-medium
              text-[#17633f]
              transition-all
              duration-300
              hover:-translate-x-1
              sm:flex
            "
          >
            مشاهده همه مقالات

            <i className="bi bi-arrow-left" />
          </Link>
        </div>

        {/* =========================================
            ARTICLES SLIDER
        ========================================= */}

        <div
          className="
            latest-articles-slider
            relative
          "
          style={{ perspective: "1000px" }}
        >
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
            spaceBetween={16}
            slidesPerView={1.15}
            breakpoints={{
              480: {
                slidesPerView: 1.5,
                spaceBetween: 16,
              },

              640: {
                slidesPerView: 2,
                spaceBetween: 18,
              },

              768: {
                slidesPerView: 2.5,
                spaceBetween: 18,
              },

              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },

              1280: {
                slidesPerView: 4,
                spaceBetween: 20,
              },

              1536: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }}
            className="!overflow-visible"
          >
            {articles.map((article) => (
              <SwiperSlide
                key={article.id}
                className="!h-auto"
              >
                <article
                  className="
                    latest-article-card
                    group
                    h-full
                    overflow-hidden
                    rounded-[18px]
                    border
                    border-[#e2dfd8]
                    bg-white
                    transition-all
                    duration-500
                    hover:-translate-y-2
                    hover:border-[#17633f]/20
                    hover:shadow-[0_25px_60px_rgba(20,30,25,0.11)]
                  "
                >
                  {/* IMAGE */}

                  <Link to={`/articles/${article.id}`}>
                    <div
                      className="
                        relative
                        h-[190px]
                        overflow-hidden
                        bg-[#eee]
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
                          duration-[1000ms]
                          ease-out
                          group-hover:scale-[1.08]
                        "
                      />

                      {/* Gradient */}

                      <div
                        className="
                          absolute
                          inset-0
                          bg-gradient-to-t
                          from-black/45
                          via-transparent
                          to-transparent
                        "
                      />

                      {/* Category */}

                      <span
                        className="
                          absolute
                          right-3
                          top-3
                          rounded-lg
                          bg-white/95
                          px-2.5
                          py-1.5
                          text-[7px]
                          font-medium
                          text-[#17633f]
                          shadow-md
                          transition-transform
                          duration-500
                          group-hover:translate-y-[-2px]
                        "
                      >
                        {article.category}
                      </span>

                      {/* Time */}

                      <span
                        className="
                          absolute
                          bottom-3
                          left-3
                          rounded-full
                          bg-black/25
                          px-2.5
                          py-1.5
                          text-[7px]
                          text-white
                          backdrop-blur-md
                          transition-all
                          duration-500
                          group-hover:bg-[#17633f]/80
                        "
                      >
                        {article.time} مطالعه
                      </span>
                    </div>
                  </Link>

                  {/* CONTENT */}

                  <div className="p-5">

                    <h3
                      className="
                        line-clamp-2
                        text-[14px]
                        font-bold
                        leading-[1.9]
                        transition-colors
                        duration-300
                        group-hover:text-[#17633f]
                      "
                    >
                      {article.title}
                    </h3>

                    <p
                      className="
                        mt-3
                        line-clamp-2
                        text-[9px]
                        leading-6
                        text-[#7d7d78]
                      "
                    >
                      {article.excerpt}
                    </p>

                    <div
                      className="
                        mt-5
                        flex
                        items-center
                        justify-between
                        border-t
                        border-[#eeeae3]
                        pt-4
                      "
                    >
                      <span className="text-[7px] text-[#aaa]">
                        {article.date}
                      </span>

                      <Link
                        to={`/articles/${article.id}`}
                        className="
                          flex
                          items-center
                          gap-1.5
                          text-[8px]
                          font-medium
                          text-[#17633f]
                        "
                      >
                        مطالعه

                        <span
                          className="
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-[#dedbd4]
                            transition-all
                            duration-300
                            group-hover:border-[#17633f]
                            group-hover:bg-[#17633f]
                            group-hover:text-white
                          "
                        >
                          <i className="bi bi-arrow-left text-[7px]" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* =========================================
              PREV BUTTON
          ========================================= */}

          <button
            type="button"
            className="
              latest-articles-prev
              absolute
              -right-5
              top-1/2
              z-20
              hidden
              h-10
              w-10
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-[#dedbd4]
              bg-white
              text-[#333]
              shadow-md
              transition-all
              duration-300
              hover:bg-[#17633f]
              hover:text-white
              disabled:pointer-events-none
              disabled:opacity-0
              sm:flex
            "
            aria-label="مقالات قبلی"
          >
            <i className="bi bi-arrow-right text-[13px]" />
          </button>

          {/* =========================================
              NEXT BUTTON
          ========================================= */}

          <button
            type="button"
            className="
              latest-articles-next
              absolute
              -left-5
              top-1/2
              z-20
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
              text-[#333]
              shadow-md
              transition-all
              duration-300
              hover:bg-[#17633f]
              hover:text-white
              disabled:pointer-events-none
              disabled:opacity-40
              sm:flex
            "
            aria-label="مقالات بعدی"
          >
            <i className="bi bi-arrow-left text-[13px]" />
          </button>
        </div>

        {/* =========================================
            MOBILE ALL ARTICLES
        ========================================= */}

        <div className="mt-8 flex justify-center sm:hidden">
          <Link
            to="/articles"
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-[#dedbd4]
              bg-white
              px-5
              py-3
              text-[9px]
              font-medium
              text-[#17633f]
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-lg
            "
          >
            مشاهده همه مقالات

            <i className="bi bi-arrow-left" />
          </Link>
        </div>
      </div>
    </section>
  );
}