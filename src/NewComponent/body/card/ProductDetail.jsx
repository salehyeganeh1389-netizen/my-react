import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  ArrowLeft,
  ArrowRight,
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
  MessageCircle,
  Copy,
  Ruler,
  X,
  PackageCheck,
  Sparkles,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/products";

/* =========================================================
   THEME
========================================================= */

const theme = {
  dark: "#173a5e",
  green: "#176b4d",
  cream: "#f7f8f5",
  gold: "#ef394e",
  text: "#26352e",
  muted: "#737b74",
  border: "#e1e6e2",
};

/* =========================================================
   DEFAULT DATA
========================================================= */

const defaultFeatures = [
  ["جنس", "کیفیت عالی"],
  ["نوع محصول", "مناسب استفاده روزمره"],
  ["مناسب برای", "آقایان و بانوان"],
  ["فصل استفاده", "چهارفصل"],
  ["نحوه شستشو", "طبق دستور شستشو"],
  ["کیفیت", "درجه یک"],
];

const defaultSizeGuide = [
  {
    size: "S",
    chest: "88-92",
    waist: "72-76",
    length: "68",
  },
  {
    size: "M",
    chest: "92-96",
    waist: "76-80",
    length: "70",
  },
  {
    size: "L",
    chest: "96-100",
    waist: "80-84",
    length: "72",
  },
  {
    size: "XL",
    chest: "100-106",
    waist: "84-90",
    length: "74",
  },
  {
    size: "2XL",
    chest: "106-112",
    waist: "90-96",
    length: "76",
  },
];

const services = [
  {
    title: "امکان تحویل اکسپرس",
    image: "/express-delivery.svg",
  },
  {
    title: "۲۴ ساعته، ۷ روز هفته",
    image: "/support.svg",
  },
  {
    title: "امکان پرداخت در محل",
    image: "/cash-on-delivery.svg",
  },
  {
    title: "هفت روز ضمانت بازگشت کالا",
    image: "/days-return.svg",
  },
  {
    title: "ضمانت اصل بودن کالا",
    image: "/original-products.svg",
  },
];

/* =========================================================
   HELPERS
========================================================= */

function normalizeColors(colors) {
  if (!Array.isArray(colors)) {
    return [];
  }

  return colors
    .map((color) => {
      if (typeof color === "string") {
        return {
          name: color,
          value: color,
        };
      }

      if (color && typeof color === "object") {
        return {
          name:
            color.name ||
            color.title ||
            color.label ||
            "رنگ",
          value:
            color.value ||
            color.hex ||
            color.color ||
            "#eeeeee",
        };
      }

      return null;
    })
    .filter(Boolean);
}

function normalizeSizes(sizes) {
  if (!Array.isArray(sizes)) {
    return [];
  }

  return sizes
    .map((size) => {
      if (typeof size === "string") {
        return {
          value: size,
          available: true,
        };
      }

      if (size && typeof size === "object") {
        return {
          value:
            size.value ||
            size.name ||
            size.title ||
            size.label ||
            "-",
          available: size.available !== false,
        };
      }

      return null;
    })
    .filter(Boolean);
}

/* =========================================================
   COMPONENT
========================================================= */

