import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import NavbarTop from "./NavbarTop";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const floatingNavRef = useRef(null);
  const hasEnteredScroll = useRef(false);

  /* =========================
     تشخیص اسکرول
  ========================= */

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;

      if (y > 100) {
        setScrolled(true);
      } else if (y < 160) {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =========================
     انیمیشن Navbar شناور
  ========================= */

  useEffect(() => {
    const navbar = floatingNavRef.current;

    if (!navbar) return;

    gsap.killTweensOf(navbar);

    /* =========================
       ورود Navbar شناور
    ========================= */

    if (scrolled) {
      hasEnteredScroll.current = true;

      gsap.set(navbar, {
        display: "block",
        left: "50%",
        xPercent: -50,
      });

      const tl = gsap.timeline();

      tl.fromTo(
        navbar,
        {
          y: -120,
          opacity: 0,
          scale: 0.82,
          rotationX: -18,
          borderRadius: "35px",
        },
        {
          y: 14,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          borderRadius: "999px",
          duration: 0.9,
          ease: "back.out(1.7)",
        }
      );

      tl.to(navbar, {
        y: 10,
        duration: 0.16,
        ease: "power2.out",
      });

      tl.to(navbar, {
        y: 14,
        duration: 0.28,
        ease: "power2.out",
      });

      return;
    }

    /* =========================
       حذف فوری Navbar شناور
    ========================= */

    if (hasEnteredScroll.current) {
      gsap.set(navbar, {
        display: "none",
        y: 0,
        opacity: 0,
        scale: 1,
        rotationX: 0,
        borderRadius: "999px",
      });

      hasEnteredScroll.current = false;
    }
  }, [scrolled]);

  return (
    <>
      {/* =========================
          Navbar اصلی
      ========================= */}

      <header
        dir="rtl"
        className="relative z-[100] w-full"
      >
        <NavbarTop
          mobileMenu={mobileMenu}
          setMobileMenu={setMobileMenu}
          scrolled={false}
        />

        <DesktopMenu />

        <MobileMenu
          mobileMenu={mobileMenu}
        />
      </header>

      {/* =========================
          Navbar شناور
      ========================= */}

      <header
        ref={floatingNavRef}
        dir="rtl"
        className="
          fixed
          left-1/2
          top-0
          z-[200]
          hidden
          w-[66.666vw]
          max-w-[1100px]
          rounded-full
          border
          border-white/60
          bg-white/55
          shadow-[0_15px_45px_rgba(0,0,0,0.10)]
          backdrop-blur-[22px]
        "
        style={{
          perspective: "1000px",
        }}
      >
        <NavbarTop
          mobileMenu={mobileMenu}
          setMobileMenu={setMobileMenu}
          scrolled={true}
        />
      </header>
    </>
  );
}