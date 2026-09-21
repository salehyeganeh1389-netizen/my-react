import { useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

const articles = [
  {
    id: 1,
    category: "راهنمای انتخاب",
    title: "چطور پارچه مناسب برای لباس خود انتخاب کنیم؟",
    excerpt:
      "جنس، بافت، وزن، میزان تنفس‌پذیری و کاربرد لباس از مهم‌ترین عواملی هستند که قبل از خرید پارچه باید به آن‌ها توجه کنید.",
    date: "۲۸ شهریور ۱۴۰۵",
    time: "۵ دقیقه",
    image:
      "/file_00000000d58c820da9bfbc1b74d4fefb.png",
  },
  {
    id: 2,
    category: "شناخت پارچه",
    title: "پنبه یا لینن؛ کدام پارچه برای شما مناسب‌تر است؟",
    excerpt:
      "پنبه و لینن هر دو از الیاف طبیعی هستند، اما در لطافت، تنفس‌پذیری، بافت و کاربرد تفاوت‌هایی دارند.",
    date: "۲۴ شهریور ۱۴۰۵",
    time: "۴ دقیقه",
    image:
      "/file_00000000d58c820da9bfbc1b74d4fefb.png",
  },
  {
    id: 3,
    category: "پارچه‌شناسی",
    title: "چرا بافت پارچه در کیفیت لباس اهمیت دارد؟",
    excerpt:
      "ممکن است دو پارچه از نظر ظاهری شبیه باشند، اما نوع بافت آن‌ها کیفیت و تجربه متفاوتی ایجاد کند.",
    date: "۲۰ شهریور ۱۴۰۵",
    time: "۳ دقیقه",
    image:
      "/file_00000000d58c820da9bfbc1b74d4fefb.png",
  },
  {
    id: 4,
    category: "استایل",
    title: "چطور با انتخاب درست پارچه، لباس بهتری داشته باشیم؟",
    excerpt:
      "انتخاب درست جنس و رنگ پارچه می‌تواند روی ظاهر نهایی لباس و راحتی استفاده از آن تأثیر زیادی داشته باشد.",
    date: "۱۶ شهریور ۱۴۰۵",
    time: "۴ دقیقه",
    image:
      "/file_00000000d58c820da9bfbc1b74d4fefb.png",
  },
  {
    id: 5,
    category: "نگهداری",
    title: "چطور از لباس‌های خود بهتر مراقبت کنیم؟",
    excerpt:
      "شست‌وشو، خشک‌کردن و نگهداری صحیح می‌تواند روی ظاهر و طول عمر پارچه و لباس تأثیر زیادی داشته باشد.",
    date: "۱۲ شهریور ۱۴۰۵",
    time: "۳ دقیقه",
    image:
      "/file_00000000d58c820da9bfbc1b74d4fefb.png",
  },
  {
    id: 6,
    category: "راهنمای خرید",
    title: "قبل از خرید پارچه به چه نکاتی توجه کنیم؟",
    excerpt:
      "از لمس پارچه تا بررسی وزن، تراکم بافت و کاربرد نهایی؛ چند نکته ساده می‌تواند انتخاب شما را دقیق‌تر کند.",
    date: "۰۸ شهریور ۱۴۰۵",
    time: "۵ دقیقه",
    image:
      "/file_00000000d58c820da9bfbc1b74d4fefb.png",
  },
];


const popularTopics = [
  {
    title: "انتخاب پارچه",
    count: "۱۲ مقاله",
    icon: "bi-scissors",
  },
  {
    title: "شناخت پارچه‌ها",
    count: "۹ مقاله",
    icon: "bi-layers",
  },
  {
    title: "راهنمای خرید",
    count: "۸ مقاله",
    icon: "bi-bag",
  },
  {
    title: "نگهداری لباس",
    count: "۶ مقاله",
    icon: "bi-heart",
  },
];

export default function Articles() {
  const pageRef = useRef(null);

  const [activeCategory, setActiveCategory] = useState("همه");
  const [search, setSearch] = useState("");

  const filteredArticles = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return articles.filter((article) => {
      const categoryMatch =
        activeCategory === "همه" ||
        article.category === activeCategory;

      const searchMatch =
        normalizedSearch === "" ||
        article.title.toLowerCase().includes(normalizedSearch) ||
        article.excerpt.toLowerCase().includes(normalizedSearch);

      return categoryMatch && searchMatch;
    });
  }, [activeCategory, search]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const heroTimeline = gsap.timeline();

      heroTimeline
        .fromTo(
          ".articles-hero-badge",
          {
            opacity: 0,
            y: 15,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          }
        )
        .fromTo(
          ".articles-hero-title",
          {
            opacity: 0,
            y: 35,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power4.out",
          },
          "-=0.25"
        )
        .fromTo(
          ".articles-hero-text",
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .fromTo(
          ".articles-search",
          {
            opacity: 0,
            y: 15,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.3"
        );

      gsap.utils.toArray(".premium-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 35,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          }
        );
      });

      const topicCards = gsap.utils.toArray(".topic-card");

      if (topicCards.length) {
        gsap.fromTo(
          topicCards,
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".topics-grid",
              start: "top 88%",
              once: true,
            },
          }
        );
      }

      const articleCards = gsap.utils.toArray(".article-card");

      if (articleCards.length) {
        gsap.fromTo(
          articleCards,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".articles-grid",
              start: "top 88%",
              once: true,
            },
          }
        );
      }
    }, pageRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <main
      ref={pageRef}
      dir="rtl"
      className="min-h-screen overflow-hidden bg-[#f7f6f2] text-[#20221f]"
    >
      {/* =====================================================
          HERO
      ===================================================== */}
