import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

import { Link } from "react-router-dom";

import "swiper/css";

gsap.registerPlugin(ScrollTrigger);

const API_URL = "http://localhost:5000/api/products";

/* =====================================================
   PRODUCT CATEGORIES
===================================================== */

const productCategories = [
  // =========================
  // پارچه
  // =========================

  {
    id: "chadori",
    title: "پارچه چادری",
    subtitle: "مشکی و رنگی",
    type: "fabric",
  },
  {
    id: "shanton",
    title: "پارچه شانتون",
    subtitle: "ساده و طرح‌دار زنانه",
    type: "fabric",
  },
  {
    id: "satin",
    title: "پارچه ساتن",
    subtitle: "ساتن زنانه",
    type: "fabric",
  },
  {
    id: "kodari",
    title: "پارچه کودری",
    subtitle: "نخی و مناسب چادر نماز",
    type: "fabric",
  },
  {
    id: "crepe",
    title: "کرپ",
    subtitle: "مشکی و رنگی",
    type: "fabric",
  },
  {
    id: "shirt-fabric",
    title: "پارچه پیراهنی",
    subtitle: "نخی و طرح‌دار",
    type: "fabric",
  },
  {
    id: "fustian",
    title: "فاستونی",
    subtitle: "مردانه و کارخانه‌ای",
    type: "fabric",
  },
  {
    id: "bedsheet",
    title: "ملحفه",
    subtitle: "کتان و نخی",
    type: "fabric",
  },
  {
    id: "hotel-sheet",
    title: "ملافه هتلی",
    subtitle: "نخ پنبه و ایرانی",
    type: "fabric",
  },
  {
    id: "curtain",
    title: "پرده",
    subtitle: "حریر و پشت‌پرده‌ای",
    type: "fabric",
  },
  {
    id: "sofa-shawl",
    title: "شال مبل",
    subtitle: "بافتنی و یک‌نفره",
    type: "fabric",
  },
  {
    id: "bazmak",
    title: "بزمک",
    subtitle: "۱۰۰٪ پنبه و آبگیر",
    type: "fabric",
  },
  {
    id: "thin-bedding",
    title: "روتختی نازک",
    subtitle: "یک‌نفره و دونفره",
    type: "fabric",
  },
  {
    id: "quilt-bedding",
    title: "روتختی و لحاف",
    subtitle: "یک‌نفره و دونفره",
    type: "fabric",
  },

  // =========================
  // پوشاک
  // =========================

  {
    id: "tshirt",
    title: "تیشرت",
    subtitle: "یقه گرد مردانه",
    type: "clothing",
  },
  {
    id: "polo-shirt",
    title: "پولوشرت",
    subtitle: "جودون و پنبه‌ای",
    type: "clothing",
  },
  {
    id: "blouse",
    title: "بلوز",
    subtitle: "آستین بلند مردانه",
    type: "clothing",
  },
  {
    id: "knitwear",
    title: "بافت",
    subtitle: "مردانه و زنانه",
    type: "clothing",
  },
  {
    id: "pants",
    title: "شلوار",
    subtitle: "راحتی و ورزشی",
    type: "clothing",
  },
  {
    id: "shorts",
    title: "شورت",
    subtitle: "پادار و اسلیپ",
    type: "clothing",
  },
  {
    id: "undershirt",
    title: "زیرپوش",
    subtitle: "آستین‌دار و رکابی",
    type: "clothing",
  },
  {
    id: "bathrobe",
    title: "حوله لباسی",
    subtitle: "یزدی و تبریزی",
    type: "clothing",
  },
  {
    id: "bath-towel",
    title: "حمام",
    subtitle: "حوله حمامی بزرگ",
    type: "clothing",
  },
  {
    id: "pool-towel",
    title: "استخری",
    subtitle: "دو رو نخ تبریزی",
    type: "clothing",
  },
  {
    id: "hand-towel",
    title: "دستی",
    subtitle: "تبریزی و مخملی",
    type: "clothing",
  },
  {
    id: "kids-towel",
    title: "کودک",
    subtitle: "سایز ۸۰ تا ۱۱۰",
    type: "clothing",
  },
  {
    id: "towel-set",
    title: "سرویس حوله",
    subtitle: "سرویس عروس و داماد",
    type: "clothing",
  },
];

