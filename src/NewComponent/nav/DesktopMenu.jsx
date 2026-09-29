import { Link } from "react-router-dom";

export default function DesktopMenu() {
  return (
    <div
      className="
        hidden
        border-b
        border-[#e9e9e9]
        bg-white
        lg:block
      "
    >
      <div
        className="
          mx-auto
          flex
          h-[56px]
          max-w-[1650px]
          items-center
          px-6
        "
      >
        <nav
          className="
            flex
            h-full
            items-center
            gap-1
            xl:gap-2
          "
        >
          {/* خانه */}

          <NavItem
            text="خانه"
            to="/"
          />

          {/* محصولات */}

          <div className="group relative flex h-full items-center">
            <Link
              to="/products"
              className="
                relative
                flex
                h-[40px]
                items-center
                justify-center
                gap-2
                rounded-[9px]
                px-4
                text-[13px]
                font-medium
                text-[#333]
                whitespace-nowrap
                outline-none
                transition-all
                duration-200
                hover:bg-[#edf5f0]
                hover:text-[#166534]
                focus-visible:bg-[#edf5f0]
                focus-visible:text-[#166534]
              "
            >
              <span>محصولات</span>

              <i
                className="
                  bi
                  bi-chevron-down
                  text-[9px]
                  text-[#888]
                  transition-all
                  duration-300
                  group-hover:rotate-180
                  group-hover:text-[#166534]
                "
              />

              {/* خط فعال */}

              <span
                className="
                  absolute
                  bottom-0
                  left-1/2
                  h-[2px]
                  w-0
                  -translate-x-1/2
                  rounded-full
                  bg-[#166534]
                  transition-all
                  duration-300
                  group-hover:w-5
                "
              />
            </Link>

            {/* منوی محصولات */}

            <div
              className="
                invisible
                absolute
                right-0
                top-[calc(100%-1px)]
                z-50
                w-[245px]
                translate-y-3
                rounded-[16px]
                border
                border-[#e8e8e8]
                bg-white
                p-2
                opacity-0
                shadow-[0_22px_60px_rgba(0,0,0,0.12)]
                transition-all
                duration-250
                group-hover:visible
                group-hover:translate-y-0
                group-hover:opacity-100
                group-focus-within:visible
                group-focus-within:translate-y-0
                group-focus-within:opacity-100
              "
            >
              {/* عنوان کوچک */}

              <div
                className="
                  mb-1
                  flex
                  items-center
                  justify-between
                  px-3
                  py-2
                "
              >
                <span className="text-[10px] font-medium text-[#aaa]">
                  دسته‌بندی محصولات
                </span>

                <span
                  className="
                    flex
                    h-6
                    w-6
                    items-center
                    justify-center
                    rounded-full
                    bg-[#f3f7f4]
                    text-[#166534]
                  "
                >
                  <i className="bi bi-grid text-[11px]" />
                </span>
              </div>

              {/* پارچه */}

              <ProductCategory
                title="پارچه"
                to="/products/fabric"
                items={[
                  {
                    title: "پارچه کتان",
                    to: "/products/fabric/cotton",
                  },
                  {
                    title: "پارچه لینن",
                    to: "/products/fabric/linen",
                  },
                  {
                    title: "پارچه رسمی",
                    to: "/products/fabric/formal",
                  },
                  {
                    title: "پارچه کژوال",
                    to: "/products/fabric/casual",
                  },
                  {
                    title: "پارچه کلاسیک",
                    to: "/products/fabric/classic",
                  },
                  {
                    title: "پارچه ویژه",
                    to: "/products/fabric/special",
                  },
                ]}
              />

              {/* پوشاک */}

              <ProductCategory
                title="پوشاک"
                to="/products/clothing"
                items={[
                  {
                    title: "تی‌شرت",
                    to: "/products/clothing/tshirt",
                  },
                  {
                    title: "شلوار",
                    to: "/products/clothing/pants",
                  },
                  {
                    title: "جوراب",
                    to: "/products/clothing/socks",
                  },
                  {
                    title: "حوله",
                    to: "/products/clothing/towel",
                  },
                  {
                    title: "پیراهن",
                    to: "/products/clothing/shirt",
                  },
                  {
                    title: "لباس راحتی",
                    to: "/products/clothing/homewear",
                  },
                ]}
              />

              {/* جداکننده */}

              <div className="my-2 border-t border-[#eeeeee]" />

              {/* مشاهده همه */}

              <Link
                to="/products"
                className="
                  group/all
                  flex
                  h-[42px]
                  w-full
                  items-center
                  justify-between
                  rounded-[9px]
                  bg-[#f2f6f3]
                  px-3
                  text-[12px]
                  font-semibold
                  text-[#166534]
                  transition-all
                  duration-200
                  hover:bg-[#e6f0e9]
                "
              >
                <span>مشاهده همه محصولات</span>

                <span
                  className="
                    flex
                    h-6
                    w-6
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    text-[#166534]
                    shadow-sm
                    transition-transform
                    duration-200
                    group-hover/all:-translate-x-0.5
                  "
                >
                  <i className="bi bi-arrow-left text-[10px]" />
                </span>
              </Link>
            </div>
          </div>

          {/* مقالات */}

          <NavItem
            text="مقالات"
            to="/Articles"
          />

          {/* درباره ما */}

          <NavItem
            text="درباره ما"
            to="/about"
          />

          {/* تماس */}

          <NavItem
            text="تماس با ما"
            to="/contact"
          />
        </nav>

        {/* تلفن */}

        <a
          href="tel:02532939863"
          className="
            group
            mr-auto
            flex
            h-[40px]
            items-center
            justify-center
            gap-3
            rounded-[9px]
            border
            border-transparent
            px-4
            text-[13px]
            font-medium
            text-[#333]
            whitespace-nowrap
            transition-all
            duration-200
            hover:border-[#e1ebe4]
            hover:bg-[#f5f8f6]
            hover:text-[#166534]
          "
        >
          <span
            className="
              direction-ltr
              transition-colors
              duration-200
              group-hover:text-[#166534]
            "
          >
            ۰۲۵-۳۲۹۳۹۸۶۳
          </span>

          <span
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-full
              bg-[#f2f6f3]
              text-[#173a2c]
              transition-all
              duration-200
              group-hover:bg-[#e5f0e8]
              group-hover:text-[#166534]
            "
          >
            <i className="bi bi-telephone text-[13px]" />
          </span>
        </a>
      </div>
    </div>
  );
}

/* =========================================================
   Nav Item
========================================================= */

function NavItem({ text, to }) {
  return (
    <Link
      to={to}
      className="
        group
        relative
        flex
        h-[40px]
        items-center
        justify-center
        rounded-[9px]
        px-4
        text-[13px]
        font-medium
        text-[#333]
        whitespace-nowrap
        outline-none
        transition-all
        duration-200
        hover:bg-[#edf5f0]
        hover:text-[#166534]
        focus-visible:bg-[#edf5f0]
        focus-visible:text-[#166534]
      "
    >
      {text}

      <span
        className="
          absolute
          bottom-0
          left-1/2
          h-[2px]
          w-0
          -translate-x-1/2
          rounded-full
          bg-[#166534]
          transition-all
          duration-300
          group-hover:w-5
        "
      />
    </Link>
  );
}

/* =========================================================
   Product Category
========================================================= */

function ProductCategory({ title, to, items }) {
  return (
    <div className="group/category relative">
      {/* عنوان دسته */}

      <Link
        to={to}
        className="
          group/title
          flex
          h-[44px]
          w-full
          items-center
          justify-between
          rounded-[10px]
          border
          border-transparent
          px-3
          text-right
          text-[12px]
          font-semibold
          text-[#444]
          outline-none
          transition-all
          duration-200
          hover:border-[#e3ebe5]
          hover:bg-[#f4f8f5]
          hover:text-[#166534]
          focus-visible:border-[#e3ebe5]
          focus-visible:bg-[#f4f8f5]
          focus-visible:text-[#166534]
        "
      >
        <div className="flex items-center gap-2.5">
          <span
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-[8px]
              bg-[#f4f6f4]
              text-[#777]
              transition-all
              duration-200
              group-hover/title:bg-white
              group-hover/title:text-[#166534]
            "
          >
            <i
              className={`
                bi
                ${
                  title === "پارچه"
                    ? "bi-layers"
                    : "bi-bag"
                }
                text-[13px]
              `}
            />
          </span>

          <span>{title}</span>
        </div>

        <span
          className="
            flex
            h-6
            w-6
            items-center
            justify-center
            rounded-full
            text-[#aaa]
            transition-all
            duration-200
            group-hover/title:bg-white
            group-hover/title:text-[#166534]
          "
        >
          <i className="bi bi-chevron-left text-[9px]" />
        </span>
      </Link>

      {/* زیرمنو */}

      <div
        className="
          invisible
          absolute
          right-full
          top-0
          mr-2
          z-50
          w-[220px]
          translate-x-2
          rounded-[15px]
          border
          border-[#e8e8e8]
          bg-white
          p-2
          opacity-0
          shadow-[0_22px_60px_rgba(0,0,0,0.12)]
          transition-all
          duration-200
          group-hover/category:visible
          group-hover/category:translate-x-0
          group-hover/category:opacity-100
          group-focus-within/category:visible
          group-focus-within/category:translate-x-0
          group-focus-within/category:opacity-100
        "
      >
        {/* هدر زیرمنو */}

        <div
          className="
            mb-1
            flex
            items-center
            gap-2
            px-3
            py-2
          "
        >
          <span
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-[8px]
              bg-[#f1f6f2]
              text-[#166534]
            "
          >
            <i
              className={`
                bi
                ${
                  title === "پارچه"
                    ? "bi-layers"
                    : "bi-bag"
                }
                text-[12px]
              `}
            />
          </span>

          <span className="text-[11px] font-semibold text-[#555]">
            {title}
          </span>
        </div>

        {/* مشاهده همه */}

        <Link
          to={to}
          className="
            group/all
            flex
            h-[40px]
            w-full
            items-center
            justify-between
            rounded-[9px]
            bg-[#f3f7f4]
            px-3
            text-[12px]
            font-semibold
            text-[#166534]
            whitespace-nowrap
            transition-all
            duration-200
            hover:bg-[#e8f1eb]
          "
        >
          <span>مشاهده همه محصولات</span>

          <i
            className="
              bi
              bi-arrow-left
              text-[10px]
              transition-transform
              duration-200
              group-hover/all:-translate-x-0.5
            "
          />
        </Link>

        {/* جداکننده */}

        <div className="my-2 border-t border-[#eeeeee]" />

        {/* دسته‌بندی‌ها */}

        <div className="space-y-0.5">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="
                group/item
                flex
                h-[38px]
                w-full
                items-center
                justify-between
                rounded-[8px]
                px-3
                text-[12px]
                text-[#555]
                whitespace-nowrap
                transition-all
                duration-200
                hover:bg-[#f4f8f5]
                hover:text-[#166534]
              "
            >
              <span>{item.title}</span>

              <i
                className="
                  bi
                  bi-chevron-left
                  text-[8px]
                  text-transparent
                  transition-all
                  duration-200
                  group-hover/item:text-[#166534]
                "
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}