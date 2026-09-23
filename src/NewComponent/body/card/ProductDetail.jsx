import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Star,
} from "lucide-react";

const API_URL = "https://fakestoreapi.com/products";

export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function getProduct() {
      try {
        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();

        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getProduct();
  }, [id]);

  if (loading) {
    return (
      <main
        dir="rtl"
        className="mx-auto max-w-[1500px] px-4 py-16"
      >
        <div className="grid animate-pulse gap-10 lg:grid-cols-2">
          <div className="h-[500px] rounded-3xl bg-[#eee]" />

          <div className="space-y-5">
            <div className="h-10 rounded bg-[#eee]" />
            <div className="h-6 rounded bg-[#eee]" />
            <div className="h-32 rounded bg-[#eee]" />
            <div className="h-14 rounded bg-[#eee]" />
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main
        dir="rtl"
        className="flex min-h-[60vh] items-center justify-center"
      >
        <h1 className="text-xl font-bold text-[#173a2c]">
          محصول پیدا نشد
        </h1>
      </main>
    );
  }

  const increase = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrease = () => {
    setQuantity((prev) =>
      prev > 1 ? prev - 1 : 1
    );
  };

  const addToCart = () => {
    console.log({
      product,
      quantity,
    });

    alert(
      `${quantity} عدد از ${product.title} به سبد خرید اضافه شد`
    );
  };

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
      {/* BACK */}

      <Link
        to="/"
        className="
          mb-8
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
        بازگشت
      </Link>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* IMAGE */}

        <div
          className="
            flex
            min-h-[500px]
            items-center
            justify-center
            rounded-3xl
            bg-[#f7f7f7]
            p-10
          "
        >
          <img
            src={product.image}
            alt={product.title}
            className="
              max-h-[450px]
              max-w-full
              object-contain
              transition
              duration-500
              hover:scale-105
            "
          />
        </div>

        {/* INFO */}

        <div className="flex flex-col justify-center">
          <div className="mb-4 flex items-center gap-2 text-xs text-[#888]">
            <Star
              size={15}
              fill="currentColor"
              className="text-yellow-500"
            />

            {product.rating?.rate}

            <span>
              ({product.rating?.count} نظر)
            </span>
          </div>

          <h1 className="text-2xl font-bold leading-9 text-[#173a2c] sm:text-3xl">
            {product.title}
          </h1>

          <div className="mt-6 text-2xl font-bold text-[#173a2c]">
            ${product.price}
          </div>

          <div className="my-7 h-px bg-[#eee]" />

          <p className="text-sm leading-8 text-[#666]">
            {product.description}
          </p>

          {/* QUANTITY */}

          <div className="mt-8">
            <p className="mb-3 text-xs font-bold">
              تعداد
            </p>

            <div className="flex w-fit items-center overflow-hidden rounded-xl border border-[#ddd]">
              <button
                onClick={increase}
                className="p-3 transition hover:bg-[#f5f5f5]"
              >
                <Plus size={16} />
              </button>

              <span className="min-w-[50px] text-center text-sm font-bold">
                {quantity}
              </span>

              <button
                onClick={decrease}
                className="p-3 transition hover:bg-[#f5f5f5]"
              >
                <Minus size={16} />
              </button>
            </div>
          </div>

          {/* ADD TO CART */}

          <button
            onClick={addToCart}
            className="
              mt-7
              flex
              w-full
              items-center
              justify-center
              gap-3
              rounded-xl
              bg-[#173a2c]
              py-4
              text-sm
              font-bold
              text-white
              transition
              hover:bg-[#166534]
              hover:shadow-lg
            "
          >
            <ShoppingBag size={18} />

            افزودن به سبد خرید
          </button>
        </div>
      </div>
    </main>
  );
}