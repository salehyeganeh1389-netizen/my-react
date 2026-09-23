import logo from "../../assets/file_0000000068e481f5a07d2dd86cdc6e45.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer dir="rtl" className="mt-16 border-t border-[#eeeeee] bg-[#faf9f6]">
      <div className="mx-auto max-w-[1450px] px-5 py-10 sm:px-8 lg:px-10">
        {/* =========================
            بخش اصلی
        ========================= */}
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          
          {/* معرفی */}
          <div className="lg:col-span-1">
            <img
              src={logo}
              alt="قماش شیخ الاسلامی"
              className="mb-4 w-[135px] object-contain"
            />

            <p className="text-[12px] leading-7 text-[#666]">
              قماش شیخ الاسلامی با بیش از ۱۵ سال تجربه در صنعت طراحی و تولید
              چادر، عبا و ملزومات حجاب، با هدف ارائه محصولات باکیفیت و قیمت
              مناسب فعالیت می‌کند.
            </p>

            {/* شبکه‌های اجتماعی */}
            <div className="mt-5 flex items-center gap-2">
              <SocialButton icon="bi-instagram" />
              <SocialButton icon="bi-telegram" />
              <SocialButton icon="bi-whatsapp" />
            </div>
          </div>

          {/* راهنمای خرید */}
          <FooterColumn title="راهنمای خرید">
            <FooterLink text="نحوه ثبت سفارش" to="/order" />
            <FooterLink text="روش‌های ارسال" to="/shipping" />
            <FooterLink text="پیگیری سفارش" to="/tracking" />
            <FooterLink text="مرجوعی و تعویض" to="/return" />
            <FooterLink text="پرسش‌های متداول" to="/faq" />
          </FooterColumn>

          {/* پیوندها */}
          <FooterColumn title="پیوندها">
            <FooterLink text="صفحه اصلی" to="/" />
            <FooterLink text="محصولات" to="/products" />
            <FooterLink text="مقالات" to="/articles" />
            <FooterLink text="درباره ما" to="/about" />
            <FooterLink text="تماس با ما" to="/contact" />
          </FooterColumn>

          {/* شعبه */}
          <div>
            <h3 className="mb-4 text-[14px] font-bold text-[#222]">
              شعبه مرکزی
            </h3>

            <div className="space-y-3 text-[12px] leading-6 text-[#666]">
              <div className="flex items-start gap-2">
                <i className="bi bi-geo-alt mt-1 shrink-0 text-[14px] text-[#166534]" />

                <span>
                  مشهد، خیابان سناباد، سناباد 19، پلاک 225
                </span>
              </div>

              <div className="flex items-center gap-2">
                <i className="bi bi-clock shrink-0 text-[14px] text-[#166534]" />

                <span>9 الی ۱۴ - 17 الی ۲۲</span>
              </div>

              <a
                href="tel:02537723145"
                dir="ltr"
                className="
                  inline-flex
                  items-center
                  gap-2
                  text-[13px]
                  font-medium
                  text-[#333]
                  transition
                  hover:text-[#166534]
                "
              >
                <i className="bi bi-telephone text-[13px]" />
                ۰۲۵-۳۷۷۲۳۱۴۵
              </a>
            </div>
          </div>
        </div>

        {/* خط جداکننده */}
        <div className="my-8 h-px bg-[#e8e5df]" />

        {/* پایین فوتر */}
        <div
          className="
            flex
            flex-col
            items-center
            justify-center
            text-center
            sm:flex-row
            sm:text-right
          "
        >
          <p className="text-[11px] text-[#777]">
            توسعه داده شده توسط{" "}
            <a
              href="#"
              className="font-medium text-[#166534] transition hover:text-[#bd9257]"
            >
              صالح یگانه
            </a>
          </p>

          <p className="text-[11px] text-[#777]">
            تمامی حقوق این وب‌سایت محفوظ است ©
          </p>
        </div>
      </div>
    </footer>
  );
}

/* =========================
   Footer Column
========================= */

function FooterColumn({ title, children }) {
  return (
    <div>
      <h3 className="mb-4 text-[14px] font-bold text-[#222]">
        {title}
      </h3>

      <div className="flex flex-col items-start gap-2.5">
        {children}
      </div>
    </div>
  );
}

/* =========================
   Footer Link
========================= */

function FooterLink({ text, to }) {
  return (
    <Link
      to={to}
      className="
        text-[12px]
        text-[#666]
        transition-all
        duration-200
        hover:translate-x-[-2px]
        hover:text-[#166534]
      "
    >
      {text}
    </Link>
  );
}

/* =========================
   Social Button
========================= */

function SocialButton({ icon }) {
  return (
    <a
      href="#"
      aria-label="شبکه اجتماعی"
      className="
        flex
        h-8
        w-8
        items-center
        justify-center
        rounded-full
        border
        border-[#e3e0da]
        bg-white
        text-[#555]
        transition-all
        duration-200
        hover:border-[#166534]
        hover:bg-[#edf5f0]
        hover:text-[#166534]
      "
    >
      <i className={`bi ${icon} text-[13px]`} />
    </a>
  );
}