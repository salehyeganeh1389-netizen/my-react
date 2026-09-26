import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Select from "react-select";

gsap.registerPlugin(ScrollTrigger);

const branch = {
  title: "شعبه مرکزی",
  address: "قم، خیابان ۱۹ دی، مجتمع تجاری حجت، طبقه ۳، پلاک ۱۴۴",
  hours: "۱۰ الی ۱۴ - ۱۶ الی ۲۲",
  phone: "۰۲۵-۳۷۷۲۳۱۴۵",
  phoneLink: "02537723145",
};

const socials = [
  {
    title: "اینستاگرام",
    username: "@ghomasherohani",
    href: "https://www.instagram.com/ghomasherohani",
    icon: "bi-instagram",
  },
  {
    title: "روبیکا",
    username: "@ghomashrohani",
    href: "https://rubika.ir/ghomashrohani",
    icon: "bi-camera-video",
  },
  {
    title: "ایتا",
    username: "@ghomasherohani",
    href: "https://eitaa.com/ghomasherohani",
    icon: "bi-chat-dots",
  },
  {
    title: "بله",
    username: "@ghomashrohani",
    href: "https://ble.ir/ghomashrohani",
    icon: "bi-chat",
  },
];

export default function Contact() {
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* =========================
         HERO
      ========================= */

      const hero = gsap.timeline();

      hero
        .fromTo(
          ".contact-breadcrumb",
          {
            opacity: 0,
            y: 12,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power3.out",
          },
        )
        .fromTo(
          ".contact-title",
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
          },
          "-=0.2",
        )
        .fromTo(
          ".contact-description",
          {
            opacity: 0,
            y: 18,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power3.out",
          },
          "-=0.3",
        )
        .fromTo(
          ".contact-hero-image",
          {
            opacity: 0,
            scale: 1.06,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.7",
        );

      /* =========================
         SECTIONS
      ========================= */

      gsap.utils.toArray(".contact-section").forEach((section) => {
        gsap.fromTo(
          section,
          {
            opacity: 0,
            y: 30,
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
          },
        );
      });

      /* =========================
         BRANCH ITEMS
      ========================= */

      gsap.fromTo(
        ".branch-item",
        {
          opacity: 0,
          x: 20,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.55,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".branch-card",
            start: "top 82%",
            once: true,
          },
        },
      );

      /* =========================
         SOCIAL CARDS
      ========================= */

      gsap.fromTo(
        ".social-card",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".social-grid",
            start: "top 85%",
            once: true,
          },
        },
      );

      /* =========================
         FORM
      ========================= */

      gsap.fromTo(
        ".form-item",
        {
          opacity: 0,
          y: 15,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-form",
            start: "top 82%",
            once: true,
          },
        },
      );

      /* =========================
         SUPPORT
      ========================= */

      gsap.fromTo(
        ".support-box",
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
            trigger: ".support-box",
            start: "top 88%",
            once: true,
          },
        },
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={pageRef}
      dir="rtl"
      className="
        min-h-screen
        overflow-hidden
        bg-[#faf9f6]
        text-[#222]
      "
    >
      {/* ==================================================
          HERO
      ================================================== */}

      <section
        className="
          relative
          overflow-hidden
          bg-[#f1eee7]
        "
      >
        <div
          className="
            mx-auto
            grid
            min-h-[350px]
            max-w-[1500px]
            grid-cols-1
            lg:min-h-[400px]
            lg:grid-cols-2
          "
        >
          {/* IMAGE */}

          <div
            className="
              contact-hero-image
              order-1
              h-[250px]
              overflow-hidden
              lg:order-1
              lg:h-auto
            "
          >
            <div
              className="
                h-full
                w-full
                bg-cover
                bg-center
              "
              style={{
                backgroundImage:
                  "url('file_00000000d58c820da9bfbc1b74d4fefb.png')",
              }}
            />

            <div
              className="
                absolute
                inset-y-0
                left-0
                hidden
                w-36
                bg-gradient-to-r
                from-[#f1eee7]
                to-transparent
                lg:block
              "
            />
          </div>

          {/* TEXT */}

          <div
            className="
              order-2
              flex
              items-center
              px-6
              py-10
              sm:px-10
              lg:order-2
              lg:px-14
              xl:px-20
            "
          >
            <div className="w-full">
              {/* Breadcrumb */}

              <div
                className="
                  contact-breadcrumb
                  mb-4
                  flex
                  items-center
                  gap-2
                  text-[11px]
                  text-[#999]
                "
              >
                <span>خانه</span>

                <i className="bi bi-chevron-left text-[7px]" />

                <span className="font-medium text-[#166534]">
                  تماس با ما
                </span>
              </div>

              {/* Title */}

              <h1
                className="
                  contact-title
                  text-[38px]
                  font-bold
                  tracking-tight
                  text-[#173a2c]
                  sm:text-[44px]
                  lg:text-[50px]
                  xl:text-[56px]
                "
              >
                تماس با ما
              </h1>

              {/* Description */}

              <p
                className="
                  contact-description
                  mt-4
                  max-w-[560px]
                  text-[13px]
                  leading-8
                  text-[#555]
                  sm:text-[14px]
                "
              >
                برای خرید، پیگیری سفارش، دریافت اطلاعات محصولات و راهنمایی
                بیشتر، از طریق راه‌های ارتباطی زیر با ما در تماس باشید.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          CONTENT
      ================================================== */}

      <div
        className="
          mx-auto
          max-w-[1200px]
          px-5
          py-10
          sm:px-8
          sm:py-12
          lg:py-14
        "
      >
        {/* ==================================================
            BRANCH + MAP
        ================================================== */}

        <section
          className="
            contact-section
            grid
            grid-cols-1
            gap-5
            lg:grid-cols-[410px_1fr]
          "
        >
          {/* BRANCH */}

          <article
            className="
              branch-card
              relative
              overflow-hidden
              rounded-[14px]
              border
              border-[#e8e6e0]
              bg-white
              p-5
              sm:p-6
            "
          >
            <div
              className="
                pointer-events-none
                absolute
                bottom-[-65px]
                left-[-45px]
                opacity-[0.035]
              "
            >
              <i className="bi bi-shop text-[170px]" />
            </div>

            <div className="relative z-10">
              {/* Heading */}

              <div className="mb-6">
                <p className="text-[10px] font-medium text-[#168052]">
                  آدرس و اطلاعات
                </p>

                <h2 className="mt-2 text-[21px] font-bold text-[#222]">
                  {branch.title}
                </h2>
              </div>

              {/* Address */}

              <div className="branch-item flex items-start gap-3">
                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-[9px]
                    bg-[#f1f6f3]
                    text-[#166534]
                  "
                >
                  <i className="bi bi-geo-alt text-[14px]" />
                </div>

                <div>
                  <p className="text-[10px] text-[#999]">آدرس</p>

                  <p className="mt-1.5 text-[12px] leading-6 text-[#444]">
                    {branch.address}
                  </p>
                </div>
              </div>

              <div className="my-5 h-px bg-[#efede8]" />

              {/* Hours */}

              <div className="branch-item flex items-center gap-3">
                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-[9px]
                    bg-[#f1f6f3]
                    text-[#166534]
                  "
                >
                  <i className="bi bi-clock text-[14px]" />
                </div>

                <div>
                  <p className="text-[10px] text-[#999]">ساعت کاری</p>

                  <p className="mt-1.5 text-[12px] text-[#444]">
                    {branch.hours}
                  </p>
                </div>
              </div>

              <div className="my-5 h-px bg-[#efede8]" />

              {/* Phone */}

              <div className="branch-item flex items-center gap-3">
                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-[9px]
                    bg-[#f1f6f3]
                    text-[#166534]
                  "
                >
                  <i className="bi bi-telephone text-[13px]" />
                </div>

                <div>
                  <p className="text-[10px] text-[#999]">تلفن تماس</p>

                  <p
                    dir="ltr"
                    className="mt-1.5 text-[12px] font-semibold text-[#333]"
                  >
                    {branch.phone}
                  </p>
                </div>
              </div>

              {/* Call */}

              <a
                href={`tel:${branch.phoneLink}`}
                className="
                  mt-6
                  flex
                  h-[43px]
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-[9px]
                  bg-[#006b4f]
                  text-[10px]
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:bg-[#00563f]
                  hover:shadow-[0_7px_18px_rgba(0,107,79,0.15)]
                "
              >
                تماس با ما
                <i className="bi bi-telephone text-[11px]" />
                <i className="bi bi-arrow-left text-[9px]" />
              </a>
            </div>
          </article>

          {/* MAP */}

          <article
            className="
              overflow-hidden
              rounded-[14px]
              border
              border-[#e8e6e0]
              bg-white
              p-1
            "
          >
            <div className="relative h-[320px] sm:h-[370px] lg:h-full lg:min-h-[390px]">
              <iframe
                title="موقعیت شعبه مرکزی قماش شیخ الاسلامی"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.2960065879697!2d50.863823275589176!3d34.621959287433945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f93bd7f8b853ef7%3A0x21ca229e9223aa01!2z2YLZhdin2LQg2LHZiNit2KfZhtuM!5e0!3m2!1sen!2s!4v1787574388144!5m2!1sen!2s"
                className="
                  block
                  h-full
                  w-full
                  rounded-[10px]
                  border-0
                "
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  left-1/2
                  top-8
                  hidden
                  -translate-x-1/2
                  rounded-[9px]
                  bg-white
                  px-5
                  py-2.5
                  shadow-[0_8px_25px_rgba(0,0,0,0.12)]
                  sm:block
                "
              >
                <p className="text-[10px] font-bold text-[#222]">
                  قماش شیخ الاسلامی
                </p>

                <p className="mt-1 text-[8px] text-[#999]">
                  مجتمع تجاری حجت
                </p>
              </div>
            </div>
          </article>
        </section>

        {/* ==================================================
            LOWER AREA
        ================================================== */}

        <section
          className="
            mt-5
            grid
            grid-cols-1
            gap-5
            lg:grid-cols-[1fr_440px]
          "
        >
          {/* LEFT */}

          <div className="space-y-5">
            {/* SOCIAL */}

            <article
              className="
                contact-section
                rounded-[14px]
                border
                border-[#e8e6e0]
                bg-white
                p-5
                sm:p-6
              "
            >
              <h2 className="text-[16px] font-bold text-[#222]">
                راه‌های ارتباطی سریع
              </h2>

              <p className="mt-2 text-[11px] text-[#999]">
                از طریق شبکه‌های اجتماعی نیز می‌توانید با ما در ارتباط باشید.
              </p>

              <div
                className="
                  social-grid
                  mt-5
                  grid
                  grid-cols-2
                  gap-3
                  sm:grid-cols-4
                "
              >
                {socials.map((social) => (
                  <SocialCard key={social.title} {...social} />
                ))}
              </div>
            </article>

            {/* SUPPORT */}

            <article
              className="
                support-box
                relative
                min-h-[140px]
                overflow-hidden
                rounded-[14px]
                bg-[#073e2f]
                px-6
                py-6
                text-white
                sm:px-8
              "
            >
              <i
                className="
                  bi
                  bi-headset
                  pointer-events-none
                  absolute
                  bottom-[-40px]
                  left-8
                  text-[150px]
                  text-white/[0.035]
                "
              />

              <div
                className="
                  relative
                  z-10
                  flex
                  h-full
                  items-center
                  justify-between
                  gap-5
                "
              >
                <div>
                  <h3 className="text-[17px] font-bold">
                    هر سوالی دارید، ما در کنار شما هستیم
                  </h3>

                  <p className="mt-2 max-w-[470px] text-[10px] leading-6 text-white/60">
                    تیم پشتیبانی قماش شیخ الاسلامی آماده پاسخگویی به سوالات
                    شماست.
                  </p>

                  <a
                    href={`tel:${branch.phoneLink}`}
                    className="
                      mt-4
                      inline-flex
                      items-center
                      gap-2
                      rounded-[8px]
                      border
                      border-white/20
                      px-4
                      py-2
                      text-[9px]
                      text-white
                      transition-all
                      duration-300
                      hover:bg-white/10
                    "
                  >
                    تماس با پشتیبانی
                    <i className="bi bi-arrow-left text-[9px]" />
                  </a>
                </div>

                <div
                  className="
                    hidden
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-[10px]
                    bg-white/[0.08]
                    sm:flex
                  "
                >
                  <i className="bi bi-headset text-[20px]" />
                </div>
              </div>
            </article>
          </div>

          {/* FORM */}

          <article
            className="
              contact-form
              contact-section
              rounded-[14px]
              border
              border-[#e8e6e0]
              bg-white
              p-5
              shadow-[0_8px_30px_rgba(0,0,0,0.035)]
            "
          >
            {/* Form Header */}

            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-[16px] font-bold text-[#222]">
                  ارسال پیام
                </h2>

                <p className="mt-1.5 text-[10px] text-[#999]">
                  پاسخ‌گوی سوالات شما هستیم
                </p>
              </div>

              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-[9px]
                  bg-[#eef7f3]
                  text-[#006b4f]
                "
              >
                <i className="bi bi-chat-dots text-[14px]" />
              </div>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-3.5"
            >
              {/* Name + Phone */}

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="form-item">
                  <label className="mb-1.5 block text-[10px] font-medium text-[#666]">
                    نام و نام خانوادگی
                    <span className="mr-1 text-[#c46b55]">*</span>
                  </label>

                  <input
                    type="text"
                    placeholder="نام شما"
                    className="
                      h-[41px]
                      w-full
                      rounded-[8px]
                      border
                      border-[#e6e4df]
                      bg-[#fafaf9]
                      px-3
                      text-[10px]
                      text-[#333]
                      outline-none
                      transition-all
                      duration-200
                      placeholder:text-[#aaa]
                      hover:border-[#d4d2cb]
                      focus:border-[#91ae9f]
                      focus:bg-white
                      focus:ring-[3px]
                      focus:ring-[#006b4f]/[0.05]
                    "
                  />
                </div>

                <div className="form-item">
                  <label className="mb-1.5 block text-[10px] font-medium text-[#666]">
                    شماره موبایل
                    <span className="mr-1 text-[#c46b55]">*</span>
                  </label>

                  <input
                    type="tel"
                    dir="ltr"
                    placeholder="0912..."
                    className="
                      h-[41px]
                      w-full
                      rounded-[8px]
                      border
                      border-[#e6e4df]
                      bg-[#fafaf9]
                      px-3
                      text-[10px]
                      text-[#333]
                      outline-none
                      transition-all
                      duration-200
                      placeholder:text-[#aaa]
                      hover:border-[#d4d2cb]
                      focus:border-[#91ae9f]
                      focus:bg-white
                      focus:ring-[3px]
                      focus:ring-[#006b4f]/[0.05]
                    "
                  />
                </div>
              </div>

              {/* Subject */}

              <div className="form-item relative z-[100]">
                <label className="mb-1.5 block text-[10px] font-medium text-[#666]">
                  موضوع پیام
                  <span className="mr-1 text-[#c46b55]">*</span>
                </label>

                <Select
                  placeholder="موضوع پیام را انتخاب کنید"
                  isSearchable={false}
                  menuPlacement="bottom"
                  menuPosition="fixed"
                  menuPortalTarget={
                    typeof document !== "undefined"
                      ? document.body
                      : null
                  }
                  options={[
                    {
                      value: "order",
                      label: "پیگیری سفارش",
                    },
                    {
                      value: "shopping",
                      label: "راهنمایی خرید",
                    },
                    {
                      value: "product",
                      label: "اطلاعات محصول",
                    },
                    {
                      value: "stock",
                      label: "موجودی و سایزبندی",
                    },
                    {
                      value: "feedback",
                      label: "پیشنهاد و انتقاد",
                    },
                    {
                      value: "cooperation",
                      label: "همکاری",
                    },
                    {
                      value: "other",
                      label: "سایر",
                    },
                  ]}
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      minHeight: "41px",
                      height: "41px",
                      borderRadius: "8px",
                      borderColor: state.isFocused
                        ? "#91ae9f"
                        : "#e6e4df",
                      backgroundColor: state.isFocused
                        ? "#ffffff"
                        : "#fafaf9",
                      boxShadow: state.isFocused
                        ? "0 0 0 3px rgba(0,107,79,0.05)"
                        : "none",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        borderColor: "#d4d2cb",
                      },
                    }),

                    valueContainer: (base) => ({
                      ...base,
                      padding: "0 12px",
                    }),

                    singleValue: (base) => ({
                      ...base,
                      fontSize: "10px",
                      color: "#555",
                      margin: 0,
                    }),

                    placeholder: (base) => ({
                      ...base,
                      fontSize: "10px",
                      color: "#aaa",
                    }),

                    indicatorSeparator: () => ({
                      display: "none",
                    }),

                    dropdownIndicator: (base, state) => ({
                      ...base,
                      padding: "0 10px",
                      color: "#999",
                      transform: state.selectProps.menuIsOpen
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.25s ease",
                      "&:hover": {
                        color: "#006b4f",
                      },
                    }),

                    /* =========================
                       DROPDOWN
                       پایین باز می‌شود
                       و روی فیلد بعدی قرار می‌گیرد
                    ========================= */

                    menuPortal: (base) => ({
                      ...base,
                      zIndex: 999999,
                    }),

                    menu: (base) => ({
                      ...base,
                      marginTop: "6px",
                      marginBottom: 0,
                      borderRadius: "10px",
                      overflow: "hidden",
                      border: "1px solid #e6e4df",
                      boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
                      backgroundColor: "#ffffff",
                      zIndex: 999999,
                    }),

                    menuList: (base) => ({
                      ...base,
                      padding: "5px",
                      maxHeight: "220px",
                    }),

                    option: (base, state) => ({
                      ...base,
                      direction: "rtl",
                      textAlign: "right",
                      borderRadius: "7px",
                      padding: "9px 11px",
                      fontSize: "10px",
                      color: state.isSelected ? "#006b4f" : "#555",
                      backgroundColor: state.isSelected
                        ? "#eef7f3"
                        : state.isFocused
                          ? "#f7faf8"
                          : "transparent",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }),
                  }}
                />
              </div>

              {/* Message */}

              <div className="form-item">
                <label className="mb-1.5 block text-[10px] font-medium text-[#666]">
                  متن پیام
                  <span className="mr-1 text-[#c46b55]">*</span>
                </label>

                <textarea
                  rows="4"
                  maxLength={500}
                  placeholder="پیام خود را بنویسید..."
                  className="
                    min-h-[105px]
                    w-full
                    resize-none
                    rounded-[8px]
                    border
                    border-[#e6e4df]
                    bg-[#fafaf9]
                    px-3
                    py-2.5
                    text-[10px]
                    leading-6
                    text-[#444]
                    outline-none
                    transition-all
                    duration-200
                    placeholder:text-[#aaa]
                    hover:border-[#d4d2cb]
                    focus:border-[#91ae9f]
                    focus:bg-white
                    focus:ring-[3px]
                    focus:ring-[#006b4f]/[0.05]
                  "
                />
              </div>

              {/* Submit */}

              <button
                type="submit"
                className="
                  group
                  flex
                  h-[42px]
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-[8px]
                  bg-[#006b4f]
                  text-[10px]
                  font-bold
                  text-white
                  transition-all
                  duration-300
                  hover:bg-[#00563f]
                  hover:shadow-[0_7px_18px_rgba(0,107,79,0.16)]
                  active:scale-[0.99]
                "
              >
                ارسال پیام

                <i
                  className="
                    bi bi-send
                    text-[10px]
                    transition-transform
                    duration-300
                    group-hover:-translate-x-1
                  "
                />
              </button>
            </form>
          </article>
        </section>
      </div>
    </main>
  );
}

/* ==================================================
   SOCIAL CARD
================================================== */

function SocialCard({ title, username, href, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        social-card
        group
        rounded-[10px]
        border
        border-[#e7e5df]
        bg-[#fdfdfc]
        p-3.5
        text-center
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[#cddbd4]
        hover:bg-white
        hover:shadow-[0_8px_20px_rgba(0,0,0,0.05)]
      "
    >
      <div
        className="
          mx-auto
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-[9px]
          bg-[#f5f5f2]
          text-[#555]
          transition-all
          duration-300
          group-hover:bg-[#edf6f2]
          group-hover:text-[#087553]
        "
      >
        <i className={`bi ${icon} text-[15px]`} />
      </div>

      <p className="mt-2.5 text-[10px] font-semibold text-[#444]">
        {title}
      </p>

      <p dir="ltr" className="mt-1 text-[8px] text-[#999]">
        {username}
      </p>

      <i
        className="
          bi bi-arrow-left
          mt-2.5
          block
          text-[9px]
          text-[#aaa]
          transition-all
          duration-300
          group-hover:-translate-x-1
          group-hover:text-[#087553]
        "
      />
    </a>
  );
}