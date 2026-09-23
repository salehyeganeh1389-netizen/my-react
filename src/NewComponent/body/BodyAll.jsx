import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import HiroFour from "./hiro/HiroFour.jsx";
import ProductCategories from "./card/ProductCategories";
import ShoppingBenefits from "./ShoppingBenefits";
import LatestArticles from "./appp/LatestArticles.jsx";

export default function BodyAll() {
  const bodyRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      tl.from(".page-hero", {
        opacity: 0,
        y: 80,
        scale: 0.97,
        duration: 1.2,
      })
        .from(
          ".page-benefits",
          {
            opacity: 0,
            y: 70,
            scale: 0.94,
            rotateX: 8,
            duration: 1,
          },
          "-=0.65"
        )
        .from(
          ".page-categories",
          {
            opacity: 0,
            y: 90,
            scale: 0.95,
            duration: 1.1,
          },
          "-=0.55"
        )
        .from(
          ".page-articles",
          {
            opacity: 0,
            y: 70,
            scale: 0.97,
            duration: 1,
          },
          "-=0.5"
        );
    }, bodyRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={bodyRef}>
      <div className="page-hero">
        <HiroFour />
      </div>

      <div className="page-benefits">
        <ShoppingBenefits />
      </div>

      <div className="page-categories">
        <ProductCategories />
      </div>

      {/* فقط ۵ مقاله برای صفحه خانه */}
      <div className="page-articles">
        <LatestArticles />
      </div>
    </div>
  );
}