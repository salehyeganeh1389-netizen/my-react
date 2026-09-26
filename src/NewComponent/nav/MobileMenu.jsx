import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

export default function MobileMenu({ mobileMenu, setMobileMenu }) {
  const [productsMenu, setProductsMenu] = useState(false);

  const menuRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const menu = menuRef.current;

    if (!menu) return;

    if (mobileMenu) {
      gsap.set(menu, {
        display: "block",
      });

      gsap.fromTo(
        menu,
        {
          x: "100%",
        },
        {
          x: "0%",
          duration: 0.55,
          ease: "power4.out",
        }
      );

      gsap.fromTo(
        itemsRef.current,
        {
          x: 20,
          opacity: 0,
          filter: "blur(5px)",
        },
        {
          x: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.45,
          stagger: 0.06,
          delay: 0.15,
          ease: "power3.out",
        }
      );
    } else {
      gsap.to(menu, {
        x: "100%",
        duration: 0.4,
        ease: "power3.inOut",
        onComplete: () => {
          gsap.set(menu, {
            display: "none",
          });
        },
      });
    }
  }, [mobileMenu]);

  // بستن با ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setMobileMenu(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setMobileMenu]);

  return (
    <>
      {/* Overlay */}
      <div
  onClick={() => setMobileMenu(false)}
  className={`
    fixed
    inset-0
    z-[190]
    bg-black/30
    backdrop-blur-[2px]
    transition-opacity
    duration-300
    lg:hidden
    ${
      mobileMenu
        ? "pointer-events-auto opacity-100"
        : "pointer-events-none opacity-0"
    }
  `}
      />

      {/* Mobile Drawer */}
 <div
  ref={menuRef}
  className="
    fixed
    right-0
    top-0
    z-[200]
          hidden
          h-screen
          w-[85%]
          max-w-[380px]
          overflow-y-auto
          bg-white
          shadow-2xl
          lg:hidden
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#eeeeee] px-5 py-5">
          <span className="text-[15px] font-semibold text-[#333]">
            منوی سایت
          </span>

          <button
            type="button"
            onClick={() => setMobileMenu(false)}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-[#f7f7f7]
              text-[#444]
              transition-all
              duration-300
              hover:bg-[#f0f0f0]
              hover:text-[#166534]
            "
          >
            <i className="bi bi-x-lg text-[14px]" />
          </button>
        </div>

        <nav className="px-4 py-3">

          <div ref={(el) => (itemsRef.current[0] = el)}>
            <MobileItem
              text="خانه"
              to="/"
              onClick={() => setMobileMenu(false)}
            />
          </div>

          <div
            ref={(el) => (itemsRef.current[1] = el)}
            className="border-b border-[#f1f1f1]"
          >
            <button
              type="button"
              onClick={() => setProductsMenu(!productsMenu)}
              className="
                flex
                w-full
                items-center
                justify-between
                py-4
                text-[13px]
                font-medium
                text-[#333]
              "
            >
              <span>محصولات</span>

              <i
                className={`
                  bi
                  bi-chevron-down
                  text-[11px]
                  transition-transform
                  duration-300
                  ${productsMenu ? "rotate-180" : ""}
                `}
              />
            </button>

            <div
              className={`
                overflow-hidden
                transition-all
                duration-500
                ${
                  productsMenu
                    ? "max-h-[500px] pb-2"
                    : "max-h-0"
                }
              `}
            >
              <MobileProduct
                title="پارچه"
                items={[
                  "پارچه مجلسی",
                  "پارچه نخی",
                  "پارچه تابستانی",
                  "پارچه زمستانی",
                ]}
                onNavigate={() => setMobileMenu(false)}
              />

              <MobileProduct
                title="پوشاک"
                items={[
                  "تیشرت",
                  "شلوار",
                  "لباس مردانه",
                  "لباس زنانه",
                ]}
                onNavigate={() => setMobileMenu(false)}
              />

              <MobileProduct
                title="سایر محصولات"
                items={[
                  "جوراب",
                  "حوله",
                  "محصولات جدید",
                  "پرفروش‌ها",
                ]}
                onNavigate={() => setMobileMenu(false)}
              />
            </div>
          </div>

          <div ref={(el) => (itemsRef.current[2] = el)}>
            <MobileItem
              text="مقالات"
              to="/blog"
              onClick={() => setMobileMenu(false)}
            />
          </div>

          <div ref={(el) => (itemsRef.current[3] = el)}>
            <MobileItem
              text="درباره ما"
              to="/about"
              onClick={() => setMobileMenu(false)}
            />
          </div>

          <div ref={(el) => (itemsRef.current[4] = el)}>
            <MobileItem
              text="تماس با ما"
              to="/contact"
              onClick={() => setMobileMenu(false)}
            />
          </div>

          <div ref={(el) => (itemsRef.current[5] = el)}>
            <a
              href="tel:02532939863"
              onClick={() => setMobileMenu(false)}
              className="
                mt-2
                flex
                items-center
                gap-3
                rounded-[8px]
                bg-[#faf8f4]
                px-4
                py-4
                text-[13px]
                text-[#333]
                transition-all
                duration-300
                hover:bg-[#f3eee5]
              "
            >
              <i className="bi bi-telephone text-[16px] text-[#166534]" />

              <span>۰۲۵-۳۲۹۳۹۸۶۳</span>
            </a>
          </div>

        </nav>
      </div>
    </>
  );
}

function MobileItem({ text, to, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="
        group
        flex
        w-full
        items-center
        border-b
        border-[#f1f1f1]
        py-4
        text-[13px]
        font-medium
        text-[#333]
        transition-all
        duration-300
        hover:pr-2
        hover:text-[#166534]
      "
    >
      <span>{text}</span>
    </Link>
  );
}

function MobileProduct({ title, items, onNavigate }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mr-3 border-r border-[#e8dfd2]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
          flex
          w-full
          items-center
          justify-between
          px-4
          py-3
          text-[12px]
          text-[#555]
          transition-colors
          duration-300
          hover:text-[#166534]
        "
      >
        <span>{title}</span>

        <i
          className={`
            bi
            bi-chevron-down
            text-[9px]
            transition-transform
            duration-300
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      <div
        className={`
          overflow-hidden
          transition-all
          duration-500
          ${
            open
              ? "max-h-[300px] pb-2"
              : "max-h-0"
          }
        `}
      >
        {items.map((item, index) => (
          <Link
            key={item}
            to="#"
            onClick={onNavigate}
            className="
              block
              px-7
              py-2
              text-[11px]
              text-[#777]
              transition-all
              duration-300
              hover:translate-x-[-4px]
              hover:text-[#166534]
            "
            style={{
              transitionDelay: open
                ? `${index * 40}ms`
                : "0ms",
            }}
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
}