/* =====================================================
   MAIN COMPONENT
===================================================== */

export default function ProductCategories() {
  const sectionRef = useRef(null);

  const [apiProducts, setApiProducts] = useState([]);

  const fabricCategories = productCategories.filter(
    (category) => category.type === "fabric"
  );

  const clothingCategories = productCategories.filter(
    (category) => category.type === "clothing"
  );

  /* =====================================================
     GET PRODUCTS
  ===================================================== */

  useEffect(() => {
    let isMounted = true;

    async function getProducts() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Products not found");
        }

        const data = await response.json();

        if (isMounted && Array.isArray(data)) {
          setApiProducts(data);
        }
      } catch (error) {
        console.error("Product API Error:", error);

        if (isMounted) {
          setApiProducts([]);
        }
      }
    }

    getProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  /* =====================================================
     NORMALIZE CATEGORY
  ===================================================== */

  const normalizeCategory = (value) => {
    if (value === undefined || value === null) {
      return "";
    }

    return String(value)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-");
  };

  /* =====================================================
     GET CATEGORY IMAGE
  ===================================================== */

  const getCategoryImage = (categoryId) => {
    const normalizedId = normalizeCategory(categoryId);

    const product = apiProducts.find((item) => {
      const productCategory = normalizeCategory(item.category);

      return (
        productCategory === normalizedId ||
        productCategory.includes(normalizedId) ||
        normalizedId.includes(productCategory)
      );
    });

    return product?.image || "";
  };

  /* =====================================================
     CATEGORY DATA + IMAGE
  ===================================================== */

  const fabricCategoriesWithImages = fabricCategories.map(
    (category) => ({
      ...category,
      image: getCategoryImage(category.id),
    })
  );

  const clothingCategoriesWithImages = clothingCategories.map(
    (category) => ({
      ...category,
      image: getCategoryImage(category.id),
    })
  );

  /* =====================================================
     BEST SELLING PRODUCTS
  ===================================================== */

  const bestSellingProducts = [...apiProducts]
    .sort(
      (a, b) =>
        (Number(b.rating?.rate) || 0) -
        (Number(a.rating?.rate) || 0)
    )
    .slice(0, 6);

  /* =====================================================
     LATEST PRODUCTS
  ===================================================== */

  const latestProducts = [...apiProducts]
    .sort(
      (a, b) =>
        Number(b.id || 0) - Number(a.id || 0)
    )
    .slice(0, 6);

  /* =====================================================
     GSAP SCROLL ANIMATIONS
  ===================================================== */

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* =========================================
         MAIN TITLE
      ========================================= */

      gsap.fromTo(
        ".categories-main-title",
        {
          opacity: 0,
          y: 30,
          clipPath: "inset(0 100% 0 0)",
        },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0% 0 0)",
          duration: 0.85,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: ".categories-main-title",
            start: "top 88%",
            once: true,
          },
        }
      );

      /* =========================================
         CATEGORY SECTIONS
      ========================================= */

      gsap.utils
        .toArray(".category-section")
        .forEach((section) => {
          const header =
            section.querySelector(".category-header");

          const cards =
            section.querySelectorAll(".category-card");

          const images =
            section.querySelectorAll(
              ".category-card-image"
            );

          if (header) {
            gsap.fromTo(
              header,
              {
                opacity: 0,
                x: 25,
              },
              {
                opacity: 1,
                x: 0,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: section,
                  start: "top 88%",
                  once: true,
                },
              }
            );
          }

          if (cards.length) {
            gsap.fromTo(
              cards,
              {
                opacity: 0,
                y: 35,
                scale: 0.96,
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.75,
                stagger: 0.06,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: section,
                  start: "top 82%",
                  once: true,
                },
              }
            );
          }

          if (images.length) {
            gsap.fromTo(
              images,
              {
                scale: 1.12,
              },
              {
                scale: 1,
                duration: 1.1,
                stagger: 0.06,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: section,
                  start: "top 82%",
                  once: true,
                },
              }
            );
          }
        });

      /* =========================================
         PRODUCT SHOWCASE
      ========================================= */

      gsap.utils
        .toArray(".product-showcase-section")
        .forEach((section) => {
          const header =
            section.querySelector(
              ".product-showcase-header"
            );

          const cards =
            section.querySelectorAll(
              ".showcase-product-card"
            );

          if (header) {
            gsap.fromTo(
              header,
              {
                opacity: 0,
                y: 25,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: section,
                  start: "top 85%",
                  once: true,
                },
              }
            );
          }

          if (cards.length) {
            gsap.fromTo(
              cards,
              {
                opacity: 0,
                y: 35,
                scale: 0.97,
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.7,
                stagger: 0.07,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: section,
                  start: "top 80%",
                  once: true,
                },
              }
            );
          }
        });

      /* =========================================
         BANNERS
      ========================================= */

      gsap.utils
        .toArray(".categories-middle-banner")
        .forEach((banner) => {
          gsap.fromTo(
            banner,
            {
              opacity: 0,
              y: 35,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: banner,
                start: "top 85%",
                once: true,
              },
            }
          );
        });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [apiProducts]);

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <section
      ref={sectionRef}
      dir="rtl"
      className="
        mx-auto
        w-full
        max-w-[1650px]
        overflow-hidden
        px-3
        py-10
        sm:px-5
        sm:py-14
        md:px-6
        lg:py-20
        xl:px-8
      "
    >
      {/* =========================================
          MAIN TITLE
      ========================================= */}

      <div className="categories-main-title mb-8 sm:mb-10 lg:mb-12">
        <h2
          className="
            text-[21px]
            font-bold
            text-[#173a2c]
            sm:text-[27px]
            lg:text-[30px]
          "
        >
          دسته‌بندی محصولات
        </h2>

        <p
          className="
            mt-2
            text-[10px]
            text-[#999]
            sm:text-[12px]
            lg:text-[13px]
          "
        >
          مجموعه‌ای از محصولات قماش شیخ الاسلامی
        </p>
      </div>

      {/* =========================================
          FABRIC
      ========================================= */}

      <div className="category-section">
        <CategorySection
          title="پارچه"
          subtitle="انواع پارچه برای کاربردهای مختلف"
          items={fabricCategoriesWithImages}
          type="fabric"
        />
      </div>

      {/* =========================================
          CLOTHING
      ========================================= */}

      <div className="category-section mt-14 sm:mt-20 lg:mt-24">
        <CategorySection
          title="پوشاک"
          subtitle="انواع پوشاک و محصولات حوله‌ای"
          items={clothingCategoriesWithImages}
          type="clothing"
        />
      </div>

      {/* =========================================
          MIDDLE BANNER
      ========================================= */}

      <MiddleBanner />

      {/* =========================================
          BEST SELLING
      ========================================= */}

      <ProductShowcase
        title="پرفروش‌ترین محصولات"
        subtitle="محصولاتی که بیشتر مورد توجه قرار گرفته‌اند"
        products={bestSellingProducts}
        linkText="مشاهده همه محصولات"
        link="/products"
      />

      {/* =========================================
          SHOP BANNER
      ========================================= */}

      <ShopBanner />

      {/* =========================================
          LATEST
      ========================================= */}

      <ProductShowcase
        title="آخرین محصولات"
        subtitle="تازه‌ترین محصولاتی که به مجموعه فروشگاه اضافه شده‌اند"
        products={latestProducts}
        linkText="مشاهده محصولات"
        link="/products"
      />
    </section>
  );
}

