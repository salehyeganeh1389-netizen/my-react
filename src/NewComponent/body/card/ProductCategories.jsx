import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

import "swiper/css";

gsap.registerPlugin(ScrollTrigger);

const categories = {
  fabric: [
    {
      title: "پارچه مجلسی",
      subtitle: "پارچه‌های خاص و شیک",
      image:
        "https://down-th.img.susercontent.com/file/a3102014a9dee1d9d105ef1183d403ee",
      link: "/products/fabric/formal",
    },
    {
      title: "پارچه مجلسی",
      subtitle: "پارچه‌های خاص و شیک",
      image:
        "https://down-th.img.susercontent.com/file/a3102014a9dee1d9d105ef1183d403ee",
      link: "/products/fabric/formal",
    },
    {
      title: "پارچه مجلسی",
      subtitle: "پارچه‌های خاص و شیک",
      image:
        "https://down-th.img.susercontent.com/file/a3102014a9dee1d9d105ef1183d403ee",
      link: "/products/fabric/formal",
    },
    {
      title: "پارچه نخی",
      subtitle: "سبک، خنک و راحت",
      image:
        "https://down-th.img.susercontent.com/file/a3102014a9dee1d9d105ef1183d403ee",
      link: "/products/fabric/cotton",
    },
    {
      title: "پارچه تابستانی",
      subtitle: "مناسب روزهای گرم",
      image:
        "https://down-th.img.susercontent.com/file/a3102014a9dee1d9d105ef1183d403ee",
      link: "/products/fabric/summer",
    },
    {
      title: "پارچه زمستانی",
      subtitle: "گرم و باکیفیت",
      image:
        "https://down-th.img.susercontent.com/file/a3102014a9dee1d9d105ef1183d403ee",
      link: "/products/fabric/winter",
    },
  ],

  clothing: [
    {
      title: "تیشرت",
      subtitle: "تیشرت‌های روزمره و اسپرت",
      image:
        "https://down-th.img.susercontent.com/file/a3102014a9dee1d9d105ef1183d403ee",
      link: "/products/clothing/tshirt",
    },
    {
      title: "تیشرت",
      subtitle: "تیشرت‌های روزمره و اسپرت",
      image:
        "https://down-th.img.susercontent.com/file/a3102014a9dee1d9d105ef1183d403ee",
      link: "/products/clothing/tshirt",
    },
    {
      title: "تیشرت",
      subtitle: "تیشرت‌های روزمره و اسپرت",
      image:
        "https://down-th.img.susercontent.com/file/a3102014a9dee1d9d105ef1183d403ee",
      link: "/products/clothing/tshirt",
    },
    {
      title: "شلوار",
      subtitle: "مدل‌های متنوع مردانه",
      image:
        "https://down-th.img.susercontent.com/file/a3102014a9dee1d9d105ef1183d403ee",
      link: "/products/clothing/pants",
    },
    {
      title: "لباس مردانه",
      subtitle: "استایل مردانه",
      image:
        "https://down-th.img.susercontent.com/file/a3102014a9dee1d9d105ef1183d403ee",
      link: "/products/clothing/men",
    },
    {
      title: "لباس زنانه",
      subtitle: "انتخاب‌های متنوع زنانه",
      image:
        "https://down-th.img.susercontent.com/file/a3102014a9dee1d9d105ef1183d403ee",
      link: "/products/clothing/women",
    },
  ],
};

