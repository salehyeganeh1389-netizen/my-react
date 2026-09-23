import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, ShoppingBag, Star } from "lucide-react";

const API_URL = "https://fakestoreapi.com/products";

const categoryNames = {
  1: "پارچه کتان",
  2: "پارچه لینن",
  3: "پارچه رسمی",
  4: "پارچه کلاسیک",

  11: "تی‌شرت",
  12: "شلوار",
  13: "جوراب",
  14: "پیراهن",
};

export default function CategoryProductsPage() {
  const { type, categoryId } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProducts() {
      try {
        setLoading(true);

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Products not found");
        }

        const data = await response.json();

        const half = Math.ceil(data.length / 2);

        const typeProducts =
          type === "fabric"
            ? data.slice(0, half)
            : type === "clothing"
            ? data.slice(half)
            : [];

        /*
          فعلاً برای FakeStore:
          محصولات را بین دسته‌ها تقسیم می‌کنیم.
        */

        const categoryNumber = Number(categoryId);

        const categoryIndex =
          type === "fabric"
            ? categoryNumber - 1
            : categoryNumber - 11;

        const categoryProducts = typeProducts.filter(
          (_, index) => index % 4 === categoryIndex
        );

        setProducts(categoryProducts);
      } catch (error) {
        console.error(error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, [type, categoryId]);

  const categoryTitle =
    categoryNames[categoryId] || "محصولات";

  if (loading) {
    return (
      <main
        dir="rtl"
        className="mx-auto max-w-[1500px] px-4 py-16"
      >
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

      <div className="mb-10">
        <Link
          to={`/products/${type}`}
          className="
            mb-6
            inline-flex
            items-center
            gap-2
            text-xs
            text-[#888]
            transition
            hover:text-[#173a2c]
          "
        >
          <ArrowRight size={16} />
          بازگشت به {type === "fabric" ? "پارچه" : "پوشاک"}
        </Link>

        <p className="mb-2 text-xs text-[#999]">
          قماش شیخ الاسلامی / فروشگاه / {categoryTitle}
        </p>

        <h1 className="text-2xl font-bold text-[#173a2c] sm:text-3xl">
          {categoryTitle}
        </h1>

        <p className="mt-2 text-xs text-[#999]">
          {products.length} محصول
        </p>
      </div>

      {/* PRODUCTS */}

      {products.length === 0 ? (
        <div className="rounded-2xl border border-[#eee] p-20 text-center">
          <p className="text-sm text-[#777]">
            محصولی در این دسته‌بندی وجود ندارد.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
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
              {/* IMAGE */}

              <div
                className="
                  relative
                  aspect-square
                  overflow-hidden
                  bg-[#f7f7f7]
                "
              >
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
                  ★ {product.rating?.rate}
                </span>
              </div>

              {/* INFO */}

              <div className="p-4">
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

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-bold text-[#173a2c]">
                    ${product.price}
                  </span>

                  <span className="flex items-center gap-1 text-[10px] text-[#999]">
                    <Star size={12} fill="currentColor" />
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
                    group-hover:bg-[#166534]
                  "
                >
                  <ShoppingBag size={14} />
                  مشاهده محصول
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}