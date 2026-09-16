export default function NavbarActions() {
  return (
    <div className="mr-auto flex items-center gap-1 sm:gap-3 lg:gap-5">

      {/* اعلان */}
      <button
        type="button"
        className="
          group
          relative
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          transition
          hover:bg-[#f7f4ef]
        "
      >
        <i
          className="
            bi bi-bell
            text-[19px]
            text-[#333]
            transition
            group-hover:text-[#bd9257]
            sm:text-[20px]
          "
        />

        <span
          className="
            absolute
            right-[7px]
            top-[6px]
            h-[6px]
            w-[6px]
            rounded-full
            bg-[#bd9257]
          "
        />
      </button>


      {/* ورود */}
      <button
        type="button"
        className="
          group
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          border
          border-[#e5e5e5]
          transition
          hover:border-[#bd9257]
          hover:bg-[#fdfbf8]
          sm:h-[43px]
          sm:w-auto
          sm:gap-3
          sm:rounded-[7px]
          sm:px-4
        "
      >
        <i
          className="
            bi bi-person
            text-[19px]
            text-[#555]
            transition
            group-hover:text-[#bd9257]
          "
        />

        <span className="hidden text-[13px] font-medium text-[#333] sm:block">
          ورود | ثبت‌نام
        </span>
      </button>


      {/* جداکننده */}
      <div className="hidden h-7 w-px bg-[#e5e5e5] sm:block" />


      {/* سبد خرید */}
      <button
        type="button"
        className="
          group
          relative
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          transition
          hover:bg-[#f7f4ef]
        "
      >
        <i
          className="
            bi bi-bag
            text-[20px]
            text-[#333]
            transition
            group-hover:text-[#bd9257]
          "
        />

        <span
          className="
            absolute
            -right-0
            -top-0
            flex
            h-[17px]
            min-w-[17px]
            items-center
            justify-center
            rounded-full
            bg-[#bd9257]
            px-1
            text-[9px]
            font-bold
            text-white
          "
        >
          ۰
        </span>
      </button>

    </div>
  );
}