export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState(1);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const [activeImage, setActiveImage] = useState("");

  const [isFavorite, setIsFavorite] = useState(false);

  const [activeTab, setActiveTab] = useState("specs");

  const [showSizeGuide, setShowSizeGuide] = useState(false);

  /* =========================================================
     GET PRODUCT
  ========================================================= */

  useEffect(() => {
    let isMounted = true;

    async function getProduct() {
      try {
        setLoading(true);

        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();

        if (!isMounted) return;

        setProduct(data);
        setActiveImage(data.image || "");

        /* -----------------------------------------------------
           RELATED PRODUCTS
        ----------------------------------------------------- */

        try {
          const allProductsResponse = await fetch(API_URL);

          if (allProductsResponse.ok) {
            const allProducts =
              await allProductsResponse.json();

            const sameCategory = allProducts.filter(
              (item) =>
                item.id !== data.id &&
                item.category === data.category
            );

            const otherProducts = allProducts.filter(
              (item) =>
                item.id !== data.id &&
                item.category !== data.category
            );

            const related = [
              ...sameCategory,
              ...otherProducts,
            ].slice(0, 4);

            if (isMounted) {
              setRelatedProducts(related);
            }
          }
        } catch (relatedError) {
          console.error(
            "Related products error:",
            relatedError
          );

          if (isMounted) {
            setRelatedProducts([]);
          }
        }

        /* -----------------------------------------------------
           COLOR
        ----------------------------------------------------- */

        const colors = normalizeColors(data.colors);

        setSelectedColor(
          colors.length > 0 ? colors[0] : null
        );

        /* -----------------------------------------------------
           SIZE
        ----------------------------------------------------- */

        const sizes = normalizeSizes(data.sizes);

        setSelectedSize(
          sizes.length > 0 ? sizes[0].value : null
        );
      } catch (error) {
        console.error(error);

        if (isMounted) {
          setProduct(null);
          setRelatedProducts([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    getProduct();

    return () => {
      isMounted = false;
    };
  }, [id]);

  /* =========================================================
     NORMALIZED DATA
  ========================================================= */

  const productColors = useMemo(() => {
    return normalizeColors(product?.colors);
  }, [product]);

  const productSizes = useMemo(() => {
    return normalizeSizes(product?.sizes);
  }, [product]);

  const productFeatures = useMemo(() => {
    if (
      Array.isArray(product?.features) &&
      product.features.length > 0
    ) {
      return product.features
        .map((item) => {
          if (Array.isArray(item)) {
            return item;
          }

          return [
            item?.label ||
              item?.title ||
              "ویژگی",
            item?.value || "-",
          ];
        })
        .filter(Boolean);
    }

    return defaultFeatures;
  }, [product]);

  /* =========================================================
     PRODUCT TYPE
  ========================================================= */

  const productType = useMemo(() => {
    const group = product?.group;

    const category = String(
      product?.category || ""
    ).toLowerCase();

    if (group === "fabric") {
      return "fabric";
    }

    if (
      category.includes("towel") ||
      category.includes("حوله")
    ) {
      return "towel";
    }

    return "clothing";
  }, [product]);

  const isClothing = productType === "clothing";
  const isFabric = productType === "fabric";
  const isTowel = productType === "towel";

  /* =========================================================
     SIZE GUIDE
  ========================================================= */

  const sizeGuideRows = useMemo(() => {
    if (isTowel) {
      return [
        [
          "دست و صورت",
          "50",
          "90",
          "استفاده روزمره",
        ],
        [
          "حمام",
          "70",
          "140",
          "حمام",
        ],
        [
          "تن‌پوش",
          "80",
          "150",
          "حمام و استخر",
        ],
      ];
    }

    if (!isClothing) {
      return [];
    }

    if (
      product?.sizeGuide &&
      Array.isArray(product.sizeGuide.rows)
    ) {
      return product.sizeGuide.rows.map((row) => [
        row.size || "-",
        row.chest || row.sine || "-",
        row.waist || row.kamar || "-",
        row.length || row.height || "-",
      ]);
    }

    return defaultSizeGuide.map((row) => [
      row.size,
      row.chest,
      row.waist,
      row.length,
    ]);
  }, [isClothing, isTowel, product]);

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

  const addToCart = async () => {
    const cartItem = {
      ...product,
      quantity,
      selectedColor,
      selectedSize,
    };

    console.log("Cart:", cartItem);

    await Swal.fire({
      icon: "success",
      title: "به سبد خرید اضافه شد",
      text: `${quantity} عدد از «${product.title}» به سبد خرید اضافه شد.`,
      confirmButtonText: "باشه",
      confirmButtonColor: theme.green,
      background: "#ffffff",
      color: theme.text,
      width: "380px",
      customClass: {
        popup: "rounded-2xl",
        title: "text-[16px]",
        htmlContainer: "text-[12px]",
        confirmButton:
          "rounded-lg px-6 py-2.5 text-[11px] font-bold",
      },
    });
  };

  /* =========================================================
     SHARE
  ========================================================= */

  const shareProduct = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: product.title,
          text: "مشاهده این محصول در قماش شیخ الاسلامی",
          url: window.location.href,
        });

        return;
      }

      await navigator.clipboard.writeText(
        window.location.href
      );

      await Swal.fire({
        icon: "success",
        title: "لینک کپی شد",
        text: "لینک محصول در کلیپ‌بورد ذخیره شد.",
        confirmButtonText: "باشه",
        confirmButtonColor: theme.green,
        background: "#ffffff",
        color: theme.text,
        width: "350px",
        customClass: {
          popup: "rounded-2xl",
          title: "text-[15px]",
          htmlContainer: "text-[11px]",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* =========================================================
     CATEGORY
  ========================================================= */

  const productCategoryLink =
    product?.group && product?.category
      ? `/products/${product.group}/${product.category}`
      : "/products";

  const productCategoryTitle =
    product?.group === "fabric"
      ? "پارچه"
      : product?.group === "clothing"
      ? "پوشاک"
      : "محصولات";

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <main
        dir="rtl"
        className="min-h-screen bg-[#f5f7f5]"
      >
        <div className="mx-auto max-w-[1450px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">

          <div className="animate-pulse">

            <div className="mb-8 h-3 w-44 rounded-full bg-[#e1e6e2]" />

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">

              <div className="h-[610px] rounded-2xl border border-[#e1e6e2] bg-white" />

              <div className="space-y-4">

                <div className="h-4 w-24 rounded bg-[#e1e6e2]" />

                <div className="h-10 w-4/5 rounded bg-[#e1e6e2]" />

                <div className="h-4 w-2/5 rounded bg-[#e1e6e2]" />

                <div className="h-px bg-[#e1e6e2]" />

                <div className="h-24 rounded-xl bg-white" />

                <div className="h-20 rounded-xl bg-white" />

                <div className="h-40 rounded-xl bg-white" />

              </div>

            </div>

          </div>

        </div>
      </main>
    );
  }

  /* =========================================================
     NOT FOUND
  ========================================================= */

  if (!product) {
    return (
      <main
        dir="rtl"
        className="flex min-h-[65vh] items-center justify-center bg-[#f5f7f5] px-4"
      >
        <div className="text-center">

          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-[#dfe5e1] bg-white">

          </div>

          <h1 className="text-xl font-bold text-[#173a5e]">
            محصول پیدا نشد
          </h1>

          <p className="mt-3 text-sm text-[#737b74]">
            محصول مورد نظر در فروشگاه موجود نیست.
          </p>

          <Link
            to="/products"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#176b4d] px-6 py-3 text-xs font-bold text-white transition hover:bg-[#12563e]"
          >
            مشاهده محصولات
            <ArrowLeft size={14} />
          </Link>

        </div>
      </main>
    );
  }

  /* =========================================================
     PRICE
  ========================================================= */

  const originalPrice = Math.round(
    product.price * 1.12
  );

  const discountPercent = 10;

  const finalPrice = product.price;

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <main
      dir="rtl"
      className="min-h-screen  text-[#26352e]"
    >
      <div className="mx-auto w-full max-w-[1450px] px-4 py-5 pb-28 sm:px-6 lg:px-8 lg:py-7 lg:pb-10">

        {/* =====================================================
            BREADCRUMB
        ===================================================== */}

        <div className="mb-6 flex items-center gap-2 overflow-hidden whitespace-nowrap text-[10px] text-[#777777]">

          <Link
            to="/"
            className="shrink-0 transition hover:text-[#176b4d]"
          >
            خانه
          </Link>

          <ArrowLeft size={11} />

          <Link
            to="/products"
            className="shrink-0 transition hover:text-[#176b4d]"
          >
            محصولات
          </Link>

          <ArrowLeft size={11} />

          <Link
            to={productCategoryLink}
            className="shrink-0 transition hover:text-[#176b4d]"
          >
            {productCategoryTitle}
          </Link>

          <ArrowLeft size={11} />

          <span className="max-w-[250px] overflow-hidden text-ellipsis text-[#4a4a4a]">
            {product.title}
          </span>

        </div>

        {/* =====================================================
            TOP PRODUCT
        ===================================================== */}
<section className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_370px]">

  {/* ===================================================
      MAIN CONTENT
  =================================================== */}

  <div className="min-w-0">

    <div className="grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">

      {/* =================================================
          GALLERY
      ================================================= */}

      <div>

        <div className="relative overflow-hidden rounded-2xl border border-[#dfe5e1] bg-white shadow-[0_2px_12px_rgba(23,58,44,0.035)]">

          <div className="pointer-events-none absolute right-0 top-0 h-[3px] w-full bg-[#176b4d]" />

          <div className="absolute right-4 top-4 z-10 flex flex-col gap-2">

            <button
              type="button"
              onClick={() =>
                setIsFavorite((prev) => !prev)
              }
              className={`flex h-9 w-9 items-center justify-center rounded-full border bg-white/95 backdrop-blur transition ${
                isFavorite
                  ? "border-[#176b4d] bg-[#eef6f2] text-[#176b4d]"
                  : "border-[#dfe5e1] text-[#4a4a4a] hover:border-[#176b4d] hover:text-[#176b4d]"
              }`}
              aria-label="علاقه‌مندی"
            >
              <Heart
                size={17}
                fill={
                  isFavorite
                    ? "currentColor"
                    : "transparent"
                }
              />
            </button>

            <button
              type="button"
              onClick={shareProduct}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#dfe5e1] bg-white/95 text-[#4a4a4a] backdrop-blur transition hover:border-[#176b4d] hover:text-[#176b4d]"
              aria-label="اشتراک‌گذاری"
            >
              <Share2 size={16} />
            </button>

          </div>

          <div className="flex min-h-[390px] items-center justify-center bg-[#f7f8f5] p-8 sm:min-h-[520px] sm:p-10">

            {activeImage ? (
              <img
                src={activeImage}
                alt={product.title}
                className="max-h-[475px] max-w-full object-contain transition duration-500 hover:scale-[1.02]"
              />
            ) : (
              <div className="flex h-full min-h-[300px] w-full items-center justify-center text-[#999999]">
                <ShoppingBag size={42} />
              </div>
            )}

          </div>

          <div className="flex items-center justify-between border-t border-[#eeeeee] bg-white px-4 py-3">

            <span className="text-[9px] text-[#888888]">
              تصویر محصول
            </span>

            <div className="flex items-center gap-1.5">

              <span className="h-1.5 w-1.5 rounded-full bg-[#176b4d]" />

              <span className="text-[9px] text-[#666666]">
                قماش شیخ الاسلامی
              </span>

            </div>

          </div>

        </div>

        <div className="mt-3 flex gap-2.5 overflow-x-auto pb-1">

          {[1, 2, 3].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() =>
                setActiveImage(product.image)
              }
              className={`flex h-[70px] w-[70px] shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-white p-2 transition ${
                activeImage === product.image &&
                item === 1
                  ? "border-[#176b4d] ring-1 ring-[#176b4d]/10"
                  : "border-[#dfe5e1] hover:border-[#176b4d]"
              }`}
            >
              <img
                src={product.image}
                alt=""
                className={`h-full w-full object-contain ${
                  item === 2
                    ? "opacity-70"
                    : item === 3
                    ? "opacity-45"
                    : ""
                }`}
              />
            </button>
          ))}

        </div>

      </div>

      {/* =================================================
          INFORMATION
      ================================================= */}

      <div className="min-w-0">

        <div className="flex items-center justify-between">

          <Link
            to={productCategoryLink}
            className="inline-flex items-center gap-1.5 text-[10px] font-medium text-[#176b4d] transition hover:text-[#173a5e]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#176b4d]" />
            {productCategoryTitle}
          </Link>

          <button
            type="button"
            onClick={shareProduct}
            className="flex items-center gap-1.5 text-[10px] text-[#777777] transition hover:text-[#176b4d]"
          >
            <Copy size={12} />
            اشتراک‌گذاری
          </button>

        </div>

        <h1 className="mt-3 text-[21px] font-bold leading-[1.9] text-[#173a5e] sm:text-[25px]">
          {product.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-3">

          <div className="flex items-center gap-1.5 rounded-full border border-[#dce8e2] bg-[#eef6f2] px-2.5 py-1.5">

            <Star
              size={13}
              fill="currentColor"
              className="text-[#176b4d]"
            />

            <span className="text-[10px] font-bold text-[#4a4a4a]">
              {product.rating?.rate || 0}
            </span>

          </div>

          <span className="text-[10px] text-[#777777]">
            {product.rating?.count || 0} نظر
          </span>

          <span className="h-3 w-px bg-[#d6d6d6]" />

          <span className="text-[10px] text-[#777777]">
            انتخابی مطمئن از قماش شیخ الاسلامی
          </span>

        </div>

        <div className="my-6 h-px bg-[#e1e6e2]" />

        {/* DESCRIPTION */}

        <div>

          <div className="mb-2.5 flex items-center gap-2">

            <span className="h-4 w-1 rounded-full bg-[#176b4d]" />

            <h2 className="text-[12px] font-bold text-[#26352e]">
              درباره این محصول
            </h2>

          </div>

          <p className="text-[11px] leading-8 text-[#4a4a4a]">
            {product.description}
          </p>

        </div>

        {/* COLOR */}

        {isClothing &&
          productColors.length > 0 && (
            <div className="mt-7">

              <div className="mb-3 flex items-center gap-2">

                <span className="text-[12px] font-bold text-[#26352e]">
                  رنگ
                </span>

                <span className="text-[10px] text-[#777777]">
                  {selectedColor?.name}
                </span>

              </div>

              <div className="flex flex-wrap gap-2">

                {productColors.map(
                  (color) => (
                    <button
                      type="button"
                      key={color.name}
                      onClick={() =>
                        setSelectedColor(color)
                      }
                      className={`flex min-h-[40px] items-center gap-2 rounded-xl border bg-white px-2.5 text-[10px] transition ${
                        selectedColor?.name ===
                        color.name
                          ? "border-[#176b4d] bg-[#eef6f2] text-[#176b4d] shadow-sm"
                          : "border-[#dfe5e1] text-[#4a4a4a] hover:border-[#176b4d]"
                      }`}
                    >

                      <span
                        className="h-5 w-5 rounded-full border border-[#d6d6d6] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.45)]"
                        style={{
                          backgroundColor:
                            color.value,
                        }}
                      />

                      <span>
                        {color.name}
                      </span>

                      {selectedColor?.name ===
                        color.name && (
                        <Check
                          size={12}
                          className="text-[#176b4d]"
                        />
                      )}

                    </button>
                  )
                )}

              </div>

            </div>
          )}

        {/* SIZE */}

        {isClothing &&
          productSizes.length > 0 && (
            <div className="mt-7">

              <div className="mb-3 flex items-center justify-between">

                <span className="text-[12px] font-bold text-[#26352e]">
                  سایز
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setShowSizeGuide(true)
                  }
                  className="flex items-center gap-1.5 text-[10px] text-[#777777] transition hover:text-[#176b4d]"
                >
                  <Ruler size={13} />
                  راهنمای انتخاب سایز
                </button>

              </div>

              <div className="flex flex-wrap gap-2">

                {productSizes.map(
                  (size) => (
                    <button
                      type="button"
                      key={size.value}
                      disabled={!size.available}
                      onClick={() =>
                        setSelectedSize(
                          size.value
                        )
                      }
                      className={`relative min-w-[54px] rounded-xl border px-4 py-2.5 text-[11px] transition ${
                        selectedSize ===
                          size.value &&
                        size.available
                          ? "border-[#176b4d] bg-[#176b4d] font-bold text-white shadow-sm"
                          : size.available
                          ? "border-[#dfe5e1] bg-white text-[#4a4a4a] hover:border-[#176b4d]"
                          : "cursor-not-allowed border-[#eeeeee] bg-[#f5f5f5] text-[#b5b5b5]"
                      }`}
                    >
                      {size.value}

                      {!size.available && (
                        <span className="absolute left-1 right-1 top-1/2 h-px -rotate-12 bg-[#bdbdbd]" />
                      )}
                    </button>
                  )
                )}

              </div>

            </div>
          )}

        {/* FEATURES */}

        <div className="mt-8">

          <div className="mb-4 flex items-center justify-between">

            <div className="flex items-center gap-2">

              <span className="h-4 w-1 rounded-full bg-[#176b4d]" />

              <h2 className="text-[13px] font-bold text-[#26352e]">
                ویژگی‌های محصول
              </h2>

            </div>

            <span className="text-[9px] text-[#999999]">
              مشخصات کلیدی
            </span>

          </div>

           <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">

                    {productFeatures
                      .slice(0, 6)
                      .map(([label, value], index) => (
                        <div
                          key={`${label}-${index}`}
                          className="
                            flex
                            min-h-[62px]
                            items-center
                            justify-between
                            gap-4
                            rounded-[22px]
                            border
                            border-[#e1e6e2]
                            bg-gray-100
                            w-60
                            px-3.5
                            py-3
                            transition-all
                            duration-200
                            hover:border-[#cbd5cf]
                            hover:shadow-[0_4px_15px_rgba(23,58,44,0.045)]
                          "
                        >

                          <div className="flex min-w-0 items-center gap-2.5">

                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#eef6f2]">
                              <Check
                                size={11}
                                strokeWidth={2.5}
                                className="text-[#176b4d]"
                              />
                            </span>

                            <span className="truncate text-[9px] text-[#777777]">
                              {label}
                            </span>

                          </div>

                          <span className="max-w-[58%] text-left text-[10px] font-bold leading-5 text-[#26352e]">
                            {value}
                          </span>

                        </div>
                      ))}

                  </div>

        </div>

      </div>

    </div>

  </div>

  {/* ===================================================
      PURCHASE BOX
  =================================================== */}

  <aside className="order-2 lg:sticky lg:top-5">

    <div className="w-full overflow-hidden rounded-[10px] border border-[#dfe5e1] bg-white shadow-[0_4px_18px_rgba(23,58,44,0.06)]">

      {/* SELLER */}

      <div className="border-b border-[#eeeeee] px-4 py-4">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eef6f2]">
            <PackageCheck
              size={17}
              className="text-[#176b4d]"
            />
          </div>

          <div className="min-w-0">

            <p className="text-[9px] text-[#777777]">
              فروشنده
            </p>

            <p className="mt-1 truncate text-[11px] font-bold text-[#173a5e]">
              قماش شیخ الاسلامی
            </p>

          </div>

        </div>

      </div>

      {/* GUARANTEES */}

      <div className="border-b border-[#eeeeee] px-4 py-4">

        <div className="space-y-3.5">

          <div className="flex items-center gap-3">

            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#eef6f2]">
              <Check
                size={12}
                className="text-[#176b4d]"
              />
            </span>

            <span className="text-[10px] text-[#4a4a4a]">
              تضمین سلامت و اصالت کالا
            </span>

          </div>

          <div className="flex items-center gap-3">

            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#eef3f7]">
              <Truck
                size={12}
                className="text-[#173a5e]"
              />
            </span>

            <span className="text-[10px] text-[#4a4a4a]">
              ارسال سریع سفارش
            </span>

          </div>

          <div className="flex items-center gap-3">

            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f5f6f5]">
              <RotateCcw
                size={12}
                className="text-[#777777]"
              />
            </span>

            <span className="text-[10px] text-[#4a4a4a]">
              امکان بازگشت طبق شرایط فروشگاه
            </span>

          </div>

        </div>

      </div>

      {/* PRICE */}

      <div className="px-4 py-4">

        <div className="flex items-end justify-between">

          <div>

            <div className="flex items-center gap-2">

              <span className="rounded-md bg-[#eef3f7] px-2 py-1 text-[9px] font-bold text-[#173a5e]">
                {discountPercent}٪
              </span>

              <span className="text-[10px] text-[#777777] line-through">
                {originalPrice.toLocaleString(
                  "fa-IR"
                )}{" "}
                تومان
              </span>

            </div>

            <div className="mt-2 flex items-baseline gap-1">

              <span className="text-[23px] font-black tracking-tight text-[#173a5e]">
                {finalPrice.toLocaleString(
                  "fa-IR"
                )}
              </span>

              <span className="text-[9px] text-[#666666]">
                تومان
              </span>

            </div>

          </div>

          <span className="pb-1 text-[9px] text-[#888888]">
            قیمت نهایی
          </span>

        </div>

        {/* QUANTITY */}

        <div className="mt-5 flex items-center justify-between">

          <span className="text-[11px] font-bold text-[#26352e]">
            تعداد
          </span>

        </div>

        {/* ADD CART */}

        <button
          type="button"
          onClick={addToCart}
          className="mt-4 flex h-[48px] w-full items-center justify-center gap-2 rounded-[8px] bg-[#176b4d] text-[12px] font-bold text-white shadow-[0_4px_12px_rgba(23,58,44,0.12)] transition duration-200 hover:bg-[#12563e] hover:shadow-[0_6px_16px_rgba(23,58,44,0.16)] active:scale-[0.985]"
        >
          <ShoppingBag size={17} />
          افزودن به سبد خرید
        </button>

        <p className="mt-2.5 text-center text-[8px] leading-5 text-[#999999]">
          موجودی و قیمت محصول هنگام ثبت سفارش بررسی می‌شود.
        </p>

      </div>

    </div>

  </aside>

