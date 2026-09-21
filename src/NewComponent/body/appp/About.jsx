import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* =========================
         INTRO
      ========================= */

      const intro = gsap.timeline();

      intro
        .fromTo(
          ".about-kicker",
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
          ".about-heading",
          {
            opacity: 0,
            y: 35,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .fromTo(
          ".about-description",
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.5"
        );

      /* =========================
         STORY IMAGE
      ========================= */

      gsap.fromTo(
        ".about-photo",
        {
          opacity: 0,
          scale: 1.06,
          clipPath: "inset(0 100% 0 0)",
        },
        {
          opacity: 1,
          scale: 1,
          clipPath: "inset(0 0% 0 0)",
          duration: 1.4,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".about-story-section",
            start: "top 78%",
          },
        }
      );

      /* =========================
         STORY BOX
      ========================= */

      gsap.fromTo(
        ".about-story-content",
        {
          opacity: 0,
          x: 60,
          y: 30,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1,
          delay: 0.25,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".about-story-section",
            start: "top 78%",
          },
        }
      );

      /* =========================
         FEATURES HEADER
      ========================= */

      gsap.fromTo(
        ".about-features-header",
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-features",
            start: "top 85%",
          },
        }
      );

      /* =========================
         FEATURES
      ========================= */

      gsap.fromTo(
        ".about-feature",
        {
          opacity: 0,
          y: 45,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.16,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".about-features",
            start: "top 78%",
          },
        }
      );

      /* =========================
         FEATURE NUMBERS
      ========================= */

      gsap.fromTo(
        ".feature-number",
        {
          opacity: 0,
          scale: 0.7,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.16,
          delay: 0.2,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: ".about-features",
            start: "top 78%",
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={pageRef}
      dir="rtl"
      className="overflow-hidden bg-white text-[#171917]"
    >
      {/* =====================================================
          INTRO
      ===================================================== */}

      <section>
        <div className="flex items-end justify-between gap-10"></div>
      </section>

      {/* =====================================================
          STORY
      ===================================================== */}

      <section className="about-story-section mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28 lg:px-16 lg:py-36">
        <div className="relative lg:min-h-[650px]">
          {/* IMAGE */}

          <div
            className="
              about-photo
              relative
              h-[430px]
              w-full
              overflow-hidden
              rounded-[30px]
              bg-[#dedcd7]
              opacity-0
              sm:h-[550px]
              lg:absolute
              lg:left-0
              lg:top-0
              lg:h-[650px]
              lg:w-[69%]
            "
          >
            <img
              src="/file_00000000d58c820da9bfbc1b74d4fefb.png"
              alt="قماش شیخ الاسلامی"
              className="
                h-full
                w-full
                object-cover
                transition-transform
                duration-[1400ms]
                ease-out
                hover:scale-[1.035]
              "
            />

            <div className="absolute inset-0 bg-black/[0.035]" />

            <div
              className="
                absolute
                left-7
                top-7
                rounded-full
                border
                border-white/30
                bg-black/10
                px-4
                py-2
                text-[9px]
                text-white/90
                backdrop-blur-md
                sm:left-9
                sm:top-9
              "
            >
              داستان ما
            </div>

            <div className="absolute bottom-7 right-7 sm:bottom-9 sm:right-9">
              <span className="block text-[9px] text-white/60">
                قماش شیخ الاسلامی
              </span>

              <span className="mt-2 block text-[12px] font-medium text-white">
                کیفیت در جزئیات است
              </span>
            </div>
          </div>

          {/* STORY BOX */}

          <div
            className="
              about-story-content
              relative
              z-10
              mx-4
              -mt-16
              rounded-[40px]
              bg-white
              p-7
              opacity-0
              shadow-[0_30px_90px_rgba(20,30,25,0.12)]
              sm:mx-10
              sm:-mt-20
              sm:p-10
              lg:absolute
              lg:right-[2%]
              lg:top-[90px]
              lg:mx-0
              lg:mt-0
              lg:w-[43%]
              lg:p-12
              xl:w-[41%]
              xl:p-14
            "
          >
            <h2
              className="
                mt-7
                text-[27px]
                font-bold
                leading-[1.65]
                tracking-[-0.5px]
                text-[#1c1f1c]
                sm:text-[34px]
                lg:text-[36px]
              "
            >
              بیشتر از یک فروشگاه،
              <br />

              <span className="font-normal text-[#17633f]">
                یک تجربه متفاوت.
              </span>
            </h2>

            <div className="my-7 h-px w-full bg-[#e9e7e2]" />

            <div className="space-y-4 text-[11px] leading-8 text-[#777773] sm:text-[12px]">
              <p>
                ما در قماش شیخ الاسلامی تلاش می‌کنیم مجموعه‌ای متنوع از
                پارچه‌ها و پوشاک را در کنار کیفیت مناسب و انتخابی دقیق در
                اختیار شما قرار دهیم.
              </p>

              <p>
                برای ما خرید فقط انتخاب یک محصول نیست؛ از لحظه‌ای که وارد
                مجموعه می‌شوید تا زمانی که محصول موردنظرتان را دریافت می‌کنید،
                تلاش می‌کنیم همه‌چیز ساده، شفاف و قابل اعتماد باشد.
              </p>

              <p>
                انتخاب محصولات، توجه به کیفیت و ارتباط مستقیم با مشتری،
                بخش‌هایی از تجربه‌ای هستند که می‌خواهیم با نام قماش شیخ
                الاسلامی برای شما بسازیم.
              </p>
            </div>

            <div className="mt-8 flex items-center border-t border-[#e9e7e2] pt-6">
              <div className="flex-1">
                <strong className="block text-[22px] font-bold text-[#17633f]">
                  11+
                </strong>

                <span className="mt-1 block text-[9px] text-[#999]">
                  سال تجربه
                </span>
              </div>

              <div className="h-9 w-px bg-[#e9e7e2]" />

              <div className="flex-1 pr-6">
                <strong
                  dir="ltr"
                  className="block text-[22px] font-bold text-[#17633f]"
                >
                  24/7
                </strong>

                <span className="mt-1 block text-[9px] text-[#999]">
                  پشتیبانی
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURES
      ===================================================== */}

      {/* =====================================================
    FEATURES
===================================================== */}

<section className="border-y border-[#dcd9d1] bg-white">
  <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-16">
    {/* HEADER */}

    <div
      className="
        about-features-header
        flex
        flex-col
        justify-between
        gap-7
        py-16
        opacity-0
        sm:py-20
        lg:flex-row
        lg:items-end
      "
    >
      <div>
        <h2
          className="
            text-[30px]
            font-semibold
            leading-[1.5]
            tracking-[-1px]
            sm:text-[42px]
          "
        >
          چرا قماش شیخ الاسلامی؟
        </h2>
      </div>

      <p
        className="
          max-w-[370px]
          text-[11px]
          leading-8
          text-[#888]
          sm:text-[12px]
        "
      >
        سه اصل ساده که در شکل‌گیری تجربه ما برای مشتری نقش اصلی دارند.
      </p>
    </div>

    {/* FEATURE CARDS */}

    <div
      className="
        about-features
        grid
        gap-4
        pb-16
        sm:grid-cols-2
        sm:gap-5
        sm:pb-20
        lg:grid-cols-3
        lg:gap-6
      "
    >
      <Feature
        number="01"
        image="./undraw_mail-sent_dagx.svg"
        title="ضمانت و اعتماد"
        text="تلاش می‌کنیم خرید شما با اطمینان، شفافیت و تجربه‌ای مطمئن همراه باشد."
      />
      <Feature
        number="02"
        image="./undraw_mail-sent_dagx.svg"
        title="کیفیت و تنوع بالا"
        text="انتخاب محصولاتی متنوع با تمرکز بر کیفیت، ظاهر و ارزش واقعی خرید."
      />
      <Feature
        number="03"
        image="./undraw_mail-sent_dagx.svg"
        title="پشتیبانی آنلاین"
        text="در مسیر انتخاب و خرید، ارتباط و پشتیبانی را بخشی از تجربه مشتری می‌دانیم."
      />
    </div>
  </div>
</section>
    </main>
  );
}

/* =====================================================
   FEATURE
===================================================== */

function Feature({ number, image, title, text }) {
  return (
    <article
      className="
        about-feature
        group
        relative
        min-h-[360px]
        overflow-hidden
        rounded-[28px]
        border
        border-[#e7e4dc]
        bg-white
        px-7
        py-7
        opacity-0
        shadow-[0_18px_60px_rgba(20,30,25,0.07)]
        transition-all
        duration-500
        hover:-translate-y-1
        hover:shadow-[0_25px_70px_rgba(20,30,25,0.11)]
        sm:min-h-[390px]
        sm:px-8
        sm:py-8
        lg:min-h-[430px]
        lg:px-9
        lg:py-9
      "
    >
      {/* Decorative circles */}

      <div
        className="
          pointer-events-none
          absolute
          -left-16
          -top-16
          h-44
          w-44
          rounded-full
          border
          border-[#17633f]
          opacity-[0.06]
          transition-transform
          duration-700
          group-hover:scale-125
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -left-8
          -top-8
          h-28
          w-28
          rounded-full
          border
          border-[#17633f]
          opacity-[0.05]
        "
      />

      {/* TOP */}

      <div
        className="
          relative
          z-10
          h-[155px]
          sm:h-[165px]
          lg:h-[175px]
        "
      >
        <div
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            transition-transform
            duration-700
            group-hover:scale-[1.04]
          "
        >
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="
              h-[125px]
              w-[125px]
              object-contain
              grayscale
              opacity-90
              select-none
              sm:h-[140px]
              sm:w-[140px]
              lg:h-[150px]
              lg:w-[150px]
            "
          />
        </div>

        {/* NUMBER */}

        <span
          dir="ltr"
          className="
            feature-number
            absolute
            left-0
            top-0
            text-[52px]
            font-light
            leading-none
            tracking-[-3px]
            text-[#dedbd3]
          "
        >
          {number}
        </span>
      </div>

      {/* CONTENT */}

      <div className="relative z-10 mt-2 sm:mt-3">
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-[#17633f]" />

          <span className="text-[8px] font-medium text-[#a5a5a0]">
            قماش شیخ الاسلامی
          </span>
        </div>

        <h3
          className="
            text-[19px]
            font-semibold
            leading-[1.7]
            tracking-[-0.4px]
            text-[#171917]
            sm:text-[21px]
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-4
            max-w-[300px]
            text-[11px]
            leading-8
            text-[#858580]
            sm:text-[12px]
          "
        >
          {text}
        </p>
      </div>

      {/* BOTTOM */}

      <div
        className="
          absolute
          bottom-7
          left-7
          right-7
          sm:bottom-8
          sm:left-8
          sm:right-8
        "
      >
        <div className="h-px w-full bg-[#e7e4dc]" />

        <div className="mt-4 flex items-center justify-between">
          <span className="text-[8px] text-[#aaa]">
            تجربه بهتر برای شما
          </span>

          <span
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-full
              border
              border-[#dedbd3]
              text-[#17633f]
              transition-all
              duration-500
              group-hover:border-[#17633f]
              group-hover:bg-[#17633f]
              group-hover:text-white
            "
          >
            <i className="bi bi-arrow-up-left text-[9px]" />
          </span>
        </div>
      </div>
    </article>
  );
}