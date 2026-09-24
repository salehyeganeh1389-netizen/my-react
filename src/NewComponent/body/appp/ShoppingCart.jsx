
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: "bi-truck",
    title: "ارسال سریع",
    description: "ارسال سفارش در کوتاه‌ترین زمان",
  },
  {
    icon: "bi-arrow-return-right",
    title: "۷ روز ضمانت بازگشت",
    description: "خریدی مطمئن و بدون دغدغه",
  },
  {
    icon: "bi-shield-lock",
    title: "پرداخت امن",
    description: "پرداخت کاملاً امن و مطمئن",
  },
  {
    icon: "bi-headset",
    title: "پشتیبانی ۲۴ ساعته",
    description: "همیشه در کنار شما هستیم",
  },
  {
    icon: "bi-patch-check",
    title: "تضمین کیفیت",
    description: "انتخابی باکیفیت و قابل اعتماد",
  },
];

export default function ShoppingCart() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".benefit-card");
      const icons = gsap.utils.toArray(".benefit-icon");
      const texts = gsap.utils.toArray(".benefit-text");

      // -----------------------------
      // کارت‌ها
      // -----------------------------

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 45,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",

          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // -----------------------------
      // آیکون‌ها
      // -----------------------------

      gsap.fromTo(
        icons,
        {
          opacity: 0,
          scale: 0.7,
          y: 15,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",

          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 83%",
            toggleActions: "play none none none",
          },
        }
      );

      // -----------------------------
      // متن
      // -----------------------------

      gsap.fromTo(
        texts,
        {
          opacity: 0,
          y: 12,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.12,
          delay: 0.15,
          ease: "power2.out",

          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
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
        mx-auto
        w-full
        max-w-[1500px]
        px-3
        py-6
        sm:px-5
        sm:py-8
        lg:px-6
        lg:py-10
      "
    >
      <div
        className="
          relative
          overflow-hidden
          rounded-[20px]
          border
          border-[#e9eee9]
          bg-[#f8faf9]
          sm:rounded-[24px]
        "
      >
        {/* Background decoration */}

        <div
          className="
            pointer-events-none
            absolute
            -left-20
            -top-20
            h-40
            w-40
            rounded-full
            bg-[#173a2c]/[0.035]
            blur-3xl
            sm:h-48
            sm:w-48
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-20
            -right-20
            h-44
            w-44
            rounded-full
            bg-[#bd9257]/[0.045]
            blur-3xl
            sm:h-52
            sm:w-52
          "
        />

        <div
          className="
            relative
            grid
            grid-cols-1
            divide-y
            divide-[#e2e8e3]

            sm:grid-cols-2

            lg:grid-cols-5
            lg:divide-x
            lg:divide-y-0
            lg:divide-x-reverse
          "
        >
          {benefits.map((item) => (
            <div
              key={item.title}
              className="
                benefit-card
                group
                flex
                min-h-[92px]
                items-center
                gap-4
                px-5
                py-5
                transition-colors
                duration-500
                hover:bg-white/70

                sm:min-h-[105px]
                sm:px-5
                sm:py-6

                lg:min-h-[130px]
                lg:flex-col
                lg:items-center
                lg:justify-center
                lg:gap-3
                lg:px-4
                lg:py-6
              "
            >
              {/* Icon */}

              <div
                className="
                  benefit-icon
                  relative
                  flex
                  h-[46px]
                  w-[46px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-[14px]
                  border
                  border-[#dfe8e1]
                  bg-white
                  text-[#173a2c]
                  shadow-[0_5px_20px_rgba(23,58,44,0.06)]
                  transition-all
                  duration-500

                  group-hover:-translate-y-1
                  group-hover:border-[#173a2c]/20
                  group-hover:shadow-[0_12px_30px_rgba(23,58,44,0.11)]

                  sm:h-[48px]
                  sm:w-[48px]

                  lg:h-[50px]
                  lg:w-[50px]
                "
              >
                <i
                  className={`
                    bi
                    ${item.icon}
                    text-[19px]
                    transition-transform
                    duration-500
                    group-hover:scale-110
                    sm:text-[20px]
                  `}
                />

                <span
                  className="
                    absolute
                    -right-1
                    -top-1
                    h-2
                    w-2
                    rounded-full
                    bg-[#bd9257]
                    opacity-0
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                  "
                />
              </div>

              {/* Text */}

              <div
                className="
                  benefit-text
                  min-w-0
                  flex-1
                  lg:flex-none
                  lg:text-center
                "
              >
                <h3
                  className="
                    text-[12px]
                    font-bold
                    leading-6
                    text-[#173a2c]
                    sm:text-[13px]
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    mt-0.5
                    text-[9px]
                    leading-5
                    text-[#8b938e]
                    sm:mt-1
                    sm:text-[10px]
                    lg:max-w-[160px]
                  "
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}