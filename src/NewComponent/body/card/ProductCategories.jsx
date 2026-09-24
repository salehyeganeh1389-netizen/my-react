import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";

import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";

gsap.registerPlugin(ScrollTrigger);

const API_URL = "https://fakestoreapi.com/products";

export default function ProductCategories() {
  const sectionRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getProducts() {
      try {
        setLoading(true);

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Products not found");
        }

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, []);

  /*
    Fake Store API = 20 محصول

    نصف اول = پارچه
    نصف دوم = پوشاک
  */

  const fabricProducts = products.slice(
    0,
    Math.ceil(products.length / 2)
  );

  const clothingProducts = products.slice(
    Math.ceil(products.length / 2)
  );

  /*
    ۶ محصول پرفروش
    فعلاً بر اساس امتیاز مرتب می‌کنیم.
  */

  const bestSellingProducts = [...products]
    .sort(
      (a, b) =>
        (b.rating?.rate || 0) -
        (a.rating?.rate || 0)
    )
    .slice(0, 6);

  /*
    ۶ محصول آخر
    فعلاً ۶ محصول آخر API
  */

  const latestProducts = [...products]
    .reverse()
    .slice(0, 6);

  useLayoutEffect(() => {
    if (loading || !products.length) return;

    const ctx = gsap.context(() => {
      /* =========================================
         عنوان اصلی
      ========================================= */

      gsap.fromTo(
        ".categories-main-title",
        {
          opacity: 0,
          clipPath: "inset(0 100% 0 0)",
        },
        {
          opacity: 1,
          clipPath: "inset(0 0% 0 0)",
          duration: 0.8,
          ease: "power3.inOut",

          scrollTrigger: {
            trigger: ".categories-main-title",
            start: "top 88%",
            once: true,
          },
        }
      );

      /* =========================================
         سکشن‌های دسته‌بندی
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

          gsap.fromTo(
            header,
            {
              opacity: 0,
              clipPath: "inset(0 100% 0 0)",
            },
            {
              opacity: 1,
              clipPath: "inset(0 0% 0 0)",
              duration: 0.65,
              ease: "power3.inOut",

              scrollTrigger: {
                trigger: section,
                start: "top 88%",
                once: true,
              },
            }
          );

          gsap.fromTo(
            cards,
            {
              opacity: 0,
              clipPath: "inset(0 0 100% 0)",
            },
            {
              opacity: 1,
              clipPath: "inset(0 0 0% 0)",
              duration: 0.75,
              stagger: 0.09,
              ease: "power3.inOut",

              scrollTrigger: {
                trigger: section,
                start: "top 82%",
                once: true,
              },
            }
          );

          gsap.fromTo(
            images,
            {
              scale: 1.12,
            },
            {
              scale: 1,
              duration: 1.1,
              stagger: 0.09,
              ease: "power3.out",

              scrollTrigger: {
                trigger: section,
                start: "top 82%",
                once: true,
              },
            }
          );
        });

      /* =========================================
         سکشن پرفروش‌ترین
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

          gsap.fromTo(
            cards,
            {
              opacity: 0,
              y: 35,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.08,
              ease: "power3.out",

              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                once: true,
              },
            }
          );
        });

      /* =========================================
         سکشن میانی
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
    }, sectionRef);

    return () => ctx.revert();
  }, [loading, products]);

  if (error) {
    return (
      <section
        dir="rtl"
        className="mx-auto w-full max-w-[1650px] px-4 py-20 text-center"
      >
        <p className="text-sm text-red-500">
          دریافت محصولات با خطا مواجه شد.
        </p>
      </section>
    );
  }

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
      {/* =========================================
          عنوان اصلی
      ========================================= */}

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

      {loading ? (
        <CategoriesSkeleton />
      ) : (
        <>
          {/* =========================================
              پارچه
          ========================================= */}

          <div className="category-section">
            <CategorySection
              title="پارچه"
              subtitle="انتخابی از محصولات پارچه"
              items={fabricProducts}
              type="fabric"
            />
          </div>

          {/* =========================================
              سکشن میانی
          ========================================= */}

          <MiddleBanner />

          {/* =========================================
              پوشاک
          ========================================= */}

          <div className="category-section mt-14 sm:mt-16 lg:mt-20">
            <CategorySection
              title="پوشاک"
              subtitle="مجموعه‌ای از پوشاک فروشگاه"
              items={clothingProducts}
              type="clothing"
            />
          </div>

          {/* =========================================
              پرفروش‌ترین محصولات
          ========================================= */}

          <ProductShowcase
            title="پرفروش‌ترین محصولات"
            subtitle="محصولاتی که بیشتر مورد توجه قرار گرفته‌اند"
            products={bestSellingProducts}
            linkText="مشاهده همه محصولات"
            link="/products/fabric"
          />

          {/* =========================================
              سکشن میانی دوم
          ========================================= */}

          <ShopBanner />

          {/* =========================================
              آخرین محصولات
          ========================================= */}

          <ProductShowcase
            title="آخرین محصولات"
            subtitle="تازه‌ترین محصولاتی که به مجموعه فروشگاه اضافه شده‌اند"
            products={latestProducts}
            linkText="مشاهده محصولات"
            link="/products/clothing"
          />
        </>
      )}
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
  return (
    <div>
      <div className="category-header mb-5 flex items-end sm:mb-6">
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
          grabCursor
          resistance
          resistanceRatio={0.7}
          className="!overflow-visible"
        >
          {items.map((item, index) => (
            <SwiperSlide
              key={`${item.id}-mobile`}
              className="!w-[190px]"
            >
              <CategoryCard
                item={item}
                index={index}
                type={type}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* دسکتاپ */}

      <div className="relative hidden sm:block">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: `.next-${type}`,
            prevEl: `.prev-${type}`,
          }}
          slidesPerView={3}
          spaceBetween={16}
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
            1280: {
              slidesPerView: 5,
            },
            1536: {
              slidesPerView: 6,
            },
          }}
        >
          {items.map((item, index) => (
            <SwiperSlide key={item.id}>
              <CategoryCard
                item={item}
                index={index}
                type={type}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* قبلی */}

        <button
          className={`
            prev-${type}
            absolute
            -right-5
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
            border-[#e5e5e5]
            bg-white
            text-[#333]
            shadow-sm
            transition
            hover:bg-[#173a2c]
            hover:text-white
          `}
        >
          <i className="bi bi-arrow-right" />
        </button>

        {/* بعدی */}

        <button
          className={`
            next-${type}
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
            border-[#e5e5e5]
            bg-white
            text-[#333]
            shadow-sm
            transition
            hover:bg-[#173a2c]
            hover:text-white
          `}
        >
          <i className="bi bi-arrow-left" />
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
  type,
}) {
  /*
    فعلاً همان ID محصولات FakeStore استفاده می‌شود.
    برای دسته‌های واقعی بعداً می‌توانیم ID ثابت مثل
    cotton / linen / tshirt و ... قرار بدهیم.
  */

  return (
    <Link
      to={`/products/${type}/${item.id}`}
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
      "
    >
      <div className="relative aspect-square overflow-hidden">
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

        {/* گرادیانت */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/80
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
          {String(index + 1).padStart(2, "0")}
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
              text-[9px]
              text-white/70
              sm:text-[10px]
            "
          >
            {formatPrice(item.price)}
          </p>

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
   برای پرفروش‌ترین و آخرین محصولات
===================================================== */

function ProductShowcase({
  title,
  subtitle,
  products,
  linkText,
  link,
}) {
  return (
    <section
      className="
        product-showcase-section
        mt-20
        sm:mt-24
        lg:mt-28
      "
    >
      {/* Header */}

      <div
        className="
          product-showcase-header
          mb-6
          flex
          items-end
          gap-4
          sm:mb-7
        "
      >
        <div>
          <h3
            className="
              text-[19px]
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
              text-[10px]
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
            text-[10px]
            font-medium
            text-[#555]
            transition
            hover:text-[#166534]
            sm:text-[12px]
          "
        >
          {linkText}

          <i className="bi bi-arrow-left" />
        </Link>
      </div>

      {/* محصولات */}

      <div
        className="
          grid
          grid-cols-2
          gap-3
          sm:grid-cols-3
          sm:gap-4
          lg:grid-cols-6
        "
      >
        {products.map((product) => (
          <ShowcaseProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}

/* =====================================================
   SHOWCASE PRODUCT CARD
===================================================== */

function ShowcaseProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="
        showcase-product-card
        group
        block
        overflow-hidden
        rounded-[16px]
        border
        border-[#eeeeee]
        bg-white
        transition-all
        duration-500
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      {/* IMAGE */}

      <div
        className="
          relative
          aspect-square
          overflow-hidden
          bg-[#f7f7f7]
        "
      >
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="
            h-full
            w-full
            object-contain
            p-5
            transition-transform
            duration-700
            group-hover:scale-105
          "
        />

        {/* امتیاز */}

        <span
          className="
            absolute
            right-2.5
            top-2.5
            rounded-full
            bg-white
            px-2
            py-1
            text-[8px]
            text-[#777]
            shadow-sm
          "
        >
          ★ {product.rating?.rate}
        </span>
      </div>

      {/* INFO */}

      <div className="p-3 sm:p-4">
        <h4
          className="
            line-clamp-2
            min-h-[38px]
            text-[10px]
            font-bold
            leading-5
            text-[#222]
            sm:text-[11px]
          "
        >
          {product.title}
        </h4>

        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="text-[11px] font-bold text-[#173a2c] sm:text-xs">
            ${product.price}
          </span>

          <span className="text-[9px] text-[#999]">
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
        mt-16
        overflow-hidden
        rounded-[22px]
        bg-[url('/file_00000000d58c820da9bfbc1b74d4fefb.png')]
        bg-cover
        bg-center
        px-6
        py-10
        sm:mt-20
        sm:px-10
        sm:py-12
        lg:mt-24
        lg:px-16
        lg:py-14
      "
      dir="rtl"
    >
      {/* لایه روی عکس برای خوانایی متن */}
      <div className="absolute inset-0 bg-black/35" />

      {/* دکور */}

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

      <div className="relative z-10 max-w-2xl">
        <span
          className="
            text-[9px]
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
            text-xl
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
            text-[10px]
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
            mt-6
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-white
            px-5
            py-3
            text-[10px]
            font-bold
            text-[#173a2c]
            transition
            hover:bg-[#f3f1ec]
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
        mt-16
        rounded-[22px]
        border
        border-[#e8e4dc]
        bg-[#f7f5f0]
        px-6
        py-9
        sm:mt-20
        sm:px-10
        sm:py-11
        lg:mt-24
        lg:px-14
      "
      dir="rtl"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[9px] font-bold text-[#999] sm:text-[10px]">
            مجموعه قماش شیخ الاسلامی
          </p>

          <h3 className="mt-2 text-lg font-bold text-[#173a2c] sm:text-xl">
            محصولات جدید را از دست ندهید
          </h3>

          <p className="mt-2 text-[10px] leading-6 text-[#999] sm:text-xs">
            تازه‌ترین انتخاب‌های فروشگاه را ببینید.
          </p>
        </div>

        <Link
          to="/products/clothing"
          className="
            inline-flex
            w-fit
            items-center
            gap-2
            rounded-full
            bg-[#173a2c]
            px-5
            py-3
            text-[10px]
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

/* =====================================================
   LOADING
===================================================== */

function CategoriesSkeleton() {
  return (
    <div className="space-y-12">
      {[1, 2].map((section) => (
        <div key={section}>
          <div className="mb-6">
            <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />

            <div className="mt-2 h-3 w-48 animate-pulse rounded bg-gray-100" />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="
                  aspect-square
                  animate-pulse
                  rounded-[14px]
                  bg-gray-200
                "
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* =====================================================
   PRICE
===================================================== */

function formatPrice(price) {
  return `$${Number(price).toLocaleString("en-US")}`;
}