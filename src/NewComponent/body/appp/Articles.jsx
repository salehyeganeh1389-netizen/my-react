import { useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import Select from "react-select";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

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
    image: "/file_00000000d58c820da9bfbc1b74d4fefb.png",
  },
  {
    id: 2,
    category: "شناخت پارچه",
    title: "پنبه یا لینن؛ کدام پارچه برای شما مناسب‌تر است؟",
    excerpt:
      "پنبه و لینن هر دو از الیاف طبیعی هستند، اما در لطافت، تنفس‌پذیری، بافت و کاربرد تفاوت‌هایی دارند.",
    date: "۲۴ شهریور ۱۴۰۵",
    time: "۴ دقیقه",
    image: "/file_00000000d58c820da9bfbc1b74d4fefb.png",
  },
  {
    id: 3,
    category: "پارچه‌شناسی",
    title: "چرا بافت پارچه در کیفیت لباس اهمیت دارد؟",
    excerpt:
      "ممکن است دو پارچه از نظر ظاهری شبیه باشند، اما نوع بافت آن‌ها کیفیت و تجربه متفاوتی ایجاد کند.",
    date: "۲۰ شهریور ۱۴۰۵",
    time: "۳ دقیقه",
    image: "/file_00000000d58c820da9bfbc1b74d4fefb.png",
  },
  {
    id: 4,
    category: "استایل",
    title: "چطور با انتخاب درست پارچه، لباس بهتری داشته باشیم؟",
    excerpt:
      "انتخاب درست جنس و رنگ پارچه می‌تواند روی ظاهر نهایی لباس و راحتی استفاده از آن تأثیر زیادی داشته باشد.",
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
  {
    id: 6,
    category: "راهنمای خرید",
    title: "قبل از خرید پارچه به چه نکاتی توجه کنیم؟",
    excerpt:
      "از لمس پارچه تا بررسی وزن، تراکم بافت و کاربرد نهایی؛ چند نکته ساده می‌تواند انتخاب شما را دقیق‌تر کند.",
    date: "۰۸ شهریور ۱۴۰۵",
    time: "۵ دقیقه",
    image: "/file_00000000d58c820da9bfbc1b74d4fefb.png",
  },
];