<section className="relative overflow-hidden">

  {/* =========================
      Background Image
  ========================= */}

  <img
    src="/file_00000000d58c820da9bfbc1b74d4fefb.png"
    alt=""
    className="
      absolute
      inset-0
      h-full
      w-full
      object-cover
      object-center
    "
  />

  {/* =========================
      Dark Overlay
  ========================= */}

  <div className="absolute inset-0 bg-black/45" />

  {/* =========================
      Content
  ========================= */}

  <div
    className="
      relative
      mx-auto
      max-w-[1400px]
      px-5
      py-20
      sm:px-8
      sm:py-24
      lg:px-16
      lg:py-28
    "
  >
    <div className="max-w-[720px]">

      <div
        className="
          articles-hero-badge
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-white/20
          bg-black/20
          px-4
          py-2
          text-[9px]
          text-white/85
          backdrop-blur-md
        "
      >
        <span className="h-1.5 w-1.5 rounded-full bg-white" />

        مجله قماش شیخ الاسلامی
      </div>

      <h1
        className="
          articles-hero-title
          mt-7
          text-[32px]
          font-bold
          leading-[1.6]
          tracking-[-1px]
          text-white
          sm:text-[44px]
          lg:text-[54px]
        "
      >
        راهنمای انتخاب،
        <br />
        شناخت و خرید بهتر پارچه
      </h1>

      <p
        className="
          articles-hero-text
          mt-5
          max-w-[600px]
          text-[12px]
          leading-8
          text-white/80
          sm:text-[13px]
        "
      >
        مطالب کاربردی درباره انواع پارچه، روش تشخیص کیفیت،
        انتخاب مناسب برای لباس و نکاتی که قبل از خرید باید بدانید.
      </p>

      {/* =========================
          Search
      ========================= */}

      <div className="articles-search mt-9 max-w-[560px]">
        <div
          className="
            flex
            h-[58px]
            items-center
            rounded-2xl
            border
            border-white/10
            bg-white
            p-1.5
            shadow-[0_20px_50px_rgba(0,0,0,0.2)]
          "
        >
          <div className="flex flex-1 items-center gap-3 px-4">
            <i className="bi bi-search text-[14px] text-[#17633f]" />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="جستجو در مقالات..."
              className="
                w-full
                bg-transparent
                text-[11px]
                text-[#333]
                outline-none
                placeholder:text-[#aaa]
              "
            />
          </div>

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                text-[#999]
                transition-colors
                hover:bg-[#f3f3f0]
                hover:text-[#17633f]
              "
            >
              <i className="bi bi-x-lg text-[11px]" />
            </button>
          )}
        </div>
      </div>

    </div>
  </div>
</section>


      {/* =====================================================
          CATEGORIES
      ===================================================== */}

      {/* =====================================================
          FEATURED
      ===================================================== */}
       <section className="border-y border-[#e4e1da] bg-white">
        <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 lg:px-16 lg:py-16">
          <div className="premium-reveal mb-7">
            <span className="text-[9px] font-medium text-[#17633f]">
              موضوعات پرطرفدار
            </span>

            <h2 className="mt-2 text-[22px] font-bold">
              از کجا شروع کنیم؟
            </h2>
          </div>

          <div className="topics-grid grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {popularTopics.map((topic) => (
              <button
                key={topic.title}
                type="button"
                onClick={() => {
                  const categoryMap = {
                    "انتخاب پارچه": "راهنمای انتخاب",
                    "شناخت پارچه‌ها": "شناخت پارچه",
                    "راهنمای خرید": "راهنمای خرید",
                    "نگهداری لباس": "نگهداری",
                  };

                  const category = categoryMap[topic.title];

                  if (category) {
                    setActiveCategory(category);
                  }

                  window.scrollTo({
                    top: document.querySelector(".articles-grid")?.offsetTop - 100 || 0,
                    behavior: "smooth",
                  });
                }}
                className="topic-card group flex items-center justify-between rounded-xl border border-[#e5e2db] bg-[#faf9f6] p-5 text-right transition-all duration-300 hover:-translate-y-1 hover:border-[#17633f]/30 hover:bg-white hover:shadow-[0_12px_35px_rgba(20,30,25,0.07)]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf2ed] text-[#17633f] transition-all duration-300 group-hover:bg-[#17633f] group-hover:text-white">
                    <i className={`bi ${topic.icon}`} />
                  </div>

                  <div>
                    <h3 className="text-[11px] font-bold">
                      {topic.title}
                    </h3>

                    <p className="mt-1 text-[8px] text-[#aaa]">
                      {topic.count}
                    </p>
                  </div>
                </div>

                <i className="bi bi-arrow-left text-[12px] text-[#17633f] transition-transform duration-300 group-hover:-translate-x-1" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
        <div className="premium-reveal mb-8 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#17633f]" />

              <span className="text-[9px] font-medium text-[#17633f]">
                پیشنهاد مطالعه
              </span>
            </div>

            <h2 className="mt-3 text-[24px] font-bold tracking-[-0.5px] sm:text-[29px]">
              مقاله منتخب
            </h2>
          </div>

          <div className="hidden items-center gap-3 text-[9px] text-[#aaa] sm:flex">
            <span>جدیدترین مطلب</span>

            <span className="h-px w-8 bg-[#d9d6cf]" />
          </div>
        </div>

        <article className="premium-reveal group grid overflow-hidden rounded-[22px] border border-[#dfdcd5] bg-white shadow-[0_15px_60px_rgba(25,35,30,0.06)] lg:grid-cols-[1.08fr_0.92fr]">
          {/* Image */}

          <div className="relative min-h-[320px] overflow-hidden sm:min-h-[430px] lg:min-h-[480px]">
            <img
              src={articles[0].image}
              alt={articles[0].title}
              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.045]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/5" />

            <div className="absolute right-6 top-6">
              <span className="rounded-lg bg-white/95 px-3 py-2 text-[9px] font-medium text-[#17633f] shadow-lg">
                {articles[0].category}
              </span>
            </div>

            <div className="absolute bottom-6 right-6 left-6 flex items-end justify-between">
              <div>
                <span className="text-[8px] text-white/70">
                  آخرین بروزرسانی
                </span>

                <p className="mt-1 text-[10px] text-white">
                  {articles[0].date}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#17633f] shadow-xl transition-transform duration-500 group-hover:-translate-x-1">
                <i className="bi bi-arrow-left" />
              </div>
            </div>
          </div>

          {/* Content */}

          <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-12">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-[#aaa]">
                  مقاله منتخب
                </span>

                <span className="text-[9px] text-[#aaa]">
                  {articles[0].time} مطالعه
                </span>
              </div>

              <h3 className="mt-6 text-[24px] font-bold leading-[1.8] tracking-[-0.7px] sm:text-[31px]">
                {articles[0].title}
              </h3>

              <p className="mt-5 text-[12px] leading-8 text-[#777] sm:text-[13px]">
                {articles[0].excerpt}
              </p>

              <div className="mt-7 h-px bg-[#ece9e2]" />

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-[#f7f7f4] p-4">
                  <i className="bi bi-search text-[#17633f]" />

                  <p className="mt-2 text-[8px] text-[#888]">
                    راهنمای انتخاب
                  </p>
                </div>

                <div className="rounded-xl bg-[#f7f7f4] p-4">
                  <i className="bi bi-layers text-[#17633f]" />

                  <p className="mt-2 text-[8px] text-[#888]">
                    شناخت پارچه
                  </p>
                </div>

                <div className="rounded-xl bg-[#f7f7f4] p-4">
                  <i className="bi bi-check2-circle text-[#17633f]" />

                  <p className="mt-2 text-[8px] text-[#888]">
                    انتخاب بهتر
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="mt-9 flex w-full items-center justify-between rounded-xl bg-[#17633f] px-5 py-4 text-[10px] font-medium text-white transition-all duration-300 hover:bg-[#125333] hover:shadow-[0_10px_30px_rgba(23,99,63,0.2)]"
            >
              <span>مطالعه کامل مقاله</span>

              <i className="bi bi-arrow-left" />
            </button>
          </div>
        </article>
      </section>

      {/* =====================================================
          POPULAR TOPICS
      ===================================================== */}

     

      {/* =====================================================
          ARTICLES
      ===================================================== */}

      <section className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 sm:py-20 lg:px-16 lg:py-24">

     

        <div className="premium-reveal mb-9 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#17633f]" />

              <span className="text-[9px] font-medium text-[#17633f]">
                مجله قماش
              </span>
            </div>

            <h2 className="mt-3 text-[25px] font-bold sm:text-[30px]">
              آخرین مقالات
            </h2>
          </div>

          <span className="text-[9px] text-[#aaa]">
            {filteredArticles.length} مقاله
          </span>
        </div>

        {filteredArticles.length > 0 ? (
          <div className="articles-grid grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="article-card group overflow-hidden rounded-[18px] border border-[#e2dfd8] bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_55px_rgba(20,30,25,0.09)]"
              >
                {/* Image */}

                <div className="relative h-[245px] overflow-hidden bg-[#eee]">
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-80" />

                  <span className="absolute right-4 top-4 rounded-lg bg-white/95 px-3 py-2 text-[8px] font-medium text-[#17633f] shadow-md">
                    {article.category}
                  </span>

                  <div className="absolute bottom-4 right-4 left-4 flex items-center justify-between text-[8px] text-white/80">
                    <span>{article.date}</span>

                    <span className="rounded-full bg-black/20 px-2.5 py-1.5 backdrop-blur-md">
                      {article.time}
                    </span>
                  </div>
                </div>

                {/* Content */}

                <div className="p-6">
                  <h3 className="text-[17px] font-bold leading-[1.9] transition-colors duration-300 group-hover:text-[#17633f]">
                    {article.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-[11px] leading-7 text-[#7c7c77]">
                    {article.excerpt}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-[#eeeae3] pt-5">
                    <span className="text-[8px] text-[#aaa]">
                      قماش شیخ الاسلامی
                    </span>

                    <button
                      type="button"
                      className="flex items-center gap-2 text-[9px] font-medium text-[#17633f]"
                    >
                      مطالعه مقاله

                      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#dedbd4] transition-all duration-300 group-hover:border-[#17633f] group-hover:bg-[#17633f] group-hover:text-white">
                        <i className="bi bi-arrow-left text-[8px]" />
                      </span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="premium-reveal rounded-2xl border border-dashed border-[#d8d4cc] bg-white py-24 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f2f3ef] text-[#17633f]">
              <i className="bi bi-search text-lg" />
            </div>

            <p className="mt-4 text-[12px] text-[#888]">
              مقاله‌ای مطابق جستجوی شما پیدا نشد.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("همه");
              }}
              className="mt-4 text-[10px] font-medium text-[#17633f]"
            >
              پاک کردن فیلترها
            </button>
          </div>
        )}
      </section>

      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}

      <section className="px-5 pb-16 sm:px-8 lg:px-16 lg:pb-24">
        <div className="premium-reveal mx-auto max-w-[1400px] overflow-hidden rounded-[24px] bg-[#17633f]">
          <div className="relative px-7 py-12 text-center sm:px-12 sm:py-16">
            <div className="absolute -left-20 -top-20 h-52 w-52 rounded-full bg-white/5 blur-3xl" />

            <div className="absolute -bottom-24 -right-16 h-60 w-60 rounded-full bg-black/10 blur-3xl" />

            <div className="relative">
              <span className="text-[9px] font-medium text-white/60">
                قماش شیخ الاسلامی
              </span>

              <h2 className="mt-4 text-[23px] font-bold text-white sm:text-[30px]">
                حالا که بیشتر می‌دانید،
                <br className="sm:hidden" /> انتخاب کنید
              </h2>

              <p className="mx-auto mt-4 max-w-[500px] text-[11px] leading-7 text-white/65">
                مجموعه پارچه و پوشاک قماش شیخ الاسلامی را مشاهده کنید
                و محصول مناسب خود را پیدا کنید.
              </p>

              <button
                type="button"
                className="mt-7 inline-flex items-center gap-3 rounded-xl bg-white px-6 py-3.5 text-[10px] font-medium text-[#17633f] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                مشاهده محصولات

                <i className="bi bi-arrow-left" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}