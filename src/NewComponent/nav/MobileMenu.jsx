import { useState } from "react";

export default function MobileMenu({ mobileMenu }) {
  const [productsMenu, setProductsMenu] = useState(false);

  return (
    <div
      className={`
        border-b
        border-[#eeeeee]
        bg-white
        transition-all
        duration-300
        lg:hidden
        ${
          mobileMenu
            ? "max-h-[700px] opacity-100"
            : "max-h-0 overflow-hidden opacity-0"
        }
      `}
    >
      <nav className="px-4 py-3 sm:px-6">

        <MobileItem text="خانه" />

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
          <i className="bi bi-telephone text-[16px] text-[#166534]" />

          <span>۰۲۵-۳۲۹۳۹۸۶۳</span>
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

function MobileProduct({ title, items }) {
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
        "
      >
        <span>{title}</span>

        <i
          className={`
            bi bi-chevron-down
            text-[9px]
            transition-transform
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      <div
        className={`
          overflow-hidden
          transition-all
          duration-200
          ${open ? "max-h-[300px] pb-2" : "max-h-0"}
        `}
      >
        {items.map((item) => (
          <a
            key={item}
            href="#"
            className="
              block
              px-7
              py-2
              text-[11px]
              text-[#777]
              transition
              hover:text-[#166534]
            "
          >
            {item}
          </a>
        ))}
      </div>
    </div>
  );
}