export default function Articles() {
  const pageRef = useRef(null);

  const [activeCategory, setActiveCategory] = useState("همه");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  /*
   * =========================================================
   * CATEGORIES
   * =========================================================
   */

  const categories = useMemo(() => {
    return [
      "همه",
      ...new Set(articles.map((article) => article.category)),
    ];
  }, []);

  /*
   * =========================================================
   * SELECT OPTIONS
   * =========================================================
   */

  const categoryOptions = categories.map((category) => ({
    value: category,
    label: category,
  }));

  const sortOptions = [
    {
      value: "newest",
      label: "جدیدترین مقالات",
    },
    {
      value: "oldest",
      label: "قدیمی‌ترین مقالات",
    },
    {
      value: "reading",
      label: "بیشترین زمان مطالعه",
    },
  ];

  /*
   * =========================================================
   * FILTER + SORT
   * =========================================================
   */

  const filteredArticles = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const result = articles.filter((article) => {
      const categoryMatch =
        activeCategory === "همه" ||
        article.category === activeCategory;

      const searchMatch =
        normalizedSearch === "" ||
        article.title.toLowerCase().includes(normalizedSearch) ||
        article.excerpt.toLowerCase().includes(normalizedSearch) ||
        article.category.toLowerCase().includes(normalizedSearch);

      return categoryMatch && searchMatch;
    });

    if (sort === "oldest") {
      return [...result].reverse();
    }

    if (sort === "reading") {
      return [...result].sort(
        (a, b) => parseInt(b.time) - parseInt(a.time)
      );
    }

    return result;
  }, [activeCategory, search, sort]);

  /*
   * =========================================================
   * FEATURED ARTICLES
   * فقط ۳ مقاله منتخب
   * =========================================================
   */

  const featuredArticles = articles.slice(0, 3);

  /*
   * =========================================================
   * SELECT STYLE
   * =========================================================
   */

  const selectStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: "44px",
      height: "44px",
      borderRadius: "10px",
      borderColor: state.isFocused ? "#17633f" : "#e3e0d9",
      backgroundColor: "#faf9f6",
      boxShadow: state.isFocused
        ? "0 0 0 3px rgba(23,99,63,0.08)"
        : "none",
      cursor: "pointer",
      transition: "all 0.25s ease",

      "&:hover": {
        borderColor: "#17633f",
      },
    }),

    valueContainer: (base) => ({
      ...base,
      padding: "0 12px",
    }),

    singleValue: (base) => ({
      ...base,
      color: "#444",
      fontSize: "10px",
      fontWeight: 500,
    }),

    placeholder: (base) => ({
      ...base,
      color: "#999",
      fontSize: "10px",
    }),

    menu: (base) => ({
      ...base,
      marginTop: "6px",
      borderRadius: "12px",
      overflow: "hidden",
      border: "1px solid #e5e2db",
      boxShadow: "0 18px 45px rgba(20,30,25,0.10)",
      zIndex: 100,
    }),

    menuList: (base) => ({
      ...base,
      padding: "6px",
    }),

    option: (base, state) => ({
      ...base,
      borderRadius: "8px",
      padding: "10px 12px",
      marginBottom: "2px",
      fontSize: "10px",
      cursor: "pointer",

      backgroundColor: state.isSelected
        ? "#17633f"
        : state.isFocused
        ? "#f2f6f3"
        : "white",

      color: state.isSelected ? "white" : "#555",

      transition: "all 0.2s ease",
    }),

    indicatorSeparator: () => ({
      display: "none",
    }),

    dropdownIndicator: (base) => ({
      ...base,
      color: "#999",
      paddingLeft: "10px",
    }),
  };

  /*
   * =========================================================
   * GSAP
   * =========================================================
   */

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /*
       * HERO IMAGE
       */

      gsap.fromTo(
        ".blog-hero-image",
        {
          opacity: 0,
          scale: 1.04,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
        }
      );

      /*
       * HERO SEARCH
       */

      gsap.fromTo(
        ".blog-search",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.25,
          ease: "power3.out",
        }
      );

      /*
       * GENERAL REVEAL
       */

      gsap.utils.toArray(".blog-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
              once: true,
            },
          }
        );
      });

      /*
       * ARTICLE CARDS
       */

      gsap.utils.toArray(".article-card").forEach((element, index) => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            delay: index * 0.04,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  /*
   * =========================================================
   * RESET
   * =========================================================
   */

  const resetFilters = () => {
    setSearch("");
    setActiveCategory("همه");
    setSort("newest");
  };

  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <main
      ref={pageRef}
      dir="rtl"
      className="min-h-screen bg-[#f7f6f2] text-[#20221f]"
    >
      {/* =====================================================
          HERO IMAGE
          فقط تصویر - بدون لایه سبز
      ===================================================== */}
<section className="relative h-[430px] overflow-hidden sm:h-[500px] lg:h-[560px]">
  <img
    src="/file_00000000d58c820da9bfbc1b74d4fefb.png"
    alt="مجله قماش شیخ الاسلامی"
    className="
      blog-hero-image
      absolute
      inset-0
      h-full
      w-full
      object-cover
    "
  />

  {/* لایه خیلی ملایم برای خوانایی متن */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

  <div className="relative z-10 flex h-full items-end">
    <div className="mx-auto w-full max-w-[1280px] px-5 pb-10 sm:px-8 sm:pb-14 lg:px-12 lg:pb-16">
      <div className="max-w-[760px] text-right">

        <span className="text-[9px] font-medium text-white/80">
          مجله قماش شیخ الاسلامی
        </span>

        <h1
          className="
            mt-3
            text-[26px]
            font-bold
            leading-[1.7]
            tracking-[-0.5px]
            text-white
            sm:text-[34px]
            lg:text-[40px]
          "
        >
          مجله قماش شیخ الاسلامی
        </h1>

        <p
          className="
            mt-3
            max-w-[620px]
            text-[10px]
            leading-8
            text-white/85
            sm:text-[11px]
          "
        >
          راهنمای انتخاب، شناخت و خرید پارچه؛ مطالب کاربردی
          برای انتخاب بهتر و آگاهانه‌تر.
        </p>

        {/* SEARCH */}

        <div className="blog-search mt-6 max-w-[540px]">
          <div
            className="
              flex
              h-[52px]
              items-center
              rounded-xl
              border
              border-white/20
              bg-white/95
              px-4
              shadow-[0_10px_30px_rgba(0,0,0,0.12)]
              transition-all
              duration-300
              focus-within:border-white
              focus-within:bg-white
            "
          >
            <i className="bi bi-search text-[14px] text-[#17633f]" />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="جستجوی مقاله..."
              className="
                mr-3
                w-full
                bg-transparent
                text-[11px]
                text-[#333]
                outline-none
                placeholder:text-[#aaa]
              "
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="پاک کردن جستجو"
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  text-[#aaa]
                  transition-colors
                  hover:bg-[#efeee9]
                  hover:text-[#17633f]
                "
              >
                <i className="bi bi-x-lg text-[10px]" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  </div>
</section>
```


      {/* =====================================================
          FEATURED ARTICLES
          یک کارت کوچک + یک اسلایدر داخل آن
      ===================================================== */}

      <section className="bg-[#f7f6f2]">
        <div className="mx-auto max-w-[1280px] px-5 py-12 sm:px-8 sm:py-14 lg:px-12">
          {/* TITLE */}

          <div className="blog-reveal mb-6 text-center">
            <span className="text-[9px] font-medium text-[#17633f]">
              انتخاب سردبیر
            </span>

            <h2 className="mt-2 text-[22px] font-bold sm:text-[25px]">
              مقالات منتخب
            </h2>
          </div>

          {/* SMALL FEATURED CARD */}

          <div
            className="
              blog-reveal
              mx-auto
              w-full
              max-w-[430px]
              overflow-hidden
              rounded-[18px]
              border
              border-[#e2dfd8]
              bg-white
              shadow-[0_18px_50px_rgba(20,30,25,0.07)]
            "
          >
            <Swiper
              modules={[Autoplay, Pagination]}
              slidesPerView={1}
              loop={true}
              speed={800}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                el: ".featured-pagination",
              }}
              className="featured-swiper"
            >
              {featuredArticles.map((article) => (
                <SwiperSlide key={article.id}>
                  <article className="group bg-white">
                    {/* IMAGE */}

                    <Link
                      to={`/articles/${article.id}`}
                      className="
                        relative
                        block
                        h-[215px]
                        overflow-hidden
                        bg-[#eee]
                      "
                    >
                      <img
                        src={article.image}
                        alt={article.title}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-[1000ms]
                          ease-out
                          group-hover:scale-[1.05]
                        "
                      />

                      {/* فقط یک گرادیان بسیار ملایم برای خوانایی متن */}

                      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />

                      <span
                        className="
                          absolute
                          right-4
                          top-4
                          rounded-lg
                          bg-white/95
                          px-3
                          py-2
                          text-[8px]
                          font-medium
                          text-[#17633f]
                          shadow-md
                        "
                      >
                        {article.category}
                      </span>
                    </Link>

                    {/* CONTENT */}

                    <div className="p-5">
                      <Link to={`/articles/${article.id}`}>
                        <h3
                          className="
                            text-[16px]
                            font-bold
                            leading-[1.9]
                            text-[#252725]
                            transition-colors
                            duration-300
                            group-hover:text-[#17633f]
                          "
                        >
                          {article.title}
                        </h3>
                      </Link>

                      <p className="mt-2.5 line-clamp-2 text-[10px] leading-7 text-[#85857f]">
                        {article.excerpt}
                      </p>

                      <div
                        className="
                          mt-4
                          flex
                          items-center
                          justify-between
                          border-t
                          border-[#eeeae3]
                          pt-4
                        "
                      >
                        <div className="flex items-center gap-2 text-[8px] text-[#aaa]">
                          <i className="bi bi-clock text-[#17633f]" />

                          <span>
                            زمان مطالعه: {article.time}
                          </span>
                        </div>

                        <span className="text-[8px] text-[#aaa]">
                          {article.date}
                        </span>
                      </div>
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* SWIPER DOTS */}

            <div className="featured-pagination flex min-h-[34px] items-center justify-center gap-1.5 pb-3 pt-1" />
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN ARTICLES
      ===================================================== */}

      <section className="mx-auto max-w-[1280px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        {/* TITLE */}

        <div className="blog-reveal flex items-end justify-between">
          <div>
            <span className="text-[9px] font-medium text-[#17633f]">
              مجله قماش
            </span>

            <h2 className="mt-2 text-[23px] font-bold sm:text-[28px]">
              مقالات
            </h2>
          </div>

          <span className="text-[9px] text-[#aaa]">
            {filteredArticles.length} مقاله
          </span>
        </div>

        {/* =================================================
            FILTER
        ================================================= */}

        <div
          className="
            blog-reveal
            mt-7
            rounded-2xl
            border
            border-[#e2dfd8]
            bg-white
            p-4
            shadow-[0_10px_35px_rgba(20,30,25,0.035)]
            sm:p-5
          "
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end">
            {/* SEARCH */}

            <div className="flex-1">
              <div className="mb-2.5 flex items-center gap-2">
                <i className="bi bi-search text-[10px] text-[#17633f]" />

                <span className="text-[9px] font-medium text-[#666]">
                  جستجوی مقاله
                </span>
              </div>

              <div
                className="
                  flex
                  h-[44px]
                  items-center
                  rounded-[10px]
                  border
                  border-[#e3e0d9]
                  bg-[#faf9f6]
                  px-3
                  transition-all
                  duration-300
                  focus-within:border-[#17633f]
                  focus-within:bg-white
                  focus-within:shadow-[0_0_0_3px_rgba(23,99,63,0.06)]
                "
              >
                <i className="bi bi-search text-[11px] text-[#17633f]" />

                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="عنوان، دسته‌بندی یا متن مقاله..."
                  className="
                    mr-2.5
                    w-full
                    bg-transparent
                    text-[10px]
                    text-[#444]
                    outline-none
                    placeholder:text-[#aaa]
                  "
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="text-[#aaa] transition-colors hover:text-[#17633f]"
                  >
                    <i className="bi bi-x-circle text-[11px]" />
                  </button>
                )}
              </div>
            </div>

            {/* CATEGORY */}

            <div className="w-full lg:w-[245px]">
              <div className="mb-2.5 flex items-center gap-2">
                <i className="bi bi-grid text-[10px] text-[#17633f]" />

                <span className="text-[9px] font-medium text-[#666]">
                  دسته‌بندی
                </span>
              </div>

              <Select
                value={categoryOptions.find(
                  (option) => option.value === activeCategory
                )}
                onChange={(option) =>
                  setActiveCategory(option?.value || "همه")
                }
                options={categoryOptions}
                styles={selectStyles}
                isSearchable={false}
                isRtl
                placeholder="انتخاب دسته‌بندی"
              />
            </div>

            {/* SORT */}

            <div className="w-full lg:w-[245px]">
              <div className="mb-2.5 flex items-center gap-2">
                <i className="bi bi-sort-down text-[10px] text-[#17633f]" />

                <span className="text-[9px] font-medium text-[#666]">
                  مرتب‌سازی
                </span>
              </div>

              <Select
                value={sortOptions.find(
                  (option) => option.value === sort
                )}
                onChange={(option) =>
                  setSort(option?.value || "newest")
                }
                options={sortOptions}
                styles={selectStyles}
                isSearchable={false}
                isRtl
                placeholder="مرتب‌سازی"
              />
            </div>
          </div>

          {/* FILTER FOOTER */}

          <div className="mt-5 flex flex-col gap-3 border-t border-[#eeeae3] pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-[9px] text-[#999]">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#f1f5f2] text-[#17633f]">
                <i className="bi bi-file-text text-[9px]" />
              </span>

              <span>
                {filteredArticles.length} مقاله نمایش داده می‌شود
              </span>

              {search && (
                <span className="text-[#17633f]">
                  برای «{search}»
                </span>
              )}
            </div>

            {(search ||
              activeCategory !== "همه" ||
              sort !== "newest") && (
              <button
                type="button"
                onClick={resetFilters}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  border
                  border-[#e3e0d9]
                  bg-[#faf9f6]
                  px-3
                  py-2
                  text-[9px]
                  font-medium
                  text-[#777]
                  transition-all
                  duration-300
                  hover:border-[#17633f]/30
                  hover:bg-[#f2f6f3]
                  hover:text-[#17633f]
                "
              >
                <i className="bi bi-arrow-counterclockwise text-[9px]" />

                پاک کردن فیلترها
              </button>
            )}
          </div>
        </div>

        {/* =================================================
            ARTICLE GRID
        ================================================= */}

        {filteredArticles.length > 0 ? (
          <div className="articles-grid mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="
                  article-card
                  group
                  overflow-hidden
                  rounded-[18px]
                  border
                  border-[#e2dfd8]
                  bg-white
                  transition-all
                  duration-500
                  hover:-translate-y-1.5
                  hover:shadow-[0_20px_55px_rgba(20,30,25,0.09)]
                "
              >
                {/* IMAGE */}

                <Link
                  to={`/articles/${article.id}`}
                  className="
                    relative
                    block
                    h-[245px]
                    overflow-hidden
                    bg-[#eee]
                  "
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    className="
                      h-full
                      w-full
                      object-cover
                      transition-transform
                      duration-[900ms]
                      ease-out
                      group-hover:scale-[1.06]
                    "
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                  <span
                    className="
                      absolute
                      right-4
                      top-4
                      rounded-lg
                      bg-white/95
                      px-3
                      py-2
                      text-[8px]
                      font-medium
                      text-[#17633f]
                      shadow-md
                    "
                  >
                    {article.category}
                  </span>

                  <div
                    className="
                      absolute
                      bottom-4
                      right-4
                      left-4
                      flex
                      items-center
                      justify-between
                      text-[8px]
                      text-white/85
                    "
                  >
                    <span>{article.date}</span>

                    <span className="rounded-full bg-black/25 px-2.5 py-1.5 backdrop-blur-md">
                      زمان مطالعه: {article.time}
                    </span>
                  </div>
                </Link>

                {/* CONTENT */}

                <div className="p-6">
                  <Link to={`/articles/${article.id}`}>
                    <h3
                      className="
                        text-[17px]
                        font-bold
                        leading-[1.9]
                        transition-colors
                        duration-300
                        group-hover:text-[#17633f]
                      "
                    >
                      {article.title}
                    </h3>
                  </Link>

                  <p className="mt-3 line-clamp-3 text-[11px] leading-7 text-[#7c7c77]">
                    {article.excerpt}
                  </p>

                  <div className="mt-6 border-t border-[#eeeae3] pt-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[8px] text-[#aaa]">
                        <i className="bi bi-clock text-[#17633f]" />

                        <span>
                          زمان مطالعه: {article.time}
                        </span>
                      </div>

                      <Link
                        to={`/articles/${article.id}`}
                        className="
                          flex
                          items-center
                          gap-2
                          text-[9px]
                          font-medium
                          text-[#17633f]
                        "
                      >
                        مشاهده بیشتر

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
                          <i className="bi bi-arrow-left text-[8px]" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="blog-reveal mt-7 rounded-2xl border border-dashed border-[#d8d4cc] bg-white py-24 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f2f3ef] text-[#17633f]">
              <i className="bi bi-search text-lg" />
            </div>

            <h3 className="mt-4 text-[13px] font-bold text-[#444]">
              مقاله‌ای پیدا نشد
            </h3>

            <p className="mt-2 text-[10px] text-[#999]">
              جستجو یا فیلتر انتخاب‌شده نتیجه‌ای نداشت.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="
                mt-5
                rounded-lg
                bg-[#17633f]
                px-5
                py-2.5
                text-[9px]
                font-medium
                text-white
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-lg
              "
            >
              پاک کردن فیلترها
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
