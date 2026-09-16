import { useState } from "react";

import NavbarTop from "./NavbarTop";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <header dir="rtl" className="w-full bg-white">

      <NavbarTop
        mobileMenu={mobileMenu}
        setMobileMenu={setMobileMenu}
      />

      <DesktopMenu />

      <MobileMenu
        mobileMenu={mobileMenu}
      />

    </header>
  );
}
