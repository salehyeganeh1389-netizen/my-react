import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Heart,
  Share2,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  ChevronDown,
  MessageCircle,
  HelpCircle,
} from "lucide-react";

/* =========================================================
   API
========================================================= */

const API_URL = "http://localhost:5000/api/products";

/* =========================================================
   SERVICES
========================================================= */

const services = [
  {
    icon: ShieldCheck,
    title: "ضمانت اصالت و سلامت کالا",
    text: "اطمینان از سلامت محصول هنگام تحویل",
  },
  {
    icon: Truck,
    title: "ارسال سریع",
    text: "ارسال سفارش در کوتاه‌ترین زمان",
  },
  {
    icon: RotateCcw,
    title: "۷ روز ضمانت بازگشت",
    text: "طبق شرایط و قوانین فروشگاه",
  },
];

/* =========================================================
   COLORS
========================================================= */

const colors = [
  {
    name: "مشکی",
    value: "#151515",
  },
  {
    name: "سفید",
    value: "#f5f5f5",
  },
  {
    name: "کرم",
    value: "#d8c7a5",
  },
];

/* =========================================================
   PRODUCT DETAIL
========================================================= */

export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(
    colors[0]
  );
  const [selectedSize, setSelectedSize] = useState("M");
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("specs");
  const [activeImage, setActiveImage] = useState("");

  /* =========================================================
     GET PRODUCT
  ========================================================= */

  useEffect(() => {
    async function getProduct() {
      try {
        setLoading(true);

        const [productResponse, allProductsResponse] =
          await Promise.all([
            fetch(`${API_URL}/${id}`),
            fetch(API_URL),
          ]);

        if (!productResponse.ok) {
          throw new Error("Product not found");
        }

        if (!allProductsResponse.ok) {
          throw new Error("Products not found");
        }

        const productData = await productResponse.json();
        const allProductsData = await allProductsResponse.json();

        setProduct(productData);
        setAllProducts(allProductsData);
        setActiveImage(productData.image || "");
      } catch (error) {
        console.error(error);
        setProduct(null);
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    }

    getProduct();
  }, [id]);

  /* =========================================================
     RELATED PRODUCTS
  ========================================================= */

  const relatedProducts = useMemo(() => {
    if (!product) return [];

    return allProducts
      .filter(
        (item) =>
          item.id !== product.id &&
          item.category === product.category &&
          item.group === product.group
      )
      .slice(0, 4);
  }, [product, allProducts]);

  /* =========================================================
     PRODUCT FEATURES
  ========================================================= */

  const features = useMemo(() => {
    if (!product) return [];

    return [
      ["جنس", product.details || "کیفیت عالی"],
      ["نوع محصول", product.unit || "محصول فروشگاهی"],
      ["دسته‌بندی", product.category || "نامشخص"],
      ["گروه محصول", product.group || "نامشخص"],
      ["کیفیت", "درجه یک"],
      ["قیمت", `${product.price?.toLocaleString("fa-IR")} تومان`],
    ];
  }, [product]);

  /* =========================================================
     PRICE
  ========================================================= */

  const originalPrice = product
    ? Math.round(product.price * 1.12)
    : 0;

  const discountPercent = 10;

  /* =========================================================
     QUANTITY
  ========================================================= */

  const increase = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrease = () => {
    setQuantity((prev) =>
      prev > 1 ? prev - 1 : 1
    );
  };

  /* =========================================================
     ADD TO CART
  ========================================================= */

  const addToCart = () => {
    if (!product) return;

    const cartItem = {
      ...product,
      quantity,
      selectedColor,
      selectedSize,
    };

    console.log("Cart:", cartItem);

    alert(
      `${quantity} عدد از محصول «${product.title}» به سبد خرید اضافه شد`
    );
  };

  /* =========================================================
     SHARE
  ========================================================= */

  const shareProduct = async () => {
    if (!product) return;

    try {
      if (navigator.share) {
        await navigator.share({
          title: product.title,
          text: "مشاهده این محصول در قماش شیخ الاسلامی",
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(
          window.location.href
        );

        alert("لینک محصول کپی شد");
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return null;
  }

  /* =========================================================
     NOT FOUND
  ========================================================= */

  if (!product) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-[#f5f5f5] px-4"
      >
        <div className="w-full max-w-md bg-white p-10 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#f5f5f5]">
            <ShoppingBag size={30} className="text-[#424750]" />
          </div>

          <h1 className="text-xl font-bold text-[#23262a]">
            محصول پیدا نشد
          </h1>

          <p className="mt-3 text-sm leading-7 text-[#81858b]">
            محصول مورد نظر در فروشگاه موجود نیست.
          </p>

          <Link
            to="/products"
            className="mt-7 inline-flex rounded-lg bg-[#ef394e] px-8 py-3 text-sm font-bold text-white transition hover:bg-[#d92f42]"
          >
            مشاهده محصولات
          </Link>
        </div>
      </main>
    );
  }

  const finalPrice = product.price;

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#fff]"
    >
      {/* ================= BREADCRUMB ================= */}
      <div className="mx-auto w-full max-w-[1400px] px-4 pt-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap text-[11px] text-[#81858b]">
          <Link
            to="/"
            className="shrink-0 transition hover:text-[#ef394e]"
          >
            خانه
          </Link>

          <ChevronDown
            size={13}
            className="-rotate-90 shrink-0"
          />

          <Link
            to="/products"
            className="shrink-0 transition hover:text-[#ef394e]"
          >
            محصولات
          </Link>

          <ChevronDown
            size={13}
            className="-rotate-90 shrink-0"
          />

          <span className="truncate text-[#62666d]">
            {product.title}
          </span>
        </div>
      </div>

      {/* ================= MAIN PRODUCT ================= */}
      <section className="mx-auto mt-5 w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.05fr_1.4fr]">

          {/* =====================================================
              RIGHT SIDE - GALLERY
          ====================================================== */}
          <div className="min-w-0 border border-[#e0e0e2] bg-white">
            <div className="flex min-h-[620px] flex-col p-5 sm:p-7">

              {/* TOP ACTIONS */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#81858b]">
                  اشتراک‌گذاری محصول
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={shareProduct}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-[#81858b] transition hover:bg-[#f5f5f5] hover:text-[#19bfd3]"
                  >
                    <Share2 size={19} />
                  </button>

                  <button
                    onClick={() =>
                      setIsFavorite((prev) => !prev)
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-full text-[#81858b] transition hover:bg-[#f5f5f5] hover:text-[#ef394e]"
                  >
                    <Heart
                      size={20}
                      fill={
                        isFavorite
                          ? "#ef394e"
                          : "transparent"
                      }
                      className={
                        isFavorite
                          ? "text-[#ef394e]"
                          : ""
                      }
                    />
                  </button>
                </div>
              </div>

              {/* GALLERY AREA */}
              <div className="mt-5 flex flex-1 flex-col-reverse gap-5 sm:flex-row sm:items-center sm:justify-center">

                {/* THUMBNAILS */}
                <div className="flex shrink-0 flex-row justify-center gap-3 sm:flex-col">
                  {[1, 2, 3].map((item) => (
                    <button
                      key={item}
                      onClick={() =>
                        setActiveImage(product.image)
                      }
                      className={`
                        flex h-[72px] w-[72px]
                        items-center justify-center
                        overflow-hidden
                        rounded-lg
                        border
                        bg-white
                        p-2
                        transition
                        ${
                          activeImage === product.image &&
                          item === 1
                            ? "border-[#19bfd3]"
                            : "border-[#e0e0e2]"
                        }
                      `}
                    >
                      <img
                        src={product.image}
                        alt=""
                        className="h-full w-full object-contain"
                      />
                    </button>
                  ))}
                </div>

                {/* MAIN IMAGE */}
                <div className="flex min-h-[400px] flex-1 items-center justify-center">
                  <img
                    src={activeImage}
                    alt={product.title}
                    className="max-h-[480px] max-w-full object-contain"
                  />
                </div>
              </div>

              {/* GALLERY FOOT */}
              <div className="mt-5 flex items-center justify-center gap-2 border-t border-[#f1f2f4] pt-5 text-[11px] text-[#81858b]">
                <Check
                  size={15}
                  className="text-[#19bfd3]"
                />
                تصاویر محصول
              </div>
            </div>
          </div>

          {/* =====================================================
              LEFT SIDE - PRODUCT INFORMATION
          ====================================================== */}
          <div className="min-w-0">

            {/* PRODUCT INFO */}
            <div className="border border-[#e0e0e2] bg-white p-5 sm:p-7">

              {/* BRAND */}
              <div className="mb-4 flex items-center gap-2 text-[11px] text-[#81858b]">
                <span>قماش شیخ الاسلامی</span>
                <span className="text-[#e0e0e2]">|</span>
                <span>فروشگاه آنلاین</span>
              </div>

              {/* TITLE */}
              <h1 className="text-[19px] font-bold leading-8 text-[#23262a] sm:text-[22px]">
                {product.title}
              </h1>

              {/* RATING / COMMENTS */}
              <div className="mt-4 flex flex-wrap items-center gap-4 text-[11px]">

                <div className="flex items-center gap-1 text-[#f9a825]">
                  <Star
                    size={15}
                    fill="currentColor"
                  />

                  <span className="font-bold">
                    {product.rating?.rate || 0}
                  </span>
                </div>

                <span className="text-[#19bfd3]">
                  {product.rating?.count || 0} دیدگاه
                </span>

                <span className="text-[#81858b]">
                  ۱۰۰+ پرسش و پاسخ
                </span>
              </div>

              {/* SHORT DESCRIPTION */}
              <div className="mt-6 border-t border-[#f1f2f4] pt-6">
                <h2 className="mb-3 text-sm font-bold text-[#23262a]">
                  درباره محصول
                </h2>

                <p className="text-[13px] leading-8 text-[#62666d]">
                  {product.description}
                </p>
              </div>

              {/* FEATURES */}
              <div className="mt-6">
                <h2 className="mb-4 text-sm font-bold text-[#23262a]">
                  ویژگی‌های محصول
                </h2>

                <div className="grid grid-cols-1 gap-y-3 sm:grid-cols-2">
                  {features.slice(0, 4).map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center gap-2 text-[12px]"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#19bfd3]" />

                      <span className="text-[#81858b]">
                        {label}:
                      </span>

                      <span className="font-medium text-[#424750]">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* COLOR */}
              <div className="mt-7 border-t border-[#f1f2f4] pt-6">
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-sm font-bold text-[#23262a]">
                    رنگ:
                  </span>

                  <span className="text-xs text-[#62666d]">
                    {selectedColor.name}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() =>
                        setSelectedColor(color)
                      }
                      className={`
                        flex items-center gap-2
                        rounded-lg
                        border
                        px-3 py-2
                        text-xs
                        ${
                          selectedColor.name === color.name
                            ? "border-[#19bfd3]"
                            : "border-[#e0e0e2]"
                        }
                      `}
                    >
                      <span
                        className="h-5 w-5 rounded-full border border-[#d7d7d7]"
                        style={{
                          backgroundColor: color.value,
                        }}
                      />

                      {color.name}

                      {selectedColor.name === color.name && (
                        <Check
                          size={13}
                          className="text-[#19bfd3]"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* SIZE */}
              <div className="mt-6">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-bold text-[#23262a]">
                    سایز:
                  </span>

                  <button className="text-[11px] text-[#19bfd3]">
                    راهنمای انتخاب سایز
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {["S", "M", "L", "XL", "2XL"].map((size) => (
                    <button
                      key={size}
                      onClick={() =>
                        setSelectedSize(size)
                      }
                      className={`
                        min-w-[55px]
                        rounded-lg
                        border
                        px-4 py-2.5
                        text-xs
                        ${
                          selectedSize === size
                            ? "border-[#19bfd3] bg-[#19bfd3] text-white"
                            : "border-[#e0e0e2] bg-white text-[#424750]"
                        }
                      `}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* =====================================================
                SELLER / PURCHASE CARD
            ====================================================== */}
            <div className="mt-5 border border-[#e0e0e2] bg-white p-5 sm:p-7">

              {/* SELLER */}
              <div className="flex items-center justify-between border-b border-[#f1f2f4] pb-5">
                <div>
                  <div className="mb-2 text-[11px] text-[#81858b]">
                    فروشنده
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#424750]">
                      قماش شیخ الاسلامی
                    </span>

                    <ShieldCheck
                      size={17}
                      className="text-[#19bfd3]"
                    />
                  </div>
                </div>

                <span className="text-[11px] text-[#19bfd3]">
                  معتبر
                </span>
              </div>

              {/* DELIVERY */}
              <div className="space-y-4 border-b border-[#f1f2f4] py-5">

                <div className="flex items-center gap-3">
                  <Truck
                    size={20}
                    className="text-[#81858b]"
                  />

                  <div>
                    <div className="text-xs font-bold text-[#424750]">
                      ارسال سریع
                    </div>

                    <div className="mt-1 text-[10px] text-[#81858b]">
                      ارسال سفارش در کوتاه‌ترین زمان
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <ShieldCheck
                    size={20}
                    className="text-[#81858b]"
                  />

                  <div>
                    <div className="text-xs font-bold text-[#424750]">
                      تضمین اصالت کالا
                    </div>

                    <div className="mt-1 text-[10px] text-[#81858b]">
                      ضمانت سلامت و اصالت محصول
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <RotateCcw
                    size={20}
                    className="text-[#81858b]"
                  />

                  <div>
                    <div className="text-xs font-bold text-[#424750]">
                      ضمانت بازگشت
                    </div>

                    <div className="mt-1 text-[10px] text-[#81858b]">
                      ۷ روز ضمانت بازگشت
                    </div>
                  </div>
                </div>
              </div>

              {/* PRICE */}
              <div className="pt-6">

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-[#ef394e] px-2 py-1 text-[11px] font-bold text-white">
                      {discountPercent}٪
                    </span>

                    <span className="text-xs text-[#81858b] line-through">
                      {originalPrice.toLocaleString("fa-IR")}
                    </span>
                  </div>

                  <span className="text-[11px] text-[#81858b]">
                    قیمت فروشنده
                  </span>
                </div>

                <div className="mt-3 flex items-end justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-[#23262a]">
                      {finalPrice.toLocaleString("fa-IR")}
                    </span>

                    <span className="text-xs text-[#424750]">
                      تومان
                    </span>
                  </div>
                </div>

                {/* QUANTITY + CART */}
                <div className="mt-6 flex gap-3">

                  <div className="flex h-[52px] shrink-0 items-center overflow-hidden rounded-lg border border-[#e0e0e2] bg-white">
                    <button
                      onClick={increase}
                      className="flex h-full w-10 items-center justify-center text-[#19bfd3] transition hover:bg-[#f5f5f5]"
                    >
                      <Plus size={17} />
                    </button>

                    <span className="w-9 text-center text-sm font-bold text-[#424750]">
                      {quantity}
                    </span>

                    <button
                      onClick={decrease}
                      className="flex h-full w-10 items-center justify-center text-[#19bfd3] transition hover:bg-[#f5f5f5]"
                    >
                      <Minus size={17} />
                    </button>
                  </div>

                  <button
                    onClick={addToCart}
                    className="
                      flex h-[52px]
                      flex-1
                      items-center
                      justify-center
                      gap-2
                      rounded-lg
                      bg-[#ef394e]
                      px-4
                      text-sm
                      font-bold
                      text-white
                      transition
                      hover:bg-[#d92f42]
                    "
                  >
                    <ShoppingBag size={19} />
                    افزودن به سبد خرید
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRODUCT TABS ================= */}
      <section className="mx-auto mt-7 w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="border border-[#e0e0e2] bg-white">

          {/* TAB HEADER */}
          <div className="overflow-x-auto border-b border-[#e0e0e2]">
            <div className="flex min-w-max">
              {[
                ["specs", "مشخصات فنی"],
                ["description", "توضیحات"],
                ["reviews", "دیدگاه کاربران"],
                ["questions", "پرسش و پاسخ"],
              ].map(([tab, title]) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    relative px-7 py-5
                    text-sm font-bold
                    ${
                      activeTab === tab
                        ? "text-[#ef394e]"
                        : "text-[#62666d]"
                    }
                  `}
                >
                  {title}

                  {activeTab === tab && (
                    <span className="absolute bottom-0 right-5 left-5 h-[3px] bg-[#ef394e]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* SPECS */}
          {activeTab === "specs" && (
            <div className="p-5 sm:p-8">
              <h2 className="mb-6 text-lg font-bold text-[#23262a]">
                مشخصات فنی
              </h2>

              <div className="overflow-hidden border border-[#e0e0e2]">
                {features.map(([label, value], index) => (
                  <div
                    key={label}
                    className={`
                      grid grid-cols-1
                      gap-3
                      px-5 py-4
                      sm:grid-cols-[220px_1fr]
                      sm:items-center
                      ${
                        index !== features.length - 1
                          ? "border-b border-[#e0e0e2]"
                          : ""
                      }
                    `}
                  >
                    <div className="text-xs text-[#81858b]">
                      {label}
                    </div>

                    <div className="text-sm text-[#424750]">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DESCRIPTION */}
          {activeTab === "description" && (
            <div className="p-5 sm:p-8">
              <h2 className="mb-6 text-lg font-bold text-[#23262a]">
                توضیحات محصول
              </h2>

              <div className="max-w-4xl">
                <p className="text-sm leading-9 text-[#62666d]">
                  {product.description}
                </p>
              </div>
            </div>
          )}

          {/* REVIEWS */}
          {activeTab === "reviews" && (
            <div className="p-5 sm:p-8">
              <div className="grid gap-8 lg:grid-cols-[280px_1fr]">

                <div className="border-l border-[#e0e0e2] pl-8">
                  <h2 className="text-lg font-bold text-[#23262a]">
                    امتیاز کاربران
                  </h2>

                  <div className="mt-5 flex items-center gap-3">
                    <span className="text-4xl font-black text-[#23262a]">
                      {product.rating?.rate || 0}
                    </span>

                    <div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((item) => (
                          <Star
                            key={item}
                            size={15}
                            fill="currentColor"
                            className="text-[#f9a825]"
                          />
                        ))}
                      </div>

                      <p className="mt-2 text-[11px] text-[#81858b]">
                        بر اساس {product.rating?.count || 0} امتیاز
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="border-b border-[#e0e0e2] pb-5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-[#424750]">
                        نظر کاربران درباره این محصول
                      </span>

                      <MessageCircle
                        size={19}
                        className="text-[#81858b]"
                      />
                    </div>
                  </div>

                  <div className="py-6">
                    <p className="text-sm leading-8 text-[#62666d]">
                      هنوز دیدگاه ثبت‌شده‌ای برای این محصول وجود ندارد.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* QUESTIONS */}
          {activeTab === "questions" && (
            <div className="p-5 sm:p-8">
              <div className="flex gap-4 border-b border-[#e0e0e2] pb-6">
                <HelpCircle
                  size={22}
                  className="shrink-0 text-[#81858b]"
                />

                <div>
                  <h2 className="text-sm font-bold text-[#23262a]">
                    پرسش درباره محصول
                  </h2>

                  <p className="mt-2 text-xs leading-7 text-[#81858b]">
                    سوالی درباره مشخصات یا نحوه استفاده از محصول دارید؟
                  </p>
                </div>
              </div>

              <button className="mt-6 rounded-lg border border-[#ef394e] px-6 py-3 text-xs font-bold text-[#ef394e] transition hover:bg-[#fff5f6]">
                ثبت پرسش
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ================= RELATED ================= */}
      {relatedProducts.length > 0 && (
        <section className="mx-auto mt-7 w-full max-w-[1400px] px-4 pb-10 sm:px-6 lg:px-8">
          <div className="border border-[#e0e0e2] bg-white">

            <div className="flex items-center justify-between border-b border-[#e0e0e2] px-5 py-5 sm:px-7">
              <h2 className="text-lg font-bold text-[#23262a]">
                محصولات مرتبط
              </h2>

              <Link
                to="/products"
                className="text-xs font-bold text-[#19bfd3]"
              >
                مشاهده همه
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
              {relatedProducts.map((item, index) => (
                <Link
                  key={item.id}
                  to={`/product/${item.id}`}
                  className={`
                    group p-4 transition hover:shadow-[0_2px_12px_rgba(0,0,0,0.08)]
                    ${
                      index !== relatedProducts.length - 1
                        ? "border-l border-[#e0e0e2]"
                        : ""
                    }
                  `}
                >
                  <div className="flex h-[220px] items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-h-full max-w-full object-contain transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="mt-4 border-t border-[#f1f2f4] pt-4">
                    <h3 className="line-clamp-2 min-h-[50px] text-xs font-bold leading-6 text-[#424750]">
                      {item.title}
                    </h3>

                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <span className="text-sm font-black text-[#23262a]">
                          {item.price.toLocaleString("fa-IR")}
                        </span>

                        <span className="mr-1 text-[9px] text-[#81858b]">
                          تومان
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Star
                          size={13}
                          fill="currentColor"
                          className="text-[#f9a825]"
                        />

                        <span className="text-[10px] text-[#62666d]">
                          {item.rating?.rate || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= MOBILE CART ================= */}
      <div className="fixed bottom-0 right-0 left-0 z-50 border-t border-[#e0e0e2] bg-white p-3 shadow-[0_-3px_15px_rgba(0,0,0,0.08)] lg:hidden">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="text-[10px] text-[#81858b]">
              قیمت نهایی
            </div>

            <div className="mt-1">
              <span className="text-lg font-black text-[#23262a]">
                {finalPrice.toLocaleString("fa-IR")}
              </span>

              <span className="mr-1 text-[9px] text-[#424750]">
                تومان
              </span>
            </div>
          </div>

          <button
            onClick={addToCart}
            className="flex h-12 flex-[1.4] items-center justify-center gap-2 rounded-lg bg-[#ef394e] text-sm font-bold text-white"
          >
            <ShoppingBag size={18} />
            افزودن به سبد خرید
          </button>
        </div>
      </div>

      <div className="h-20 lg:hidden" />
    </main>
  );
}