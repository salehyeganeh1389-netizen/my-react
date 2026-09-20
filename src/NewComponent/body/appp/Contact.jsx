import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const branch = {
  title: "شعبه مرکزی",
  address:
    "قم، خیابان ۱۹ دی، مجتمع تجاری حجت، طبقه ۳، پلاک ۱۴۴",
  hours: "۱۰ الی ۱۴ - ۱۶ الی ۲۲",
  phone: "۰۲۵-۳۷۷۲۳۱۴۵",
  phoneLink: "02537723145",
};

export default function Contact() {
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

   

      // هدر
      tl.fromTo(
        ".contact-header",
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.35"
      );

      // محتوای اصلی
      tl.fromTo(
        ".contact-main",
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.35"
      );

      // کارت‌های پایین
      tl.fromTo(
        ".contact-box",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.12,
          ease: "power3.out",
        },
        "-=0.4"
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={pageRef}
      dir="rtl"
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#fcfbf9]
        text-[#222]
      "
    >
      {/* =========================
          Page Reveal Line
      ========================= */}

     

      {/* =========================
          Header
      ========================= */}

      <section className="border-b border-[#eeeeee] bg-white">
        <div
          className="
            contact-header
            mx-auto
            max-w-[1200px]
            px-5
            py-12
            text-center
            opacity-0
            sm:px-8
            sm:py-14
          "
        >
          <span
            className="
              mb-4
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-[#edf5f0]
              px-4
              py-1.5
              text-[11px]
              font-medium
              text-[#166534]
            "
          >
            <i className="bi bi-headset text-[13px]" />
            ارتباط با ما
          </span>

          <h1
            className="
              text-[25px]
              font-bold
              tracking-tight
              text-[#222]
              sm:text-[31px]
            "
          >
            در کنار شما هستیم
          </h1>

          <p
            className="
              mx-auto
              mt-4
              max-w-[600px]
              text-[12px]
              leading-7
              text-[#777]
              sm:text-[13px]
            "
          >
            برای خرید، پیگیری سفارش و دریافت راهنمایی می‌توانید
            از طریق راه‌های ارتباطی قماش شیخ الاسلامی با ما در
            تماس باشید.
          </p>
        </div>
      </section>

      {/* =========================
          Main Content
      ========================= */}

      <div
        className="
          contact-main
          mx-auto
          max-w-[1200px]
          px-5
          py-10
          opacity-0
          sm:px-8
          sm:py-14
          lg:py-16
        "
      >
        {/* =========================
            Branch + Map
        ========================= */}

        <section
          className="
            grid
            grid-cols-1
            gap-5
            lg:grid-cols-[0.85fr_1.15fr]
            lg:gap-6
          "
        >
          {/* اطلاعات شعبه */}

          <article
            className="
              flex
              flex-col
              justify-between
              rounded-[18px]
              border
              border-[#e9e6df]
              bg-white
              p-6
              sm:p-7
              lg:p-8
            "
          >
            <div>
              <div className="mb-7 flex items-center gap-3">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-[12px]
                    bg-[#edf5f0]
                    text-[#166534]
                  "
                >
                  <i className="bi bi-geo-alt text-[18px]" />
                </div>

                <div>
                  <p className="text-[10px] text-[#999]">
                    آدرس و اطلاعات
                  </p>

                  <h2 className="mt-1 text-[17px] font-bold text-[#222]">
                    {branch.title}
                  </h2>
                </div>
              </div>

              <div className="space-y-5">
                {/* آدرس */}

                <div className="flex items-start gap-3">
                  <div
                    className="
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-[9px]
                      bg-[#f7f8f6]
                      text-[#777]
                    "
                  >
                    <i className="bi bi-geo-alt text-[13px]" />
                  </div>

                  <div>
                    <p className="text-[10px] text-[#999]">
                      آدرس
                    </p>

                    <p className="mt-1 text-[12px] leading-6 text-[#555]">
                      {branch.address}
                    </p>
                  </div>
                </div>

                {/* ساعت کاری */}

                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-[9px]
                      bg-[#f7f8f6]
                      text-[#777]
                    "
                  >
                    <i className="bi bi-clock text-[13px]" />
                  </div>

                  <div>
                    <p className="text-[10px] text-[#999]">
                      ساعت کاری
                    </p>

                    <p className="mt-1 text-[12px] text-[#555]">
                      {branch.hours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* تلفن */}

            <a
              href={`tel:${branch.phoneLink}`}
              dir="ltr"
              className="
                mt-8
                flex
                items-center
                justify-between
                rounded-[12px]
                bg-[#173a2c]
                px-4
                py-3.5
                text-white
                transition-all
                duration-300
                hover:bg-[#124b32]
              "
            >
              <span className="flex items-center gap-2.5">
                <i className="bi bi-telephone text-[13px]" />

                <span className="text-[12px] font-medium">
                  {branch.phone}
                </span>
              </span>

              <i className="bi bi-arrow-left text-[12px]" />
            </a>
          </article>

          {/* =========================
              Map
          ========================= */}

          <article
            className="
              overflow-hidden
              rounded-[18px]
              border
              border-[#e9e6df]
              bg-white
              p-1.5
              shadow-[0_10px_40px_rgba(0,0,0,0.035)]
            "
          >
            <iframe
              title="موقعیت شعبه مرکزی قماش شیخ الاسلامی"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.2960065879697!2d50.863823275589176!3d34.621959287433945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f93bd7f8b853ef7%3A0x21ca229e9223aa01!2z2YLZhdin2LQg2LHZiNit2KfZhtuM!5e0!3m2!1sen!2s!4v1787574388144!5m2!1sen!2s"
              className="
                block
                h-[310px]
                w-full
                rounded-[14px]
                border-0
                sm:h-[380px]
                lg:h-full
                lg:min-h-[390px]
              "
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </article>
        </section>

        {/* =========================
            Bottom Boxes
        ========================= */}

        <section
          className="
            mt-6
            grid
            grid-cols-1
            gap-5
            lg:grid-cols-2
          "
        >
          {/* واحدهای داخلی */}

          <div
            className="
              contact-box
              rounded-[16px]
              border
              border-[#e9e6df]
              bg-white
              p-6
              sm:p-7
            "
          >
            <div className="mb-5 flex items-center gap-3">
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-[11px]
                  bg-[#edf5f0]
                  text-[#166534]
                "
              >
                <i className="bi bi-telephone text-[17px]" />
              </div>

              <div>
                <h2 className="text-[15px] font-bold">
                  واحدهای داخلی
                </h2>

                <p className="mt-1 text-[11px] text-[#888]">
                  ارتباط مستقیم با واحدهای مجموعه
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <ContactUnit
                title="واحد فروش"
                phone="۰۲۵ - ۳۲ ۹۳ ۹۸ ۶۳"
                phoneLink="02532939863"
                icon="bi-shop"
              />

              <ContactUnit
                title="واحد پیگیری"
                phone="۰۹۱۰ ۲۵۸ ۸۲ ۷۷"
                phoneLink="09102588277"
                icon="bi-box-seam"
              />
            </div>
          </div>

          {/* شبکه‌های اجتماعی */}

          <div
            className="
              contact-box
              rounded-[16px]
              border
              border-[#e9e6df]
              bg-white
              p-6
              sm:p-7
            "
          >
            <div className="mb-5 flex items-center gap-3">
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-[11px]
                  bg-[#edf5f0]
                  text-[#166534]
                "
              >
                <i className="bi bi-share text-[17px]" />
              </div>

              <div>
                <h2 className="text-[15px] font-bold">
                  شبکه‌های اجتماعی
                </h2>

                <p className="mt-1 text-[11px] text-[#888]">
                  ما را در شبکه‌های اجتماعی دنبال کنید
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <SocialLink
                title="اینستاگرام"
                username="@ghomasherohani"
                href="https://www.instagram.com/ghomasherohani"
                icon="bi-instagram"
              />

              <SocialLink
                title="روبیکا"
                username="@ghomashrohani"
                href="https://rubika.ir/ghomashrohani"
                icon="bi-camera-video"
              />

              <SocialLink
                title="ایتا"
                username="@ghomasherohani"
                href="https://eitaa.com/ghomasherohani"
                icon="bi-chat-dots"
              />

              <SocialLink
                title="بله"
                username="@ghomashrohani"
                href="https://ble.ir/ghomashrohani"
                icon="bi-chat"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

/* =========================
   Contact Unit
========================= */

function ContactUnit({
  title,
  phone,
  phoneLink,
  icon,
}) {
  return (
    <a
      href={`tel:${phoneLink}`}
      className="
        group
        flex
        items-center
        justify-between
        rounded-[11px]
        border
        border-[#eeeeee]
        bg-[#fcfbf9]
        p-4
        transition-all
        duration-300
        hover:border-[#d8e3dc]
        hover:bg-[#f7faf8]
      "
    >
      <div className="flex items-center gap-3">
        <i
          className={`
            bi
            ${icon}
            text-[16px]
            text-[#166534]
          `}
        />

        <div>
          <p className="text-[11px] text-[#888]">
            {title}
          </p>

          <p
            dir="ltr"
            className="mt-1 text-[12px] font-semibold text-[#333]"
          >
            {phone}
          </p>
        </div>
      </div>

      <i
        className="
          bi
          bi-arrow-left
          text-[12px]
          text-[#aaa]
          transition
          group-hover:-translate-x-1
          group-hover:text-[#166534]
        "
      />
    </a>
  );
}

/* =========================
   Social Link
========================= */

function SocialLink({
  title,
  username,
  href,
  icon,
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group
        flex
        items-center
        gap-3
        rounded-[11px]
        border
        border-[#eeeeee]
        bg-[#fcfbf9]
        p-3.5
        transition-all
        duration-300
        hover:border-[#d8e3dc]
        hover:bg-[#f7faf8]
      "
    >
      <div
        className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-white
          text-[#555]
          shadow-sm
          transition
          duration-300
          group-hover:text-[#166534]
        "
      >
        <i className={`bi ${icon} text-[14px]`} />
      </div>

      <div>
        <p className="text-[11px] text-[#888]">
          {title}
        </p>

        <p
          dir="ltr"
          className="mt-0.5 text-[11px] font-medium text-[#444]"
        >
          {username}
        </p>
      </div>
    </a>
  );
}