/* =====================================================
   CATEGORY SECTION
===================================================== */

function CategorySection({
  title,
  subtitle,
  items,
  type,
}) {
  const swiperRef = useRef(null);
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);

  /* =====================================================
     UPDATE BUTTONS
  ===================================================== */

  const updateNavigation = (swiper) => {
    if (!swiper) return;

    const prevButton = prevButtonRef.current;
    const nextButton = nextButtonRef.current;

    if (prevButton) {
      prevButton.disabled = swiper.isBeginning;

      gsap.to(prevButton, {
        opacity: swiper.isBeginning ? 0.35 : 1,
        duration: 0.2,
      });
    }

    if (nextButton) {
      nextButton.disabled = swiper.isEnd;

      gsap.to(nextButton, {
        opacity: swiper.isEnd ? 0.35 : 1,
        duration: 0.2,
      });
    }
  };

  /* =====================================================
     GSAP SLIDE ANIMATION
  ===================================================== */

  const animateSlide = (swiper, direction = 1) => {
    if (!swiper) return;

    const activeIndex = swiper.activeIndex;

    const currentSlide =
      swiper.slides?.[activeIndex];

    if (!currentSlide) return;

    const card =
      currentSlide.querySelector(".category-card");

    const image =
      currentSlide.querySelector(
        ".category-card-image"
      );

    if (!card) return;

    gsap.killTweensOf([card, image]);

    const fromX = direction > 0 ? 35 : -35;

    gsap.fromTo(
      card,
      {
        opacity: 0.65,
        x: fromX,
        scale: 0.97,
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.55,
        ease: "power3.out",
      }
    );

    if (image) {
      gsap.fromTo(
        image,
        {
          scale: 1.08,
        },
        {
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
        }
      );
    }
  };

  /* =====================================================
     SWIPER READY
  ===================================================== */

  const handleSwiper = (swiper) => {
    swiperRef.current = swiper;

    requestAnimationFrame(() => {
      updateNavigation(swiper);
    });
  };

  /* =====================================================
     PREV
  ===================================================== */

  const handlePrev = () => {
    const swiper = swiperRef.current;

    if (!swiper || swiper.destroyed) return;

    if (swiper.isBeginning) return;

    animateSlide(
      {
        ...swiper,
        activeIndex: Math.max(
          swiper.activeIndex - 1,
          0
        ),
        slides: swiper.slides,
      },
      -1
    );

    swiper.slidePrev(650);
  };

  /* =====================================================
     NEXT
  ===================================================== */

  const handleNext = () => {
    const swiper = swiperRef.current;

    if (!swiper || swiper.destroyed) return;

    if (swiper.isEnd) return;

    swiper.slideNext(650);
  };

  return (
    <div>
      {/* =========================================
          HEADER
      ========================================= */}

      <div
        className="
          category-header
          mb-5
          flex
          items-end
          gap-3
          sm:mb-6
        "
      >
        <div className="min-w-0">
          <h3
            className="
              text-[17px]
              font-bold
              text-[#222]
              sm:text-[20px]
              lg:text-[22px]
            "
          >
            {title}
          </h3>

          <p
            className="
              mt-1
              text-[10px]
              text-[#999]
              sm:mt-1.5
              sm:text-[12px]
            "
          >
            {subtitle}
          </p>
        </div>

        <Link
          to={`/products/${type}`}
          className="
            group
            mr-auto
            flex
            shrink-0
            items-center
            gap-1.5
            text-[10px]
            font-medium
            text-[#555]
            transition-colors
            duration-300
            hover:text-[#166534]
            sm:gap-2
            sm:text-[12px]
          "
        >
          مشاهده همه

          <i
            className="
              bi
              bi-arrow-left
              text-[11px]
              transition-transform
              duration-300
              group-hover:-translate-x-1
              sm:text-[12px]
            "
          />
        </Link>
      </div>

      {/* =========================================
          SLIDER
      ========================================= */}

      <div className="relative px-1 sm:px-0">
        <Swiper
          modules={[FreeMode]}
          onSwiper={handleSwiper}
          onSlideChange={(swiper) => {
            updateNavigation(swiper);
            animateSlide(swiper, 1);
          }}
          onTransitionEnd={(swiper) => {
            updateNavigation(swiper);
          }}
          onResize={(swiper) => {
            updateNavigation(swiper);
          }}
          slidesPerView="auto"
          spaceBetween={12}
          speed={650}
          grabCursor={true}
          resistance={true}
          resistanceRatio={0.65}
          watchOverflow={false}
          freeMode={false}
          className="
            !overflow-visible
            !pb-3
          "
        >
          {items.map((item, index) => (
            <SwiperSlide
              key={item.id}
              className="
                !w-[210px]
                min-[400px]:!w-[225px]
                sm:!w-[245px]
                md:!w-[255px]
                lg:!w-[265px]
                xl:!w-[270px]
                2xl:!w-[275px]
              "
            >
              <CategoryCard
                item={item}
                index={index}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* =========================================
            PREVIOUS BUTTON
        ========================================= */}

        <button
          ref={prevButtonRef}
          type="button"
          onClick={handlePrev}
          aria-label="دسته قبلی"
          className="
            absolute
            right-0
            top-1/2
            z-40
            flex
            h-9
            w-9
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-[#e5e0d7]
            bg-white
            text-[#173a2c]
            shadow-[0_6px_20px_rgba(0,0,0,0.12)]
            transition-all
            duration-300
            hover:scale-110
            hover:bg-[#173a2c]
            hover:text-white
            disabled:cursor-not-allowed
            sm:-right-2
            sm:h-10
            sm:w-10
            md:-right-3
            lg:-right-4
            xl:-right-5
          "
        >
          <i className="bi bi-arrow-right text-[13px] sm:text-[14px]" />
        </button>

        {/* =========================================
            NEXT BUTTON
        ========================================= */}

        <button
          ref={nextButtonRef}
          type="button"
          onClick={handleNext}
          aria-label="دسته بعدی"
          className="
            absolute
            left-0
            top-1/2
            z-40
            flex
            h-9
            w-9
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-[#e5e0d7]
            bg-white
            text-[#173a2c]
            shadow-[0_6px_20px_rgba(0,0,0,0.12)]
            transition-all
            duration-300
            hover:scale-110
            hover:bg-[#173a2c]
            hover:text-white
            disabled:cursor-not-allowed
            sm:-left-2
            sm:h-10
            sm:w-10
            md:-left-3
            lg:-left-4
            xl:-left-5
          "
        >
          <i className="bi bi-arrow-left text-[13px] sm:text-[14px]" />
        </button>
      </div>
    </div>
  );
}

/* =====================================================
   CATEGORY CARD
===================================================== */

function CategoryCard({
  item,
  index,
}) {
  return (
    <Link
      to={`/products/${item.type}/${item.id}`}
      className="
        category-card
        group
        relative
        block
        w-full
        overflow-hidden
        rounded-[14px]
        bg-[#eee]
        shadow-sm
        transition-all
        duration-500
        hover:-translate-y-1
        hover:shadow-xl
        sm:rounded-[16px]
      "
    >
      <div
        className="
          relative
          aspect-[0.92]
          w-full
          overflow-hidden
          sm:aspect-square
        "
      >
        {/* IMAGE */}

        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="
              category-card-image
              absolute
              inset-0
              h-full
              w-full
              object-cover
              transition-transform
              duration-700
              ease-out
              group-hover:scale-[1.06]
            "
          />
        ) : (
          <div
            className="
              category-card-image
              absolute
              inset-0
              h-full
              w-full
              bg-gradient-to-br
              from-[#e9e5dc]
              via-[#f3f0e9]
              to-[#ddd8ce]
            "
          />
        )}

        {/* GRADIENT */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/85
            via-black/20
            to-transparent
          "
        />

        {/* NUMBER */}

        <span
          className="
            absolute
            right-3
            top-3
            text-[8px]
            font-medium
            tracking-[0.15em]
            text-white/75
            sm:right-4
            sm:top-4
            sm:text-[9px]
          "
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* CONTENT */}

        <div
          className="
            absolute
            bottom-0
            right-0
            w-full
            p-3
            sm:p-4
            lg:p-5
          "
        >
          <h4
            className="
              line-clamp-2
              text-[12px]
              font-bold
              leading-5
              text-white
              sm:text-[14px]
              lg:text-[15px]
            "
          >
            {item.title}
          </h4>

          <p
            className="
              mt-1
              line-clamp-1
              text-[9px]
              text-white/70
              sm:text-[10px]
            "
          >
            {item.subtitle}
          </p>

          {/* DESKTOP HOVER */}

          <div
            className="
              mt-2
              hidden
              translate-y-2
              items-center
              gap-2
              text-[9px]
              text-white
              opacity-0
              transition-all
              duration-500
              group-hover:translate-y-0
              group-hover:opacity-100
              sm:flex
            "
          >
            مشاهده محصولات

            <span
              className="
                flex
                h-6
                w-6
                items-center
                justify-center
                rounded-full
                bg-white/15
                backdrop-blur-md
              "
            >
              <i className="bi bi-arrow-left text-[9px]" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* =====================================================
   PRODUCT SHOWCASE
===================================================== */

function ProductShowcase({
  title,
  subtitle,
  products,
  linkText,
  link,
}) {
  const swiperRef = useRef(null);
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);

  /* =====================================================
     UPDATE NAVIGATION
  ===================================================== */

  const updateNavigation = (swiper) => {
    if (!swiper) return;

    if (prevButtonRef.current) {
      prevButtonRef.current.disabled =
        swiper.isBeginning;

      gsap.to(prevButtonRef.current, {
        opacity: swiper.isBeginning ? 0.35 : 1,
        duration: 0.2,
      });
    }

    if (nextButtonRef.current) {
      nextButtonRef.current.disabled =
        swiper.isEnd;

      gsap.to(nextButtonRef.current, {
        opacity: swiper.isEnd ? 0.35 : 1,
        duration: 0.2,
      });
    }
  };

  /* =====================================================
     PRODUCT ANIMATION
  ===================================================== */

  const animateProduct = (
    swiper,
    direction = 1
  ) => {
    if (!swiper) return;

    const slide =
      swiper.slides?.[swiper.activeIndex];

    if (!slide) return;

    const card =
      slide.querySelector(
        ".showcase-product-card"
      );

    const image =
      slide.querySelector(
        ".showcase-product-image"
      );

    if (!card) return;

    const fromX = direction > 0 ? 30 : -30;

    gsap.killTweensOf([card, image]);

    gsap.fromTo(
      card,
      {
        opacity: 0.65,
        x: fromX,
        y: 8,
        scale: 0.97,
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.55,
        ease: "power3.out",
      }
    );

    if (image) {
      gsap.fromTo(
        image,
        {
          scale: 1.06,
        },
        {
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
        }
      );
    }
  };

  /* =====================================================
     PREV
  ===================================================== */

  const handlePrev = () => {
    const swiper = swiperRef.current;

    if (!swiper || swiper.destroyed) return;

    if (swiper.isBeginning) return;

    swiper.slidePrev(650);
  };

  /* =====================================================
     NEXT
  ===================================================== */

  const handleNext = () => {
    const swiper = swiperRef.current;

    if (!swiper || swiper.destroyed) return;

    if (swiper.isEnd) return;

    swiper.slideNext(650);
  };

  return (
    <section
      className="
        product-showcase-section
        mt-16
        sm:mt-24
        lg:mt-28
      "
    >
      {/* =========================================
          HEADER
      ========================================= */}

      <div
        className="
          product-showcase-header
          mb-5
          flex
          items-end
          gap-3
          sm:mb-7
        "
      >
        <div className="min-w-0">
          <h3
            className="
              text-[18px]
              font-bold
              text-[#173a2c]
              sm:text-[23px]
              lg:text-[25px]
            "
          >
            {title}
          </h3>

          <p
            className="
              mt-1.5
              line-clamp-2
              text-[10px]
              leading-5
              text-[#999]
              sm:text-[12px]
            "
          >
            {subtitle}
          </p>
        </div>

        <Link
          to={link}
          className="
            mr-auto
            flex
            shrink-0
            items-center
            gap-1.5
            text-[9px]
            font-medium
            text-[#555]
            transition
            hover:text-[#166534]
            sm:text-[12px]
          "
        >
          <span className="hidden sm:inline">
            {linkText}
          </span>

          <span className="sm:hidden">
            مشاهده همه
          </span>

          <i className="bi bi-arrow-left" />
        </Link>
      </div>

      {/* =========================================
          PRODUCT SLIDER
      ========================================= */}

      <div className="relative px-1 sm:px-0">
        <Swiper
          modules={[FreeMode]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;

            requestAnimationFrame(() => {
              updateNavigation(swiper);
            });
          }}
          onSlideChange={(swiper) => {
            updateNavigation(swiper);
            animateProduct(swiper, 1);
          }}
          onTransitionEnd={(swiper) => {
            updateNavigation(swiper);
          }}
          onResize={(swiper) => {
            updateNavigation(swiper);
          }}
          slidesPerView="auto"
          spaceBetween={10}
          speed={650}
          grabCursor={true}
          resistance={true}
          resistanceRatio={0.65}
          watchOverflow={false}
          freeMode={false}
          className="
            !overflow-visible
            !pb-3
          "
        >
          {products.map((product) => (
            <SwiperSlide
              key={product.id}
              className="
                !w-[185px]
                min-[400px]:!w-[200px]
                sm:!w-[220px]
                md:!w-[235px]
                lg:!w-[245px]
                xl:!w-[250px]
                2xl:!w-[255px]
              "
            >
              <ShowcaseProductCard
                product={product}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* =========================================
            PREV
        ========================================= */}

        <button
          ref={prevButtonRef}
          type="button"
          onClick={handlePrev}
          aria-label="محصول قبلی"
          className="
            absolute
            right-0
            top-1/2
            z-40
            flex
            h-9
            w-9
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-[#e5e0d7]
            bg-white
            text-[#173a2c]
            shadow-[0_6px_20px_rgba(0,0,0,0.12)]
            transition-all
            duration-300
            hover:scale-110
            hover:bg-[#173a2c]
            hover:text-white
            disabled:cursor-not-allowed
            sm:-right-2
            sm:h-10
            sm:w-10
            md:-right-3
            lg:-right-4
            xl:-right-5
          "
        >
          <i className="bi bi-arrow-right text-[13px]" />
        </button>

        {/* =========================================
            NEXT
        ========================================= */}

        <button
          ref={nextButtonRef}
          type="button"
          onClick={handleNext}
          aria-label="محصول بعدی"
          className="
            absolute
            left-0
            top-1/2
            z-40
            flex
            h-9
            w-9
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-[#e5e0d7]
            bg-white
            text-[#173a2c]
            shadow-[0_6px_20px_rgba(0,0,0,0.12)]
            transition-all
            duration-300
            hover:scale-110
            hover:bg-[#173a2c]
            hover:text-white
            disabled:cursor-not-allowed
            sm:-left-2
            sm:h-10
            sm:w-10
            md:-left-3
            lg:-left-4
            xl:-left-5
          "
        >
          <i className="bi bi-arrow-left text-[13px]" />
        </button>
      </div>
    </section>
  );
}

/* =====================================================
   SHOWCASE PRODUCT CARD
===================================================== */

function ShowcaseProductCard({
  product,
}) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="
        showcase-product-card
        group
        block
        w-full
        overflow-hidden
        rounded-[14px]
        border
        border-[#eeeeee]
        bg-white
        shadow-sm
        transition-all
        duration-500
        hover:-translate-y-1
        hover:shadow-xl
        sm:rounded-[16px]
      "
    >
      {/* IMAGE */}

      <div
        className="
          relative
          aspect-square
          w-full
          overflow-hidden
          bg-[#f7f7f7]
        "
      >
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="
            showcase-product-image
            h-full
            w-full
            object-contain
            p-4
            transition-transform
            duration-700
            group-hover:scale-105
            sm:p-5
          "
        />

        {/* RATING */}

        <span
          className="
            absolute
            right-2
            top-2
            rounded-full
            bg-white
            px-2
            py-1
            text-[7px]
            text-[#777]
            shadow-sm
            sm:right-2.5
            sm:top-2.5
            sm:text-[8px]
          "
        >
          ★ {product.rating?.rate || "—"}
        </span>
      </div>

      {/* INFO */}

      <div className="p-2.5 sm:p-4">
        <h4
          className="
            line-clamp-2
            min-h-[36px]
            text-[9px]
            font-bold
            leading-5
            text-[#222]
            sm:min-h-[38px]
            sm:text-[11px]
          "
        >
          {product.title}
        </h4>

        <div
          className="
            mt-2.5
            flex
            items-center
            justify-between
            gap-2
            sm:mt-3
          "
        >
          <span
            className="
              text-[10px]
              font-bold
              text-[#173a2c]
              sm:text-xs
            "
          >
            ${product.price}
          </span>

          <span
            className="
              text-[8px]
              text-[#999]
              sm:text-[9px]
            "
          >
            مشاهده
          </span>
        </div>
      </div>
    </Link>
  );
}

/* =====================================================
   MIDDLE BANNER
===================================================== */

function MiddleBanner() {
  return (
    <section
      className="
        categories-middle-banner
        relative
        mt-14
        overflow-hidden
        rounded-[20px]
        bg-[url('/file_00000000d58c820da9bfbc1b74d4fefb.png')]
        bg-cover
        bg-center
        px-5
        py-9
        sm:mt-20
        sm:rounded-[22px]
        sm:px-10
        sm:py-12
        lg:mt-24
        lg:px-16
        lg:py-14
      "
      dir="rtl"
    >
      {/* OVERLAY */}

      <div className="absolute inset-0 bg-black/35" />

      {/* DECORATION */}

      <div
        className="
          absolute
          -left-16
          -top-16
          h-40
          w-40
          rounded-full
          bg-white/5
        "
      />

      <div
        className="
          absolute
          -bottom-20
          right-10
          h-48
          w-48
          rounded-full
          bg-white/5
        "
      />

      {/* CONTENT */}

      <div className="relative z-10 max-w-2xl">
        <span
          className="
            text-[8px]
            font-medium
            tracking-[0.2em]
            text-white/50
            sm:text-[10px]
          "
        >
          QOMASH SHEIKH ESLAMI
        </span>

        <h3
          className="
            mt-3
            text-[19px]
            font-bold
            leading-8
            text-white
            sm:text-2xl
            lg:text-3xl
          "
        >
          انتخاب درست،
          <br />
          از همین‌جا شروع می‌شود.
        </h3>

        <p
          className="
            mt-3
            max-w-xl
            text-[9px]
            leading-6
            text-white/60
            sm:text-xs
            sm:leading-7
          "
        >
          مجموعه‌ای از پارچه و پوشاک را با دقت انتخاب کرده‌ایم
          تا بتوانید محصول موردنظر خود را راحت‌تر پیدا کنید.
        </p>

        <Link
          to="/products/fabric"
          className="
            mt-5
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-white
            px-5
            py-3
            text-[9px]
            font-bold
            text-[#173a2c]
            transition
            hover:bg-[#f3f1ec]
            sm:mt-6
            sm:text-xs
          "
        >
          مشاهده فروشگاه

          <i className="bi bi-arrow-left" />
        </Link>
      </div>
    </section>
  );
}

/* =====================================================
   SECOND BANNER
===================================================== */

function ShopBanner() {
  return (
    <section
      className="
        categories-middle-banner
        mt-14
        rounded-[20px]
        border
        border-[#e8e4dc]
        bg-[#f7f5f0]
        px-5
        py-8
        sm:mt-20
        sm:rounded-[22px]
        sm:px-10
        sm:py-11
        lg:mt-24
        lg:px-14
      "
      dir="rtl"
    >
      <div
        className="
          flex
          flex-col
          gap-5
          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:gap-6
        "
      >
        <div>
          <p className="text-[8px] font-bold text-[#999] sm:text-[10px]">
            مجموعه قماش شیخ الاسلامی
          </p>

          <h3 className="mt-2 text-[17px] font-bold text-[#173a2c] sm:text-xl">
            محصولات جدید را از دست ندهید
          </h3>

          <p className="mt-2 text-[9px] leading-6 text-[#999] sm:text-xs">
            تازه‌ترین انتخاب‌های فروشگاه را ببینید.
          </p>
        </div>

        <Link
          to="/products"
          className="
            inline-flex
            w-fit
            items-center
            gap-2
            rounded-full
            bg-[#173a2c]
            px-5
            py-3
            text-[9px]
            font-bold
            text-white
            transition
            hover:bg-[#166534]
            sm:text-xs
          "
        >
          جدیدترین محصولات

          <i className="bi bi-arrow-left" />
        </Link>
      </div>
    </section>
  );
}