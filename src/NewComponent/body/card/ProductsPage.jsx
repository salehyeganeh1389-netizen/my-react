import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

const API_URL = "https://fakestoreapi.com/products";

export default function ProductsPage() {
  const { type } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [category, setCategory] = useState("all");
  const [rating, setRating] = useState("all");
  const [sort, setSort] = useState("default");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function getProducts() {
      try {
        setLoading(true);

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Products not found");
        }

        const data = await response.json();

        /*
          FakeStore = 20 محصول

          محصولات 1 تا 10 → پارچه
          محصولات 11 تا 20 → پوشاک
        */

        const half = Math.ceil(data.length / 2);

        let result = [];

        if (type === "fabric") {
          result = data.slice(0, half);
        }

        if (type === "clothing") {
          result = data.slice(half);
        }

        setProducts(result);
      } catch (error) {
        console.error(error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, [type]);

  /*
    دسته‌بندی‌های موجود
  */

  const categories = useMemo(() => {
    return [...new Set(products.map((item) => item.category))];
  }, [products]);

  /*
    فیلتر و مرتب‌سازی
  */

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // جستجو
    if (search.trim()) {
      result = result.filter((product) =>
        product.title
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    // حداقل قیمت
    if (minPrice !== "") {
      result = result.filter(
        (product) => product.price >= Number(minPrice)
      );
    }

    // حداکثر قیمت
    if (maxPrice !== "") {
      result = result.filter(
        (product) => product.price <= Number(maxPrice)
      );
    }

    // دسته‌بندی
    if (category !== "all") {
      result = result.filter(
        (product) => product.category === category
      );
    }

    // امتیاز
    if (rating !== "all") {
      result = result.filter(
        (product) => product.rating.rate >= Number(rating)
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
        (a, b) => b.rating.rate - a.rating.rate
      );
    }

    if (sort === "name") {
      result.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    return result;
  }, [
    products,
    search,
    minPrice,
    maxPrice,
    category,
    rating,
    sort,
  ]);

  /*
    پاک کردن فیلترها
  */

  const resetFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setCategory("all");
    setRating("all");
    setSort("default");
    setSearch("");
  };

  /*
    عنوان صفحه
  */

  const title =
    type === "fabric"
      ? "پارچه"
      : type === "clothing"
      ? "پوشاک"
      : "محصولات";

  /*
    اگر آدرس اشتباه باشد
  */

  if (type !== "fabric" && type !== "clothing") {
    return (
      <main
        dir="rtl"
        className="mx-auto max-w-[1500px] px-4 py-20 text-center"
      >
        <h1 className="text-xl font-bold text-[#173a2c]">
          دسته‌بندی پیدا نشد
        </h1>

        <Link
          to="/"
          className="mt-5 inline-block text-sm text-[#166534]"
        >
          بازگشت به صفحه اصلی
        </Link>
      </main>
    );
  }

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
      {/* HEADER */}

      <div className="mb-8">
        <p className="mb-2 text-xs text-[#999]">
          قماش شیخ الاسلامی / فروشگاه / {title}
        </p>

        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#173a2c] sm:text-3xl">
              {title}
            </h1>

            <p className="mt-2 text-xs text-[#999]">
              {filteredProducts.length} محصول
            </p>
          </div>

          <button
            onClick={resetFilters}
            className="
              hidden
              rounded-full
              border
              border-[#ddd]
              px-4
              py-2
              text-xs
              text-[#555]
              transition
              hover:border-[#173a2c]
              hover:bg-[#173a2c]
              hover:text-white
              sm:block
            "
          >
            حذف فیلترها
          </button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
        {/* FILTER */}

        <aside
          className="
            h-fit
            rounded-2xl
            border
            border-[#eee]
            bg-white
            p-5
            lg:sticky
            lg:top-24
          "
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-bold text-[#222]">
              فیلتر محصولات
            </h2>

            <button
              onClick={resetFilters}
              className="text-[10px] text-[#999] hover:text-red-500"
            >
              پاک کردن
            </button>
          </div>

          {/* SEARCH */}

          <FilterTitle title="جستجو" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجوی محصول..."
            className="
              mb-6
              w-full
              rounded-xl
              border
              border-[#e5e5e5]
              px-3
              py-3
              text-xs
              outline-none
              transition
              focus:border-[#173a2c]
            "
          />

          {/* PRICE */}

          <FilterTitle title="محدوده قیمت" />

          <div className="mb-6 grid grid-cols-2 gap-2">
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="از"
              className="
                w-full
                rounded-lg
                border
                border-[#e5e5e5]
                px-3
                py-2.5
                text-xs
                outline-none
              "
            />

            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="تا"
              className="
                w-full
                rounded-lg
                border
                border-[#e5e5e5]
                px-3
                py-2.5
                text-xs
                outline-none
              "
            />
          </div>

          {/* CATEGORY */}

          <FilterTitle title="دسته‌بندی" />

          <div className="mb-6 space-y-2">
            <FilterRadio
              active={category === "all"}
              onClick={() => setCategory("all")}
              text="همه"
            />

            {categories.map((item) => (
              <FilterRadio
                key={item}
                active={category === item}
                onClick={() => setCategory(item)}
                text={item}
              />
            ))}
          </div>

          {/* RATING */}

          <FilterTitle title="امتیاز" />

          <div className="space-y-2">
            {[
              ["all", "همه امتیازها"],
              ["4", "۴ به بالا"],
              ["3", "۳ به بالا"],
              ["2", "۲ به بالا"],
            ].map(([value, text]) => (
              <FilterRadio
                key={value}
                active={rating === value}
                onClick={() => setRating(value)}
                text={text}
              />
            ))}
          </div>
        </aside>

        {/* PRODUCTS */}

        <section>
          {/* SORT */}

          <div
            className="
              mb-5
              flex
              flex-col
              gap-3
              rounded-2xl
              border
              border-[#eee]
              bg-white
              p-3
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <span className="text-xs text-[#888]">
              نمایش {filteredProducts.length} محصول
            </span>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="
                rounded-xl
                border
                border-[#eee]
                bg-white
                px-4
                py-2.5
                text-xs
                outline-none
              "
            >
              <option value="default">
                مرتب‌سازی
              </option>

              <option value="price-low">
                ارزان‌ترین
              </option>

              <option value="price-high">
                گران‌ترین
              </option>

              <option value="rating">
                محبوب‌ترین
              </option>

              <option value="name">
                نام محصول
              </option>
            </select>
          </div>

          {/* LOADING */}

          {loading ? (
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
          ) : filteredProducts.length === 0 ? (
            <div className="rounded-2xl border border-[#eee] p-20 text-center">
              <p className="text-sm text-[#777]">
                محصولی با این فیلترها پیدا نشد.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  type={type}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

/* =====================================================
   PRODUCT CARD
===================================================== */

function ProductCard({ product, type }) {
  return (
    <Link
      to={`/products/${type}/${product.id}`}
      className="
        group
        overflow-hidden
        rounded-2xl
        border
        border-[#eee]
        bg-white
        transition
        duration-500
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      <div className="relative aspect-square overflow-hidden bg-[#f7f7f7]">
        <img
          src={product.image}
          alt={product.title}
          className="
            h-full
            w-full
            object-contain
            p-6
            transition
            duration-700
            group-hover:scale-105
          "
        />

        <span
          className="
            absolute
            right-3
            top-3
            rounded-full
            bg-white
            px-2.5
            py-1
            text-[9px]
            shadow-sm
          "
        >
          ★ {product.rating.rate}
        </span>
      </div>

      <div className="p-4">
        <h3
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
        </h3>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-bold text-[#173a2c]">
            ${product.price}
          </span>

          <span className="text-[10px] text-[#999]">
            مشاهده
          </span>
        </div>
      </div>
    </Link>
  );
}

/* =====================================================
   FILTER TITLE
===================================================== */

function FilterTitle({ title }) {
  return (
    <h3 className="mb-3 text-xs font-bold text-[#333]">
      {title}
    </h3>
  );
}

/* =====================================================
   FILTER RADIO
===================================================== */

function FilterRadio({ active, onClick, text }) {
  return (
    <button
      onClick={onClick}
      className="
        flex
        w-full
        items-center
        gap-2
        text-right
        text-xs
        text-[#666]
      "
    >
      <span
        className={`
          flex
          h-4
          w-4
          items-center
          justify-center
          rounded-full
          border
          ${
            active
              ? "border-[#173a2c]"
              : "border-[#ddd]"
          }
        `}
      >
        {active && (
          <span className="h-2 w-2 rounded-full bg-[#173a2c]" />
        )}
      </span>

      {text}
    </button>
  );
}
