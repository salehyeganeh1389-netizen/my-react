import logo from "../../assets/file_0000000068e481f5a07d2dd86cdc6e45.png";

import SearchBox from "./SearchBox";
import NavbarActions from "./NavbarActions";

export default function NavbarTop({
  mobileMenu,
  setMobileMenu,
}) {
  return (
    <div className="border-b border-[#eeeeee]">

      <div
        className="
          mx-auto
          flex
          min-h-[72px]
          max-w-[1650px]
          items-center
          px-4
          sm:px-6
          lg:h-[78px]
        "
      >

        {/* همبرگری موبایل */}
        <button
          type="button"
          onClick={() => setMobileMenu(!mobileMenu)}
          className="
            ml-3
            flex
            h-10
            w-10
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
            } text-[22px]`}
          />
        </button>


        {/* لوگو */}
        <a
          href="#"
          className="
            flex
            w-[120px]
            shrink-0
            items-center
            sm:w-[145px]
            lg:w-[175px]
          "
        >
          <img
            src={logo}
            alt="لوگو"
            className="
              max-h-[52px]
              max-w-full
              object-contain
              sm:max-h-[58px]
              lg:max-h-[62px]
            "
          />
        </a>


        {/* سرچ دسکتاپ */}
        <div
          className="
            mr-6
            hidden
            w-full
            max-w-[540px]
            lg:block
            xl:mr-10
          "
        >
          <SearchBox />
        </div>


        <div className="hidden flex-1 lg:block" />

        <NavbarActions />

      </div>


      {/* سرچ موبایل */}
      <div className="px-4 pb-4 sm:px-6 lg:hidden">
        <SearchBox />
      </div>

    </div>
  );
}
