import { Link } from "react-router-dom";

export default function DesktopMenu() {
  return (
    <div className="hidden border-b border-[#eeeeee] lg:block">
      <div
        className="
          mx-auto
          flex
          h-[54px]
          max-w-[1650px]
          items-center
          px-6
        "
      >
        <nav className="flex h-full items-center gap-2 xl:gap-3">
          <NavItem text="خانه" to="/" />

          {/* محصولات */}
          <div className="group relative flex h-full items-center">
            <button
              type="button"
              className="
                flex
                h-[38px]
                items-center
                justify-center
                gap-2
                rounded-[8px]
                px-4
                text-[13px]
                font-medium
                text-[#333]
                whitespace-nowrap
                transition-all
                duration-200
                hover:bg-[#edf5f0]
                hover:text-[#166534]
              "
            >
              <span>محصولات</span>

              <i
                className="
                  bi
                  bi-chevron-down
                  text-[9px]
                  transition-transform
                  duration-200
                  group-hover:rotate-180
                "
              />
            </button>

            {/* منوی محصولات */}
            <div
              className="
                invisible
                absolute
                right-0
                top-full
                z-50
                w-[230px]
                translate-y-2
                rounded-[11px]
                border
                border-[#eeeeee]
                bg-white
                p-2
                opacity-0
                shadow-[0_15px_45px_rgba(0,0,0,0.10)]
                transition-all
                duration-200
                group-hover:visible
                group-hover:translate-y-0
                group-hover:opacity-100
              "
            >
              <ProductCategory
                title="پارچه"
                items={[
                  "پارچه مجلسی",
                  "پارچه نخی",
                  "پارچه تابستانی",
                  "پارچه زمستانی",
                ]}
              />

              <ProductCategory
                title="پوشاک"
                items={[
                  "تیشرت",
                  "شلوار",
                  "لباس مردانه",
                  "لباس زنانه",
                ]}
              />

              <ProductCategory
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

          <NavItem text="مقالات" to="/Articles" />
          <NavItem text="درباره ما" to="/about" />
          <NavItem text="تماس با ما" to="/contact" />
        </nav>

        {/* تلفن */}
        <a
          href="tel:02532939863"
          className="
            mr-auto
            flex
            h-[38px]
            items-center
            justify-center
            gap-3
            rounded-[8px]
            px-4
            text-[13px]
            font-medium
            text-[#333]
            whitespace-nowrap
            transition-all
            duration-200
            hover:bg-[#edf5f0]
            hover:text-[#166534]
          "
        >
          <span>۰۲۵-۳۲۹۳۹۸۶۳</span>

          <i className="bi bi-telephone text-[16px] text-green-950" />
        </a>
      </div>
    </div>
  );
}

/* =========================
   Nav Item
========================= */

function NavItem({ text, to }) {
  return (
    <Link
      to={to}
      className="
        flex
        h-[38px]
        items-center
        justify-center
        rounded-[8px]
        px-4
        text-[13px]
        font-medium
        text-[#333]
        whitespace-nowrap
        transition-all
        duration-200
        hover:bg-[#edf5f0]
        hover:text-[#166534]
      "
    >
      {text}
    </Link>
  );
}

/* =========================
   Product Category
========================= */

function ProductCategory({ title, items }) {
  return (
    <div className="group/category relative">
      <button
        type="button"
        className="
          flex
          h-[40px]
          w-full
          items-center
          justify-between
          rounded-[7px]
          px-3
          text-right
          text-[12px]
          font-medium
          text-[#444]
          transition-all
          duration-200
          hover:bg-[#edf5f0]
          hover:text-[#166534]
        "
      >
        <span>{title}</span>

        <i
          className="
            bi
            bi-chevron-left
            text-[9px]
            text-[#999]
            transition-colors
            duration-200
            group-hover/category:text-[#166534]
          "
        />
      </button>

      {/* زیرمنو */}
      <div
        className="
          invisible
          absolute
          right-full
          top-0
          mr-2
          z-50
          w-[210px]
          translate-x-2
          rounded-[10px]
          border
          border-[#eeeeee]
          bg-white
          p-2
          opacity-0
          shadow-[0_15px_45px_rgba(0,0,0,0.10)]
          transition-all
          duration-200
          group-hover/category:visible
          group-hover/category:translate-x-0
          group-hover/category:opacity-100
        "
      >
        {items.map((item) => (
          <Link
            key={item}
            to={`/products/${item}`}
            className="
              flex
              h-[38px]
              w-full
              items-center
              rounded-[7px]
              px-3
              text-[12px]
              text-[#555]
              whitespace-nowrap
              transition-all
              duration-200
              hover:bg-[#edf5f0]
              hover:text-[#15803d]
            "
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
}