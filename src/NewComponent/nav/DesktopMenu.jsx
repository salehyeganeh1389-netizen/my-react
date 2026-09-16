import ProductsMenu from "./ProductsMenu";

export default function DesktopMenu() {
  return (
    <div className="hidden border-b border-[#eeeeee] lg:block">

      <div
        className="
          mx-auto
          flex
          h-[54px]
          max-w-[1650px]
          items-center
          px-6
        "
      >

        <nav className="flex h-full items-center gap-8 xl:gap-9">

          <NavItem text="خانه" />

          <ProductsMenu />

          <NavItem text="مقالات" />

          <NavItem text="درباره ما" />

          <NavItem text="تماس با ما" />

        </nav>


        {/* تلفن */}
        <a
          href="tel:02532939863"
          className="
            mr-auto
            flex
            items-center
            gap-3
            text-[13px]
            text-[#333]
            transition
            hover:text-[#bd9257]
          "
        >
          <i className="bi bi-telephone text-[16px]" />

          <span className="font-medium">
            ۰۲۵-۳۲۹۳۹۸۶۳
          </span>
        </a>

      </div>
    </div>
  );
}


function NavItem({ text }) {
  return (
    <a
      href="#"
      className="
        flex
        h-full
        items-center
        text-[13px]
        font-medium
        text-[#333]
        transition
        hover:text-[#bd9257]
      "
    >
      {text}
    </a>
  );
}