</section>

        {/* =====================================================
            SERVICES
        ===================================================== */}

<section className="mt-20 py-5">

  <div className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-5">

    {services.map((service) => {
      return (
        <div
          key={service.title}
          className="flex items-center justify-center gap-3"
        >

          <img
            src={service.image}
            alt=""
            className="h-12 w-12 shrink-0 object-contain"
          />

          <label className="text-[12px] font-bold text-[#333333]">
            {service.title}
          </label>

        </div>
      );
    })}

  </div>

</section>
        {/* =====================================================
            TABS
        ===================================================== */}

 <section className="mt-9">

  {/* TABS */}

  <div className="overflow-x-auto border-b border-[#e1e6e2]">

    <div className="flex min-w-max gap-8">

      {[
        ["specs", "مشخصات"],
        ["description", "توضیحات"],
        ["reviews", "دیدگاه‌ها"],
        ["questions", "پرسش‌ها"],
      ].map(([key, label]) => (
        <button
          type="button"
          key={key}
          onClick={() => setActiveTab(key)}
          className={`relative pb-4 text-[11px] font-bold transition ${
            activeTab === key
              ? "text-[#176b4d]"
              : "text-[#777777] hover:text-[#173a5e]"
          }`}
        >
          {label}

          {activeTab === key && (
            <span className="absolute bottom-0 right-0 left-0 h-[2px] rounded-full bg-[#176b4d]" />
          )}
        </button>
      ))}

    </div>

  </div>

  {/* ===================================================
      SPECS
  =================================================== */}

  {activeTab === "specs" && (
    <div className="mt-8">

      <div className="mb-6">

        <div className="flex items-center gap-2">

          <span className="h-5 w-1 rounded-full bg-[#176b4d]" />

          <h2 className="text-[16px] font-bold text-[#173a5e]">
            مشخصات محصول
          </h2>

        </div>

        <p className="mr-3 mt-2 text-[9px] text-[#999999]">
          اطلاعات و ویژگی‌های اصلی محصول
        </p>

      </div>

      <div className="max-w-4xl">

        {productFeatures.map(
          ([label, value], index) => (
            <div
              key={`${label}-${index}`}
              className={`flex min-h-[58px] items-center gap-6 border-b border-[#eeeeee] py-3.5 ${
                index === 0
                  ? "border-t"
                  : ""
              }`}
            >

              <div className="w-[125px] shrink-0 text-[10px] text-[#777777] sm:w-[160px] sm:text-[11px]">
                {label}
              </div>

              <div className="min-w-0 flex-1 text-[10px] font-bold leading-6 text-[#26352e] sm:text-[11px]">
                {value}
              </div>

            </div>
          )
        )}

      </div>

    </div>
  )}

  {/* ===================================================
      DESCRIPTION
  =================================================== */}

  {activeTab === "description" && (
    <div className="mt-8 max-w-4xl">

      <div className="mb-6 flex items-center gap-2">

        <span className="h-5 w-1 rounded-full bg-[#176b4d]" />

        <h2 className="text-[16px] font-bold text-[#173a5e]">
          توضیحات محصول
        </h2>

      </div>

      <div className="max-w-3xl">

        <p className="text-[11px] leading-9 text-[#4a4a4a]">
          {product.description}
        </p>

        <p className="mt-6 text-[11px] leading-9 text-[#4a4a4a]">
          این محصول با هدف ارائه کیفیت مناسب
          و تجربه خرید مطمئن در فروشگاه قماش
          شیخ الاسلامی ارائه شده است.
        </p>

      </div>

    </div>
  )}

  {/* ===================================================
      REVIEWS
  =================================================== */}

  {activeTab === "reviews" && (
    <div className="mt-8">

      <div className="mb-6 flex items-center gap-2">

        <span className="h-5 w-1 rounded-full bg-[#176b4d]" />

        <h2 className="text-[16px] font-bold text-[#173a5e]">
          دیدگاه کاربران
        </h2>

      </div>

      <div className="flex flex-col gap-8 lg:flex-row">

        {/* RATING */}

        <div className="w-full lg:w-[230px]">

          <p className="text-[10px] text-[#777777]">
            امتیاز کاربران به این محصول
          </p>

          <div className="mt-3 flex items-center gap-3">

            <span className="text-3xl font-black text-[#173a5e]">
              {product.rating?.rate || 0}
            </span>

            <div>

              <div className="flex">

                {[1, 2, 3, 4, 5].map(
                  (item) => (
                    <Star
                      key={item}
                      size={14}
                      fill={
                        item <=
                        Math.round(
                          product.rating?.rate || 0
                        )
                          ? "currentColor"
                          : "transparent"
                      }
                      className="text-[#ef394e]"
                    />
                  )
                )}

              </div>

              <p className="mt-1 text-[9px] text-[#999999]">
                {product.rating?.count || 0} نظر
              </p>

            </div>

          </div>

        </div>

        {/* REVIEW */}

        <div className="flex-1">

          <div className="border-t border-[#eeeeee] pt-5">

            <div className="flex items-center justify-between">

              <div>

                <h3 className="text-[11px] font-bold text-[#173a5e]">
                  کاربر فروشگاه
                </h3>

                <div className="mt-1.5 flex">

                  {[1, 2, 3, 4, 5].map(
                    (item) => (
                      <Star
                        key={item}
                        size={13}
                        fill="currentColor"
                        className="text-[#ef394e]"
                      />
                    )
                  )}

                </div>

              </div>

              <span className="text-[8px] text-[#777777]">
                نظر ثبت‌شده
              </span>

            </div>

            <p className="mt-4 text-[11px] leading-8 text-[#4a4a4a]">
              محصول از نظر کیفیت و ظاهر
              رضایت‌بخش بوده و مطابق مشخصات
              درج‌شده ارائه شده است.
            </p>

          </div>

        </div>

      </div>

    </div>
  )}

  {/* ===================================================
      QUESTIONS
  =================================================== */}

  {activeTab === "questions" && (
    <div className="mt-8 max-w-4xl">

      <div className="mb-6 flex items-center gap-2">

        <span className="h-5 w-1 rounded-full bg-[#176b4d]" />

        <h2 className="text-[16px] font-bold text-[#173a5e]">
          پرسش و پاسخ
        </h2>

      </div>

      <div className="border-t border-[#eeeeee] pt-5">

        <div className="flex items-start gap-3">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eef6f2]">

            <MessageCircle
              size={18}
              className="text-[#176b4d]"
            />

          </div>

          <div>

            <p className="text-[11px] font-bold text-[#173a5e]">
              درباره این محصول سوالی دارید؟
            </p>

            <p className="mt-2 text-[9px] leading-6 text-[#777777]">
              سوال خود را مطرح کنید تا اطلاعات
              لازم درباره محصول در اختیار شما
              قرار گیرد.
            </p>

            <button
              type="button"
              onClick={() =>
                Swal.fire({
                  icon: "info",
                  title: "ثبت پرسش",
                  text: "بخش ثبت پرسش به‌زودی فعال می‌شود.",
                  confirmButtonText: "باشه",
                  confirmButtonColor:
                    theme.green,
                  background: "#ffffff",
                  color: theme.text,
                  width: "350px",
                })
              }
              className="mt-4 rounded-lg bg-[#176b4d] px-5 py-2.5 text-[10px] font-bold text-white transition hover:bg-[#12563e]"
            >
              ثبت پرسش
            </button>

          </div>

        </div>

      </div>

    </div>
  )}

