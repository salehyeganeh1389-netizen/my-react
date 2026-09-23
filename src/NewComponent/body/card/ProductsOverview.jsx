import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  ChevronDown,
  Star,
  ShoppingBag,
  X,
  ArrowDownAZ,
  ArrowUpDown,
  TrendingUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = "https://fakestoreapi.com/products";

// ========================================
// دسته‌بندی‌ها
// ========================================

const categoryGroups = {
  fabric: {
    title: "پارچه",
    categories: [
      { id: "cotton", title: "پارچه کتان" },
      { id: "linen", title: "پارچه لینن" },
      { id: "formal", title: "پارچه رسمی" },
      { id: "casual", title: "پارچه کژوال" },
      { id: "classic", title: "پارچه کلاسیک" },
      { id: "special", title: "پارچه ویژه" },
    ],
  },

  clothing: {
    title: "پوشاک",
    categories: [
      { id: "tshirt", title: "تی‌شرت" },
      { id: "pants", title: "شلوار" },
      { id: "socks", title: "جوراب" },
      { id: "towel", title: "حوله" },
      { id: "shirt", title: "پیراهن" },
      { id: "homewear", title: "لباس راحتی" },
    ],
  },
};

// ========================================
// ساخت دسته‌بندی نمایشی برای محصولات
// ========================================

function getProductCategory(product, index) {
  if (index < 10) {
    const categories = [
      "cotton",
      "linen",
      "formal",
      "casual",
      "classic",
      "special",
    ];

    return {
      type: "fabric",
      category: categories[index % categories.length],
    };
  }

  const categories = [
    "tshirt",
    "pants",
    "socks",
    "towel",
    "shirt",
    "homewear",
  ];

  return {
    type: "clothing",
    category: categories[(index - 10) % categories.length],
  };
}

// ========================================
// قیمت
// ========================================

function formatPrice(price) {
  return `$${Number(price).toLocaleString("en-US")}`;
}

// ========================================
// Product Card
// ========================================

