import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";

export default function MobileBottomNav({ scrolled }) {
  const location = useLocation();
  const navRef = useRef(null);

  const items = [
    {
      title: "خانه",
      to: "/",
      icon: "bi-house",
      activeIcon: "bi-house-fill",
    },
    {
      title: "محصولات",
      to: "/products",
      icon: "bi-grid",
      activeIcon: "bi-grid-fill",
    },
    {
      title: "مقالات",
      to: "/Articles",
      icon: "bi-journal-text",
      activeIcon: "bi-journal-text",
    },
    {
      title: "درباره ما",
      to: "/about",
      icon: "bi-info-circle",
      activeIcon: "bi-info-circle-fill",
    },
    {
      title: "تماس با ما",
      to: "/contact",
      icon: "bi-telephone",
      activeIcon: "bi-telephone-fill",
    },
  ];

  const isActive = (to) => {
    if (to === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(to);
  };

  useEffect(() => {
    const nav = navRef.current;

    if (!nav) return;

    gsap.killTweensOf(nav);

    if (scrolled) {
      gsap.set(nav, {
        display: "block",
        y: 120,
        opacity: 0,
        scale: 0.9,
      });

      gsap.to(nav, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: "back.out(1.5)",
      });
    } else {
      gsap.to(nav, {
        y: 120,
        opacity: 0,
        scale: 0.9,
        duration: 0.45,
        ease: "power3.in",
        onComplete: () => {
          gsap.set(nav, {
            display: "none",
          });
        },
      });
    }
  }, [scrolled]);

  return (
    <nav
      ref={navRef}
      dir="rtl"
      className="
        fixed
        bottom-3
        left-3
        right-3
        z-[180]
        lg:hidden
      "
      style={{
        display: "none",
        transformOrigin: "center bottom",
      }}
    >
      <div
        className="
          mx-auto
          flex
          h-[68px]
          w-full
          max-w-[600px]
          items-center
          justify-around
          rounded-[22px]
          border
          border-white/70
          bg-white
          px-2
          shadow-[0_1px_50px_rgba(0,0,0,0.20)]
          backdrop-blur-[18px]
        "
      >
        {items.map((item) => {
          const active = isActive(item.to);

          return (
            <Link
              key={item.to}
              to={item.to}
              className={`
                flex
                h-full
                min-w-[58px]
                flex-1
                flex-col
                items-center
                justify-center
                gap-1
                rounded-[16px]
                transition-all
                duration-300
                ${
                  active
                    ? "text-[#166534]"
                    : "text-[#777] hover:text-[#166534]"
                }
              `}
            >
              <div
                className={`
                  flex
                  h-[30px]
                  w-[48px]
                  items-center
                  justify-center
                  rounded-full
                  transition-all
                  duration-300
                  ${
                    active
                      ? "bg-[#edf5f0]"
                      : "bg-transparent"
                  }
                `}
              >
                <i
                  className={`
                    bi
                    ${
                      active
                        ? item.activeIcon
                        : item.icon
                    }
                    text-[17px]
                  `}
                />
              </div>

              <span
                className={`
                  whitespace-nowrap
                  text-[10px]
                  transition-all
                  duration-300
                  ${
                    active
                      ? "font-semibold text-[#166534]"
                      : "font-medium"
                  }
                `}
              >
                {item.title}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}