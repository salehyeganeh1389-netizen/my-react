import {
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

export default function ShopppSbaddd() {
  return (
    <>
      <div className="mb-10">
         
  
        </div>

      <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[28px] border border-gray-200 bg-white px-6 text-center shadow-sm">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#f1f5f2]">
          <ShoppingBag
            size={42}
            strokeWidth={1.5}
            className="text-[#173a2c]"
          />
        </div>

        <h2 className="text-xl font-bold text-gray-800">
          سبد خرید شما خالی است
        </h2>

        <p className="mt-3 max-w-md text-sm leading-7 text-gray-500">
          هنوز محصولی به سبد خرید خود اضافه نکرده‌اید.
          محصولات موردنظر خود را انتخاب کنید تا در این قسمت نمایش داده شوند.
        </p>

        <button
          type="button"
          className="
            mt-7
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-[#173a2c]
            px-6
            py-3
            text-sm
            font-medium
            text-white
            transition-all
            duration-200
            hover:bg-[#166534]
          "
        >
          مشاهده محصولات
          <ArrowRight size={17} />
        </button>
      </div>
    </>
  );
}