function ProductCard({ product }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35 }}
    >
      <Link
        to={`/product/${product.id}`}
        className="
          group
          block
          overflow-hidden
          rounded-2xl
          border
          border-[#eeeeee]
          bg-white
          transition-all
          duration-500
          hover:-translate-y-1
          hover:shadow-[0_15px_45px_rgba(0,0,0,0.08)]
        "
      >
        {/* تصویر */}
        <div
          className="
            relative
            aspect-square
            overflow-hidden
            bg-[#f7f7f5]
          "
        >
          <img
            src={product.image}
            alt={product.title}
            className="
              h-full
              w-full
              object-contain
              p-7
              transition-transform
              duration-700
              group-hover:scale-105
            "
          />

          {/* امتیاز */}
          <div
            className="
              absolute
              right-3
              top-3
              flex
              items-center
              gap-1
              rounded-full
              bg-white
              px-2.5
              py-1.5
              text-[10px]
              text-[#555]
              shadow-sm
            "
          >
            <Star
              size={11}
              fill="currentColor"
              className="text-[#d6a928]"
            />
            {product.rating?.rate || 0}
          </div>

          {/* نوع محصول */}
          <div
            className="
              absolute
              left-3
              top-3
              rounded-full
              bg-[#173a2c]
              px-2.5
              py-1.5
              text-[9px]
              text-white
            "
          >
            {product.type === "fabric" ? "پارچه" : "پوشاک"}
          </div>
        </div>

        {/* اطلاعات */}
        <div className="p-4">
          <div className="mb-2 text-[9px] text-[#999]">
            {product.categoryTitle}
          </div>

          <h2
            className="
              line-clamp-2
              min-h-[40px]
              text-xs
              font-bold
              leading-5
              text-[#222]
            "
          >
            {product.title}
          </h2>

          <div className="mt-5 flex items-center justify-between">
            <span className="text-sm font-bold text-[#173a2c]">
              {formatPrice(product.price)}
            </span>

            <span className="flex items-center gap-1 text-[10px] text-[#999]">
              <Star size={11} fill="currentColor" />
              {product.rating?.rate}
            </span>
          </div>

          <div
            className="
              mt-4
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#173a2c]
              py-3
              text-[10px]
              text-white
              transition
              duration-300
              group-hover:bg-[#166534]
            "
          >
            <ShoppingBag size={14} />
            مشاهده محصول
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ========================================
// Sort Dropdown
// ========================================

function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);

  const options = [
    {
      value: "default",
      label: "مرتب‌سازی پیش‌فرض",
      icon: ArrowUpDown,
    },
    {
      value: "newest",
      label: "جدیدترین",
      icon: TrendingUp,
    },
    {
      value: "price-low",
      label: "ارزان‌ترین",
      icon: ArrowDownAZ,
    },
    {
      value: "price-high",
      label: "گران‌ترین",
      icon: ArrowDownAZ,
    },
    {
      value: "rating",
      label: "بیشترین امتیاز",
      icon: Star,
    },
  ];

  const selected =
    options.find((item) => item.value === value) || options[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="
          flex
          h-11
          min-w-[190px]
          items-center
          justify-between
          gap-3
          rounded-xl
          border
          border-[#e8e8e8]
          bg-white
          px-4
          text-xs
          text-[#444]
          transition
          hover:border-[#173a2c]
        "
      >
        <span className="flex items-center gap-2">
          <selected.icon size={15} />
          {selected.label}
        </span>

        <ChevronDown
          size={15}
          className={`transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="
              absolute
              left-0
              right-0
              top-full
              z-50
              mt-2
              overflow-hidden
              rounded-xl
              border
              border-[#eeeeee]
              bg-white
              p-1.5
              shadow-xl
            "
          >
            {options.map((option) => {
              const Icon = option.icon;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`
                    flex
                    w-full
                    items-center
                    gap-2
                    rounded-lg
                    px-3
                    py-2.5
                    text-right
                    text-xs
                    transition
                    ${
                      value === option.value
                        ? "bg-[#edf5f0] text-[#166534]"
                        : "text-[#555] hover:bg-[#f7f7f7]"
                    }
                  `}
                >
                  <Icon size={14} />
                  {option.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ========================================
// Products Overview
// ========================================

export default function ProductsOverview() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [category, setCategory] = useState("all");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [rating, setRating] = useState("all");
  const [sort, setSort] = useState("default");

  const [mobileFilters, setMobileFilters] = useState(false);

  // ========================================
  // Fetch Products
  // ========================================

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Products not found");
        }

        const data = await response.json();

        const preparedProducts = data.map((product, index) => {
          const categoryData = getProductCategory(
            product,
            index
          );

          const categoryTitle =
            categoryGroups[categoryData.type]?.categories.find(
              (item) => item.id === categoryData.category
            )?.title || "محصول";

          return {
            ...product,
            type: categoryData.type,
            customCategory: categoryData.category,
            categoryTitle,
          };
        });

        setProducts(preparedProducts);
      } catch (error) {
        console.error(error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // ========================================
  // Filter + Sort
  // ========================================

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // جستجو
    if (search.trim()) {
      const searchValue = search.toLowerCase();

      result = result.filter((product) =>
        `${product.title} ${product.categoryTitle}`
          .toLowerCase()
          .includes(searchValue)
      );
    }

    // نوع محصول
    if (type !== "all") {
      result = result.filter(
        (product) => product.type === type
      );
    }

    // دسته‌بندی
    if (category !== "all") {
      result = result.filter(
        (product) => product.customCategory === category
      );
    }

    // حداقل قیمت
    if (minPrice !== "") {
      result = result.filter(
        (product) =>
          Number(product.price) >= Number(minPrice)
      );
    }

    // حداکثر قیمت
    if (maxPrice !== "") {
      result = result.filter(
        (product) =>
          Number(product.price) <= Number(maxPrice)
      );
    }

    // امتیاز
    if (rating !== "all") {
      result = result.filter(
        (product) =>
          Number(product.rating?.rate || 0) >= Number(rating)
      );
    }

    // مرتب‌سازی
    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      result.sort(
        (a, b) =>
          Number(b.rating?.rate || 0) -
          Number(a.rating?.rate || 0)
      );
    }

    if (sort === "newest") {
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [
    products,
    search,
    type,
    category,
    minPrice,
    maxPrice,
    rating,
    sort,
  ]);

  // ========================================
  // Reset Filters
  // ========================================

  function resetFilters() {
    setSearch("");
    setType("all");
    setCategory("all");
    setMinPrice("");
    setMaxPrice("");
    setRating("all");
    setSort("default");
  }

  // ========================================
  // تغییر نوع
  // ========================================

  function handleTypeChange(value) {
    setType(value);
    setCategory("all");
  }

  // ========================================
  // Filter Sidebar
  // ========================================

  function FilterContent() {
    return (
      <div dir="rtl">
        {/* عنوان */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal
              size={17}
              className="text-[#173a2c]"
            />

            <h2 className="text-sm font-bold text-[#222]">
              فیلتر محصولات
            </h2>
          </div>

          <button
            type="button"
            onClick={resetFilters}
            className="
              flex
              items-center
              gap-1
              text-[10px]
              text-[#999]
              transition
              hover:text-[#173a2c]
            "
          >
            <RotateCcw size={12} />
            حذف فیلترها
          </button>
        </div>

        {/* نوع محصول */}
        <div className="border-b border-[#eeeeee] pb-5">
          <h3 className="mb-3 text-xs font-bold text-[#333]">
            نوع محصول
          </h3>

          <div className="space-y-2">
            <FilterRadio
              label="همه محصولات"
              checked={type === "all"}
              onClick={() => handleTypeChange("all")}
            />

            <FilterRadio
              label="پارچه"
              checked={type === "fabric"}
              onClick={() => handleTypeChange("fabric")}
            />

            <FilterRadio
              label="پوشاک"
              checked={type === "clothing"}
              onClick={() => handleTypeChange("clothing")}
            />
          </div>
        </div>

        {/* دسته‌بندی */}
        <div className="border-b border-[#eeeeee] py-5">
          <h3 className="mb-3 text-xs font-bold text-[#333]">
            دسته‌بندی
          </h3>

          <div className="max-h-[270px] space-y-2 overflow-y-auto pl-1">
            {type !== "clothing" &&
              categoryGroups.fabric.categories.map((item) => (
                <FilterRadio
                  key={item.id}
                  label={item.title}
                  checked={category === item.id}
                  onClick={() => {
                    setCategory(item.id);
                    setType("fabric");
                  }}
                />
              ))}

            {type !== "fabric" &&
              categoryGroups.clothing.categories.map((item) => (
                <FilterRadio
                  key={item.id}
                  label={item.title}
                  checked={category === item.id}
                  onClick={() => {
                    setCategory(item.id);
                    setType("clothing");
                  }}
                />
              ))}
          </div>
        </div>

        {/* قیمت */}
        <div className="border-b border-[#eeeeee] py-5">
          <h3 className="mb-3 text-xs font-bold text-[#333]">
            محدوده قیمت
          </h3>

          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="حداقل"
              className="
                h-10
                w-full
                rounded-lg
                border
                border-[#e8e8e8]
                px-3
                text-xs
                outline-none
                transition
                focus:border-[#173a2c]
              "
            />

            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="حداکثر"
              className="
                h-10
                w-full
                rounded-lg
                border
                border-[#e8e8e8]
                px-3
                text-xs
                outline-none
                transition
                focus:border-[#173a2c]
              "
            />
          </div>
        </div>

        {/* امتیاز */}
        <div className="pt-5">
          <h3 className="mb-3 text-xs font-bold text-[#333]">
            امتیاز محصول
          </h3>

          <div className="space-y-2">
            <FilterRadio
              label="همه امتیازها"
              checked={rating === "all"}
              onClick={() => setRating("all")}
            />

            {[4, 3, 2].map((value) => (
              <FilterRadio
                key={value}
                label={`${value} ستاره و بیشتر`}
                checked={rating === String(value)}
                onClick={() => setRating(String(value))}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ========================================
  // Loading
  // ========================================

  if (loading) {
    return (
      <main
        dir="rtl"
        className="
          mx-auto
          w-full
          max-w-[1500px]
          px-4
          py-12
          sm:px-6
          lg:py-16
        "
      >
        <div className="mb-10">
          <div className="h-8 w-40 animate-pulse rounded-lg bg-[#eee]" />
          <div className="mt-3 h-4 w-64 animate-pulse rounded bg-[#eee]" />
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="
                aspect-[4/5]
                animate-pulse
                rounded-2xl
                bg-[#eee]
              "
            />
          ))}
        </div>
      </main>
    );
  }

  // ========================================
  // Page
  // ========================================

  return (
    <main
      dir="rtl"
      className="
        mx-auto
        w-full
        max-w-[1500px]
        px-4
        py-10
        sm:px-6
        lg:py-16
      "
    >
      {/* Header */}
      <div className="mb-8">
        <p className="mb-2 text-xs text-[#999]">
          قماش شیخ الاسلامی / فروشگاه
        </p>

        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#173a2c] sm:text-3xl">
              فروشگاه محصولات
            </h1>

            <p className="mt-2 text-xs text-[#888]">
              مجموعه کامل محصولات قماش شیخ الاسلامی
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-[330px]">
            <Search
              size={17}
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-[#999]
              "
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجوی محصول..."
              className="
                h-12
                w-full
                rounded-xl
                border
                border-[#e8e8e8]
                bg-white
                pr-11
                pl-10
                text-xs
                outline-none
                transition
                focus:border-[#173a2c]
              "
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-[#999]
                  hover:text-[#333]
                "
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Button */}
      <button
        type="button"
        onClick={() => setMobileFilters(true)}
        className="
          mb-5
          flex
          h-11
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          border
          border-[#e8e8e8]
          bg-white
          text-xs
          text-[#333]
          lg:hidden
        "
      >
        <SlidersHorizontal size={16} />
        فیلتر محصولات
      </button>

      <div className="flex items-start gap-7">
        {/* Desktop Filters */}
        <aside
          className="
            hidden
            w-[250px]
            shrink-0
            rounded-2xl
            border
            border-[#eeeeee]
            bg-white
            p-5
            lg:block
          "
        >
          <FilterContent />
        </aside>

        {/* Products */}
        <section className="min-w-0 flex-1">
          {/* Toolbar */}
          <div
            className="
              mb-6
              flex
              flex-col
              gap-4
              rounded-2xl
              border
              border-[#eeeeee]
              bg-white
              p-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div>
              <span className="text-xs text-[#888]">
                نمایش{" "}
                <strong className="text-[#173a2c]">
                  {filteredProducts.length}
                </strong>{" "}
                محصول
              </span>
            </div>

            <SortDropdown
              value={sort}
              onChange={setSort}
            />
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <motion.div
              layout
              className="
                grid
                grid-cols-2
                gap-4
                md:grid-cols-3
                xl:grid-cols-4
              "
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div
              className="
                rounded-2xl
                border
                border-[#eeeeee]
                bg-white
                px-5
                py-24
                text-center
              "
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#edf5f0]">
                <Search
                  size={22}
                  className="text-[#173a2c]"
                />
              </div>

              <h2 className="text-sm font-bold text-[#333]">
                محصولی پیدا نشد
              </h2>

              <p className="mt-2 text-xs text-[#999]">
                فیلترها یا عبارت جستجو را تغییر دهید.
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="
                  mt-5
                  rounded-xl
                  bg-[#173a2c]
                  px-5
                  py-3
                  text-xs
                  text-white
                  transition
                  hover:bg-[#166534]
                "
              >
                حذف فیلترها
              </button>
            </div>
          )}
        </section>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {mobileFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilters(false)}
              className="
                fixed
                inset-0
                z-[100]
                bg-black/30
                lg:hidden
              "
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="
                fixed
                right-0
                top-0
                z-[101]
                h-full
                w-[85%]
                max-w-[350px]
                overflow-y-auto
                bg-white
                p-5
                lg:hidden
              "
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-sm font-bold text-[#222]">
                  فیلتر محصولات
                </h2>

                <button
                  type="button"
                  onClick={() => setMobileFilters(false)}
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-[#f5f5f5]
                    text-[#555]
                  "
                >
                  <X size={17} />
                </button>
              </div>

              <FilterContent />

              <button
                type="button"
                onClick={() => setMobileFilters(false)}
                className="
                  mt-8
                  h-12
                  w-full
                  rounded-xl
                  bg-[#173a2c]
                  text-xs
                  text-white
                "
              >
                نمایش محصولات
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}

// ========================================
// Filter Radio
// ========================================

function FilterRadio({ label, checked, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        flex
        w-full
        items-center
        gap-2.5
        text-right
        text-[11px]
        text-[#666]
        transition
        hover:text-[#173a2c]
      "
    >
      <span
        className={`
          flex
          h-4
          w-4
          shrink-0
          items-center
          justify-center
          rounded-full
          border
          transition
          ${
            checked
              ? "border-[#173a2c]"
              : "border-[#d8d8d8]"
          }
        `}
      >
        {checked && (
          <span className="h-2 w-2 rounded-full bg-[#173a2c]" />
        )}
      </span>

      {label}
    </button>
  );
}