export default function ProductCategories() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* =================================
         عنوان اصلی
      ================================= */

      gsap.fromTo(
        ".categories-main-title",
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",

          scrollTrigger: {
            trigger: ".categories-main-title",
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );

      /* =================================
         سکشن‌های دسته‌بندی
      ================================= */

      gsap.utils.toArray(".category-section").forEach((section) => {
        gsap.fromTo(
          section,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",

            scrollTrigger: {
              trigger: section,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      /* =================================
         کارت‌ها
      ================================= */

      gsap.utils.toArray(".category-card").forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 35,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            delay: (index % 6) * 0.07,
            ease: "power3.out",

            scrollTrigger: {
              trigger: card,
              start: "top 91%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      dir="rtl"
      className="
        mx-auto
        w-full
        max-w-[1650px]
        px-4
        py-12
        sm:px-6
        sm:py-14
        lg:py-20
      "
    >
      {/* عنوان اصلی */}

      <div className="categories-main-title mb-8 sm:mb-10 lg:mb-12">
        <h2
          className="
            text-[22px]
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
            text-[11px]
            text-[#999]
            sm:text-[12px]
            lg:text-[13px]
          "
        >
          مجموعه‌ای از محصولات قماش شیخ الاسلامی
        </p>
      </div>

      {/* دسته پارچه */}

      <div className="category-section">
        <CategorySection
          title="پارچه"
          subtitle="انتخابی از پارچه‌های باکیفیت"
          items={categories.fabric}
        />
      </div>

      {/* دسته پوشاک */}

      <div className="category-section mt-14 sm:mt-16 lg:mt-20">
        <CategorySection
          title="پوشاک"
          subtitle="استایل خود را از اینجا انتخاب کنید"
          items={categories.clothing}
        />
      </div>
    </section>
  );
}

/* =========================
   Category Section
========================= */

function CategorySection({ title, subtitle, items }) {
  return (
    <div>
      {/* عنوان دسته */}

      <div className="mb-5 flex items-end sm:mb-6">
        <div>
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

        <a
          href="#"
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
        </a>
      </div>

      {/* موبایل */}

      <div className="block sm:hidden">
        <Swiper
          modules={[FreeMode]}
          freeMode={{
            enabled: true,
            momentum: true,
            momentumRatio: 0.8,
          }}
          slidesPerView="auto"
          spaceBetween={12}
          loop={true}
          grabCursor={true}
          resistance={true}
          resistanceRatio={0.7}
          className="!overflow-visible"
        >
          {items.map((item, index) => (
            <SwiperSlide
              key={`${item.title}-mobile-${index}`}
              className="!w-[190px]"
            >
              <CategoryCard item={item} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* تبلت و دسکتاپ */}

      <div
        className="
          hidden
          sm:grid
          sm:grid-cols-3
          sm:gap-4
          lg:flex
          lg:flex-wrap
          lg:gap-4
        "
      >
        {items.map((item, index) => (
          <CategoryCard
            key={`${item.title}-${index}`}
            item={item}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

/* =========================
   Category Card
========================= */

function CategoryCard({ item, index }) {
  return (
    <a
      href={item.link}
      className="
        category-card
        group
        relative
        block
        w-full
        overflow-hidden
        rounded-[12px]
        bg-[#eee]
        sm:rounded-[14px]
        lg:w-[210px]
        xl:w-[220px]
        2xl:w-[230px]
      "
    >
      <div className="relative aspect-square overflow-hidden">
        {/* تصویر */}

        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="
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

        {/* گرادیانت */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/75
            via-black/10
            to-transparent
          "
        />

        {/* شماره */}

        <span
          className="
            absolute
            right-3
            top-3
            text-[8px]
            font-medium
            tracking-[0.15em]
            text-white/70
            sm:right-4
            sm:top-4
            sm:text-[9px]
          "
        >
          0{index + 1}
        </span>

        {/* محتوا */}

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
              text-[12px]
              font-bold
              text-white
              sm:text-[14px]
              lg:text-[15px]
            "
          >
            {item.title}
          </h4>

          <p
            className="
              mt-0.5
              truncate
              text-[8px]
              text-white/65
              sm:mt-1
              sm:text-[9px]
              lg:text-[10px]
            "
          >
            {item.subtitle}
          </p>

          {/* مشاهده محصولات */}

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
              sm:mt-3
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
    </a>
  );
}