</section>

        {/* =====================================================
            RELATED PRODUCTS
        ===================================================== */}

        {relatedProducts.length > 0 && (
          <section className="mt-14">

            <div className="mb-6 flex items-end justify-between">

              <div>

                <div className="mb-1.5 flex items-center gap-2">

                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#eef6f2]">

                    <Sparkles
                      size={12}
                      className="text-[#176b4d]"
                    />

                  </span>

                  <p className="text-[9px] text-[#777777]">
                    پیشنهاد فروشگاه
                  </p>

                </div>

                <h2 className="text-[17px] font-bold text-[#173a5e]">
                  محصولات مرتبط
                </h2>

              </div>

              <Link
                to="/products"
                className="flex items-center gap-1 text-[9px] font-bold text-[#737373] transition hover:text-[#176b4d]"
              >
                مشاهده همه
                <ArrowLeft size={11} />
              </Link>

            </div>

            {/* =================================================
                EXACTLY 4 RELATED PRODUCTS
            ================================================= */}

            <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">

              {relatedProducts.slice(0, 4).map(
                (item, index) => (
                  <Link
                    key={item.id}
                    to={`/product/${item.id}`}
                    className="
                      group
                      flex
                      h-full
                      flex-col
                      overflow-hidden
                      rounded-2xl
                      border
                      border-[#dfe5e1]
                      bg-white
                      transition-all
                      duration-500
                      hover:-translate-y-1
                      hover:border-[#cbd5cf]
                      hover:shadow-[0_16px_38px_rgba(23,58,44,0.08)]
                    "
                  >

                    {/* IMAGE */}

                    <div className="relative aspect-square overflow-hidden border-b border-[#eeeeee] bg-[#f7f8f5]">

                      <span className="absolute right-3 top-3 z-10 flex h-6 min-w-6 items-center justify-center rounded-full border border-[#e5e5e5] bg-white/90 px-1.5 text-[8px] font-bold text-[#666666] shadow-sm backdrop-blur">
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}
                      </span>

                      <span className="absolute left-3 top-3 z-10 rounded-full border border-[#f2c5cc] bg-[#fff4f5]/95 px-2.5 py-1 text-[7px] font-bold text-[#4a4a4a] backdrop-blur">
                        پیشنهاد
                      </span>

                      <div className="flex h-full w-full items-center justify-center p-5 sm:p-7">

                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          className="
                            h-full
                            w-full
                            object-contain
                            transition-transform
                            duration-700
                            ease-out
                            group-hover:scale-[1.06]
                          "
                        />

                      </div>

                    </div>

                    {/* INFO */}

                    <div className="flex flex-1 flex-col p-3.5 sm:p-4">

                      <h3 className="line-clamp-2 min-h-[46px] text-[10px] font-bold leading-6 text-[#26352e] sm:text-[11px]">
                        {item.title}
                      </h3>

                      <div className="mt-auto pt-4">

                        <div className="mb-3 h-px bg-[#eeeeee]" />

                        <div className="flex items-center justify-between gap-2">

                          <div className="min-w-0">

                            <p className="mb-1 text-[7px] text-[#999999]">
                              قیمت
                            </p>

                            <span className="block truncate text-[10px] font-black text-[#173a5e] sm:text-[11px]">
                              {Number(
                                item.price || 0
                              ).toLocaleString(
                                "fa-IR"
                              )}{" "}
                              تومان
                            </span>

                          </div>

                          <div className="flex shrink-0 items-center gap-1 rounded-lg border border-[#f2c5cc] bg-[#fff4f5] px-2 py-1.5">

                            <Star
                              size={10}
                              fill="currentColor"
                              className="text-[#ef394e]"
                            />

                            <span className="text-[8px] font-bold text-[#4a4a4a]">
                              {item.rating?.rate ||
                                0}
                            </span>

                          </div>

                        </div>

                      </div>

                    </div>

                  </Link>
                )
              )}

            </div>

          </section>
        )}

      </div>

      {/* =======================================================
          MOBILE CART
      ======================================================= */}

      <div className="fixed bottom-0 right-0 left-0 z-40 border-t border-[#dfe5e1] bg-white/95 p-3 shadow-[0_-6px_22px_rgba(23,58,44,0.08)] backdrop-blur lg:hidden">

        <div className="mx-auto max-w-[1450px]">

          <button
            type="button"
            onClick={addToCart}
            className="flex h-[47px] w-full items-center justify-center gap-2 rounded-xl bg-[#176b4d] text-[12px] font-bold text-white shadow-[0_6px_18px_rgba(23,58,44,0.12)] transition hover:bg-[#12563e] active:scale-[0.99]"
          >
            <ShoppingBag size={17} />
            افزودن به سبد خرید
          </button>

        </div>

      </div>

      <div className="h-20 lg:hidden" />

      {/* =======================================================
          SIZE GUIDE
      ======================================================= */}

      {showSizeGuide && isClothing && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#173a5e]/40 p-4 backdrop-blur-[3px]"
          onClick={() =>
            setShowSizeGuide(false)
          }
        >

          <div
            className="w-full max-w-[680px] overflow-hidden rounded-2xl border border-[#dfe5e1] bg-white shadow-[0_25px_70px_rgba(23,58,44,0.18)]"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-[#eeeeee] px-5 py-4">

              <div>

                <div className="flex items-center gap-2">

                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#eef6f2]">
                    <Ruler
                      size={14}
                      className="text-[#176b4d]"
                    />
                  </span>

                  <h2 className="text-[14px] font-bold text-[#173a5e]">
                    راهنمای انتخاب سایز
                  </h2>

                </div>

                <p className="mr-10 mt-1 text-[9px] text-[#999999]">
                  اندازه‌ها را با مشخصات خود مقایسه کنید
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setShowSizeGuide(false)
                }
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f5f6f5] text-[#4a4a4a] transition hover:bg-[#eeeeee] hover:text-[#176b4d]"
                aria-label="بستن"
              >
                <X size={15} />
              </button>

            </div>

            {/* BODY */}

            <div className="max-h-[70vh] overflow-y-auto p-5">

              <div className="mb-4 rounded-xl border border-[#e1e6e2] bg-[#f7f8f5] p-3.5">

                <div className="flex items-start gap-3">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white">
                    <Ruler
                      size={15}
                      className="text-[#173a5e]"
                    />
                  </div>

                  <div>

                    <p className="text-[10px] font-bold text-[#333333]">
                      انتخاب سایز مناسب
                    </p>

                    <p className="mt-1 text-[9px] leading-6 text-[#777777]">
                      اندازه‌های خود را با جدول زیر
                      مقایسه کنید و نزدیک‌ترین سایز را
                      انتخاب کنید.
                    </p>

                  </div>

                </div>

              </div>

              {/* TABLE */}

              <div className="overflow-hidden rounded-xl border border-[#dfe5e1] bg-white">

                <div className="grid grid-cols-4 bg-[#f5f6f5] text-[9px] font-bold text-[#4a4a4a]">

                  {[
                    "سایز",
                    "دور سینه",
                    "دور کمر",
                    "قد",
                  ].map((header) => (
                    <div
                      key={header}
                      className="border-l border-[#dfe5e1] px-2 py-3 text-center last:border-l-0"
                    >
                      {header}
                    </div>
                  ))}

                </div>

                {sizeGuideRows.map(
                  (row, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-4 border-t border-[#eeeeee] text-[9px] text-[#4a4a4a]"
                    >

                      {row.map(
                        (value, valueIndex) => (
                          <div
                            key={valueIndex}
                            className="border-l border-[#eeeeee] px-2 py-3 text-center last:border-l-0"
                          >
                            {value}
                          </div>
                        )
                      )}

                    </div>
                  )
                )}

              </div>

              <div className="mt-3 rounded-xl border border-[#f2c5cc] bg-[#fff4f5] px-3.5 py-3">

                <p className="text-[9px] leading-6 text-[#777777]">

                  <span className="font-bold text-[#ef394e]">
                    توجه:
                  </span>{" "}
                  اندازه‌ها ممکن است با توجه به مدل،
                  برش و نوع دوخت محصول کمی متفاوت باشند.

                </p>

              </div>

            </div>

            {/* FOOTER */}

            <div className="border-t border-[#eeeeee] px-5 py-4">

              <button
                type="button"
                onClick={() =>
                  setShowSizeGuide(false)
                }
                className="w-full rounded-xl bg-[#176b4d] py-3 text-[10px] font-bold text-white transition hover:bg-[#12563e]"
              >
                بستن
              </button>

            </div>

          </div>

        </div>
      )}

    </main>
  );
}