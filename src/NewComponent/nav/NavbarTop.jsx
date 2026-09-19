import logo from "../../assets/file_0000000068e481f5a07d2dd86cdc6e45.png";

export default function NavbarTop({
  mobileMenu,
  setMobileMenu,
  scrolled,
}) {
  return (
    <div
      className={`
        transition-all
        duration-500
        ${
          scrolled
            ? "border-transparent"
            : "border-b border-[#eeeeee]"
        }
      `}
    >
      <div
        className={`
          mx-auto
          flex
          items-center
          transition-all
          duration-500
          ${
            scrolled
              ? "h-[60px] px-5"
              : "min-h-[72px] max-w-[1650px] px-4 sm:px-6 lg:h-[78px]"
          }
        `}
      >
        {/* همبرگری موبایل */}
        <button
          type="button"
          onClick={() => setMobileMenu(!mobileMenu)}
          className="
            ml-2
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-full
            text-[#333]
            transition
            hover:bg-[#f7f4ef]
            lg:hidden
          "
        >
          <i
            className={`bi ${
              mobileMenu ? "bi-x-lg" : "bi-list"
            } text-[20px]`}
          />
        </button>

        {/* لوگو */}
        <a
          href="#"
          className={`
            flex
            shrink-0
            items-center
            transition-all
            duration-500
            ${
              scrolled
                ? "w-[105px]"
                : "w-[120px] sm:w-[145px] lg:w-[175px]"
            }
          `}
        >
          <img
            src={logo}
            alt="لوگو"
            className={`
              max-w-full
              object-contain
              transition-all
              duration-500
              ${
                scrolled
                  ? "max-h-[38px]"
                  : "max-h-[52px] sm:max-h-[58px] lg:max-h-[62px]"
              }
            `}
          />
        </a>

        {/* سرچ دسکتاپ */}
        <div
          className={`
            hidden
            w-full
            lg:block
            transition-all
            duration-500
            ${
              scrolled
                ? "mr-5 max-w-[380px]"
                : "mr-6 max-w-[540px] xl:mr-10"
            }
          `}
        >
          <SearchBox scrolled={scrolled} />
        </div>

        <div className="hidden flex-1 lg:block" />

        {/* اقدامات */}
        <NavbarActions scrolled={scrolled} />
      </div>

      {/* سرچ موبایل */}
      {!scrolled && (
        <div className="px-4 pb-4 sm:px-6 lg:hidden">
          <SearchBox />
        </div>
      )}
    </div>
  );
}


/* =========================
   Search Box
========================= */

function SearchBox({ scrolled = false }) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="جستجو در محصولات..."
        className={`
          w-full
          border
          border-[#e8e8e8]
          bg-[#f7f7f7]
          px-5
          pl-12
          text-right
          text-[13px]
          text-[#333]
          outline-none
          transition-all
          duration-500
          placeholder:text-[#999]
          hover:border-[#d8d8d8]
          focus:border-[#bd9257]
          focus:bg-white
          focus:shadow-[0_4px_18px_rgba(189,146,87,0.08)]
          ${
            scrolled
              ? "h-[42px] rounded-full bg-white/45"
              : "h-[44px] rounded-[8px]"
          }
        `}
      />

      <i
        className="
          bi bi-search
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-[16px]
          text-[#888]
        "
      />
    </div>
  );
}


/* =========================
   Navbar Actions
========================= */

function NavbarActions({ scrolled = false }) {
  return (
    <div
      className={`
        mr-auto
        flex
        items-center
        transition-all
        duration-500
        ${
          scrolled
            ? "gap-1"
            : "gap-1 sm:gap-2 lg:gap-5"
        }
      `}
    >
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
            group-hover:text-[#166534]
          "
        />

        <span
          className="
            absolute
            right-[6px]
            top-[5px]
            h-[5px]
            w-[5px]
            rounded-full
            bg-[#166534]
          "
        />
      </button>

      {/* ورود */}
      <button
        type="button"
        className={`
          group
          flex
          items-center
          justify-center
          border
          border-[#e5e5e5]
          transition-all
          duration-500
          hover:border-[#166534]
          hover:bg-[#fdfbf8]
          ${
            scrolled
              ? "h-9 w-9 rounded-full"
              : "h-10 w-10 rounded-full sm:h-[43px] sm:w-auto sm:gap-3 sm:rounded-[7px] sm:px-4"
          }
        `}
      >
        <i
          className="
            bi bi-person
            text-[18px]
            text-[#555]
            transition
            group-hover:text-[#166534]
          "
        />

        {!scrolled && (
          <span className="hidden text-[13px] font-medium text-[#333] sm:block">
            ورود | ثبت‌نام
          </span>
        )}
      </button>

      {/* جداکننده */}
      {!scrolled && (
        <div className="hidden h-7 w-px bg-[#e5e5e5] sm:block" />
      )}

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
            group-hover:text-[#166534]
          "
        />

        <span
          className="
            absolute
            right-0
            top-0
            flex
            h-[16px]
            min-w-[16px]
            items-center
            justify-center
            rounded-full
            bg-[#166534]
            px-1
            text-[8px]
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