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
    icon: "bi-shield-check",
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
      const items = gsap.utils.toArray(".benefit-item");
      const icons = gsap.utils.toArray(".benefit-icon");
      const texts = gsap.utils.toArray(".benefit-text");

      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        icons,
        {
          opacity: 0,
          scale: 0.75,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        texts,
        {
          opacity: 0,
          y: 10,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 87%",
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
        w-full
        px-4
        py-8
        sm:px-6
        sm:py-10
        lg:px-8
        lg:py-14
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1450px]
          border-y
          border-[#dedfd9]
        "
      >
        <div
          className="
            grid
            grid-cols-2

            lg:grid-cols-5
          "
        >
          {benefits.map((item, index) => (
            <div
              key={item.title}
              className={`
                benefit-item
                group
                relative
                flex
                min-h-[145px]
                flex-col
                items-center
                justify-center
                px-4
                py-7
                text-center

                transition-colors
                duration-500

                hover:bg-white/50

                ${
                  index < 4
                    ? "lg:border-l lg:border-[#dedfd9]"
                    : ""
                }

                ${
                  index < 2
                    ? "border-b border-[#dedfd9] lg:border-b-0"
                    : ""
                }

                ${
                  index === 0 || index === 2
                    ? "border-l border-[#dedfd9] lg:border-l"
                    : ""
                }

                sm:min-h-[160px]
                sm:px-5

                lg:min-h-[175px]
                lg:px-6
                lg:py-8
              `}
            >
              {/* Hover indicator */}

              <span
                className="
                  absolute
                  bottom-0
                  left-1/2
                  h-[2px]
                  w-0
                  -translate-x-1/2
                  bg-[#bd9257]
                  transition-all
                  duration-500
                  group-hover:w-8
                "
              />

              {/* Icon */}

              <div
                className="
                  benefit-icon
                  flex
                  h-[48px]
                  w-[48px]
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#dfe1db]
                  bg-[#faf9f5]
                  text-[#173a2c]

                  transition-all
                  duration-500

                  group-hover:border-[#bd9257]/50
                  group-hover:bg-[#fffdf8]
                  group-hover:text-[#bd9257]

                  sm:h-[52px]
                  sm:w-[52px]
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
              </div>

              {/* Text */}

              <div
                className="
                  benefit-text
                  mt-4
                  flex
                  flex-col
                "
              >
                <label
                  className="
                    text-[11px]
                    font-bold
                    leading-6
                    text-[#173a2c]

                    sm:text-[12px]
                    lg:text-[13px]
                  "
                >
                  {item.title}
                </label>

                <label
                  className="
                    mt-1
                    text-[9px]
                    leading-5
                    text-[#858983]

                    sm:text-[10px]
                    lg:text-[10px]
                  "
                >
                  {item.description}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}