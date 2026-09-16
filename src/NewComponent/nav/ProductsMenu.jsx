import ProductCategory from "./ProductCategory";

export default function ProductsMenu() {
  return (
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
          group-hover:text-[#bd9257]
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


      {/* منوی اصلی */}
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
  );
}
