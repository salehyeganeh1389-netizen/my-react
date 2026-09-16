import { useState } from "react";
import MobileProduct from "./MobileProduct";

export default function MobileMenu({ mobileMenu }) {
  const [productsMenu, setProductsMenu] = useState(false);

  return (
    <div
      className={`
        overflow-hidden
        border-b
        border-[#eeeeee]
        bg-white
        transition-all
        duration-300
        lg:hidden
        ${
          mobileMenu
            ? "max-h-[700px] opacity-100"
            : "max-h-0 opacity-0"
        }
      `}
    >

      <nav className="px-4 py-3 sm:px-6">

        <MobileItem text="خانه" />


        {/* محصولات */}
        <div className="border-b border-[#f1f1f1]">

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
                bi bi-chevron-down
                text-[11px]
                transition-transform
                duration-200
                ${productsMenu ? "rotate-180" : ""}
              `}
            />
          </button>


          <div
            className={`
              overflow-hidden
              transition-all
              duration-300
              ${
                productsMenu
                  ? "max-h-[400px] pb-2"
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
            />

            <MobileProduct
              title="پوشاک"
              items={[
                "تیشرت",
                "شلوار",
                "لباس مردانه",
                "لباس زنانه",
              ]}
            />

            <MobileProduct
              title="سایر محصولات"
              items={[
                "جوراب",
                "حوله",
                "محصولات جدید",
                "پرفروش‌ها",
              ]}
            />

          </div>
        </div>


        <MobileItem text="مقالات" />

        <MobileItem text="درباره ما" />

        <MobileItem text="تماس با ما" />


        {/* تلفن */}
        <a
          href="tel:02532939863"
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
          "
        >
          <i className="bi bi-telephone text-[16px] text-[#bd9257]" />

          <span>
            ۰۲۵-۳۲۹۳۹۸۶۳
          </span>
        </a>

      </nav>
    </div>
  );
}


function MobileItem({ text }) {
  return (
    <a
      href="#"
      className="
        flex
        w-full
        border-b
        border-[#f1f1f1]
        py-4
        text-[13px]
        font-medium
        text-[#333]
      "
    >
      {text}
    </a>
  );
}
