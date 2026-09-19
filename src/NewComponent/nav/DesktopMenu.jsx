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
        <nav className="flex h-full items-center gap-8 xl:gap-9">

          <NavItem text="خانه" />

          {/* محصولات */}
          <div className="group relative h-full">
            <button
              type="button"
              className="
                flex
                h-full
                items-center
                gap-2
                text-[13px]
                font-medium
                text-[#333]
                transition
                group-hover:text-[#166534]
              "
            >
              محصولات

              <i
                className="
                  bi bi-chevron-down
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
                right-[-15px]
                top-full
                z-50
                w-[220px]
                translate-y-3
                rounded-[10px]
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

          <NavItem text="مقالات" />

          <NavItem text="درباره ما" />

          <NavItem text="تماس با ما" />

        </nav>


        {/* تلفن */}
        <a
          href="tel:02532939863"
          className="
            mr-auto
            flex
            items-center
            gap-3
            text-[13px]
            text-[#333]
            transition
            hover:text-[#166534]
          "
        >
          <span className="font-medium">
            ۰۲۵-۳۲۹۳۹۸۶۳
          </span>

          <i className="bi bi-telephone text-[16px] text-green-950" />
        </a>

      </div>
    </div>
  );
}


/* =========================
   Nav Item
========================= */

function NavItem({ text }) {
  return (
    <a
      href="#"
      className="
        flex
        h-full
        items-center
        text-[13px]
        font-medium
        text-[#333]
        transition
        duration-300
        hover:bg-[#333]
      "
    >
      {text}
    </a>
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
          h-[44px]
          w-full
          items-center
          justify-between
          rounded-[7px]
          px-4
          text-right
          text-[13px]
          text-[#444]
          transition
          hover:bg-[#faf7f2]
          hover:text-[#166534]
        "
      >
        <span>{title}</span>

        <i className="bi bi-chevron-left text-[9px]" />
      </button>


      {/* زیرمنو */}
      <div
        className="
          invisible
          absolute
          right-full
          top-0
          mr-2
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
          <a
            key={item}
            href="#"
            className="
              block
              rounded-[7px]
              px-4
              py-3
              text-[12px]
              text-[#555]
              transition
              hover:bg-[#faf7f2]
              hover:text-[#15803d]
            "
          >
            {item}
          </a>
        ))}
      </div>

    </div>
  );
}
