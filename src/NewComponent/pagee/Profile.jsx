import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  UserRound,
  ShoppingBag,
  MapPin,
  Heart,
  Settings,
  LogOut,
  Pencil,
  ChevronLeft,
  ShieldCheck,
  Package,
  Truck,
  CheckCircle2,
  Clock3,
  Plus,
  Trash2,
  Save,
  Phone,
  Mail,
  CalendarDays,
  ArrowLeft,
  CreditCard,
  CircleUserRound,
} from "lucide-react";

const menuItems = [
  {
    id: "account",
    label: "اطلاعات حساب کاربری",
    icon: UserRound,
  },
  {
    id: "orders",
    label: "سفارش‌های من",
    icon: ShoppingBag,
  },
  {
    id: "addresses",
    label: "آدرس‌های من",
    icon: MapPin,
  },
  {
    id: "favorites",
    label: "علاقه‌مندی‌ها",
    icon: Heart,
  },
  {
    id: "settings",
    label: "تنظیمات",
    icon: Settings,
  },
];

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState("account");

  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("qomash_auth");

    if (!savedUser) {
      navigate("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(savedUser);

      if (!parsedUser?.isLoggedIn) {
        navigate("/login");
        return;
      }

      setUser(parsedUser);

      const savedProfile =
        localStorage.getItem("qomash_profile");

      if (savedProfile) {
        try {
          const parsedProfile = JSON.parse(savedProfile);
          setProfileData(parsedProfile);
        } catch {
          console.log("خطا در خواندن پروفایل");
        }
      } else {
        const identifier = parsedUser.identifier || "";

        setProfileData({
          firstName: "",
          lastName: "",
          phone: /^09\d{9}$/.test(identifier)
            ? identifier
            : "",
          email: !/^09\d{9}$/.test(identifier)
            ? identifier
            : "",
        });
      }

      const savedAddresses =
        localStorage.getItem("qomash_addresses");

      if (savedAddresses) {
        try {
          setAddresses(JSON.parse(savedAddresses));
        } catch {
          setAddresses([]);
        }
      }
    } catch {
      localStorage.removeItem("qomash_auth");
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("qomash_auth");

    window.dispatchEvent(
      new Event("qomash-auth-changed")
    );

    navigate("/login");
  };

  const handleProfileChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveProfile = () => {
    localStorage.setItem(
      "qomash_profile",
      JSON.stringify(profileData)
    );

    setIsEditing(false);
  };

  const handleDeleteAddress = (id) => {
    const updatedAddresses = addresses.filter(
      (address) => address.id !== id
    );

    setAddresses(updatedAddresses);

    localStorage.setItem(
      "qomash_addresses",
      JSON.stringify(updatedAddresses)
    );
  };

  const handleAddAddress = () => {
    const newAddress = {
      id: Date.now(),
      title: "آدرس جدید",
      text: "هنوز آدرسی برای این مورد ثبت نشده است.",
      phone: profileData.phone || "",
    };

    const updatedAddresses = [
      ...addresses,
      newAddress,
    ];

    setAddresses(updatedAddresses);

    localStorage.setItem(
      "qomash_addresses",
      JSON.stringify(updatedAddresses)
    );
  };

  if (!user) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-white"
      >
        <p className="text-sm text-[#777]">
          در حال بارگذاری...
        </p>
      </main>
    );
  }

  const identifier = user.identifier || "";

  const displayName =
    profileData.firstName || profileData.lastName
      ? `${profileData.firstName} ${profileData.lastName}`.trim()
      : "کاربر قماش";

  return (
    <main
      dir="rtl"
      className="
        min-h-screen
        bg-white
        pb-16
        text-[#222]
      "
    >
      {/* =====================================================
          USER HEADER
      ===================================================== */}

      <div className="border-b border-[#eeeeee]">
        <div
          className="
            mx-auto
            max-w-[1200px]
            px-4
            py-7
            sm:px-6
            lg:px-8
          "
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className="
                  flex
                  h-16
                  w-16
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#f0f5f2]
                  text-[#173a2c]
                "
              >
                <CircleUserRound className="h-9 w-9" />
              </div>

              <div>
                <h1 className="text-lg font-bold text-[#222]">
                  {displayName}
                </h1>

                <div className="mt-1.5 flex items-center gap-2">
                  <span
                    dir="ltr"
                    className="text-xs text-[#777]"
                  >
                    {identifier}
                  </span>

                  <span className="h-1 w-1 rounded-full bg-[#c7c7c7]" />

                  <span className="text-xs text-[#17634b]">
                    حساب فعال
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="
                hidden
                items-center
                gap-2
                text-xs
                text-[#777]
                transition
                hover:text-[#222]
                sm:flex
              "
            >
              <LogOut className="h-4 w-4" />

              خروج از حساب
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          mx-auto
          max-w-[1200px]
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* Breadcrumb */}

        <div
          className="
            flex
            items-center
            gap-2
            border-b
            border-[#eeeeee]
            py-4
            text-xs
          "
        >
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-[#777] transition hover:text-[#173a2c]"
          >
            خانه
          </button>

          <ChevronLeft className="h-3.5 w-3.5 text-[#aaa]" />

          <span className="font-medium text-[#333]">
            حساب کاربری
          </span>
        </div>

        {/* =====================================================
            MOBILE MENU
        ===================================================== */}

        <div
          className="
            overflow-x-auto
            border-b
            border-[#eeeeee]
            lg:hidden
          "
        >
          <nav className="flex min-w-max">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active =
                activeSection === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setActiveSection(item.id)
                  }
                  className={`
                    flex
                    items-center
                    gap-2
                    border-b-2
                    px-4
                    py-4
                    text-xs
                    transition
                    ${
                      active
                        ? "border-[#173a2c] font-semibold text-[#173a2c]"
                        : "border-transparent text-[#777]"
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />

                  {item.label}
                </button>
              );
            })}

            <button
              type="button"
              onClick={handleLogout}
              className="
                flex
                items-center
                gap-2
                border-b-2
                border-transparent
                px-4
                py-4
                text-xs
                text-[#777]
              "
            >
              <LogOut className="h-4 w-4" />

              خروج
            </button>
          </nav>
        </div>

        {/* =====================================================
            DESKTOP LAYOUT
        ===================================================== */}

        <div
          className="
            grid
            lg:grid-cols-[230px_minmax(0,1fr)]
          "
        >
          {/* =====================================================
              SIDEBAR
          ===================================================== */}

          <aside
            className="
              hidden
              border-l
              border-[#eeeeee]
              lg:block
            "
          >
            <div className="sticky top-5 py-7 pl-7">
              <p className="mb-4 px-3 text-xs font-bold text-[#999]">
                حساب کاربری
              </p>

              <nav>
                {menuItems.map((item) => {
                  const Icon = item.icon;

                  const active =
                    activeSection === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setActiveSection(item.id)
                      }
                      className={`
                        relative
                        flex
                        w-full
                        items-center
                        gap-3
                        px-3
                        py-3.5
                        text-right
                        text-[13px]
                        transition
                        ${
                          active
                            ? "font-semibold text-[#173a2c]"
                            : "text-[#666] hover:text-[#173a2c]"
                        }
                      `}
                    >
                      {active && (
                        <span
                          className="
                            absolute
                            right-0
                            top-1/2
                            h-7
                            w-[3px]
                            -translate-y-1/2
                            rounded-l-full
                            bg-[#173a2c]
                          "
                        />
                      )}

                      <Icon
                        className={`
                          h-[18px]
                          w-[18px]
                          ${
                            active
                              ? "text-[#173a2c]"
                              : "text-[#888]"
                          }
                        `}
                      />

                      {item.label}
                    </button>
                  );
                })}
              </nav>

              <div className="mt-5 border-t border-[#eeeeee] pt-5">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    px-3
                    py-3
                    text-[13px]
                    text-[#777]
                    transition
                    hover:text-[#333]
                  "
                >
                  <LogOut className="h-[18px] w-[18px]" />

                  خروج از حساب
                </button>
              </div>
            </div>
          </aside>

          {/* =====================================================
              MAIN CONTENT
          ===================================================== */}

          <section className="min-w-0 lg:pr-8">
            {activeSection === "account" && (
              <AccountSection
                profileData={profileData}
                displayName={displayName}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                handleProfileChange={
                  handleProfileChange
                }
                handleSaveProfile={handleSaveProfile}
              />
            )}

            {activeSection === "orders" && (
              <OrdersSection />
            )}

            {activeSection === "addresses" && (
              <AddressesSection
                addresses={addresses}
                profileData={profileData}
                handleAddAddress={handleAddAddress}
                handleDeleteAddress={
                  handleDeleteAddress
                }
              />
            )}

            {activeSection === "favorites" && (
              <FavoritesSection navigate={navigate} />
            )}

            {activeSection === "settings" && (
              <SettingsSection
                setActiveSection={setActiveSection}
                handleLogout={handleLogout}
              />
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

/* =====================================================
   ACCOUNT
===================================================== */

function AccountSection({
  profileData,
  displayName,
  isEditing,
  setIsEditing,
  handleProfileChange,
  handleSaveProfile,
}) {
  return (
    <div className="py-7">
      {/* Title */}

      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-[#eeeeee]
          pb-5
        "
      >
        <div>
          <h2 className="text-lg font-bold text-[#222]">
            اطلاعات حساب کاربری
          </h2>

          <p className="mt-2 text-xs text-[#888]">
            اطلاعات حساب خود را مدیریت کنید.
          </p>
        </div>

        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="
              flex
              items-center
              gap-2
              text-xs
              font-medium
              text-[#17634b]
              transition
              hover:text-[#0f2f23]
            "
          >
            <Pencil className="h-4 w-4" />

            ویرایش
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSaveProfile}
            className="
              flex
              items-center
              gap-2
              text-xs
              font-semibold
              text-[#17634b]
            "
          >
            <Save className="h-4 w-4" />

            ذخیره تغییرات
          </button>
        )}
      </div>

      {/* Profile */}

      <div
        className="
          flex
          items-center
          gap-4
          border-b
          border-[#eeeeee]
          py-6
        "
      >
        <div
          className="
            flex
            h-14
            w-14
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[#f0f5f2]
            text-[#173a2c]
          "
        >
          <UserRound className="h-7 w-7" />
        </div>

        <div>
          <p className="text-sm font-bold text-[#333]">
            {displayName}
          </p>

          <p
            dir="ltr"
            className="mt-1.5 text-xs text-[#888]"
          >
            {profileData.phone ||
              profileData.email ||
              "اطلاعات تماس ثبت نشده"}
          </p>
        </div>
      </div>

      {/* Personal Information */}

      <div className="border-b border-[#eeeeee] py-7">
        <h3 className="mb-5 text-sm font-bold text-[#333]">
          اطلاعات شخصی
        </h3>

        <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <InputField
            label="نام"
            value={profileData.firstName}
            disabled={!isEditing}
            onChange={(value) =>
              handleProfileChange(
                "firstName",
                value
              )
            }
            placeholder="نام خود را وارد کنید"
          />

          <InputField
            label="نام خانوادگی"
            value={profileData.lastName}
            disabled={!isEditing}
            onChange={(value) =>
              handleProfileChange(
                "lastName",
                value
              )
            }
            placeholder="نام خانوادگی خود را وارد کنید"
          />

          <InputField
            label="شماره موبایل"
            value={profileData.phone}
            disabled={!isEditing}
            onChange={(value) =>
              handleProfileChange(
                "phone",
                value
              )
            }
            placeholder="09123456789"
            dir="ltr"
          />

          <InputField
            label="ایمیل"
            value={profileData.email}
            disabled={!isEditing}
            onChange={(value) =>
              handleProfileChange(
                "email",
                value
              )
            }
            placeholder="example@gmail.com"
            dir="ltr"
          />
        </div>
      </div>

      {/* Account Information */}

      <div className="py-7">
        <h3 className="mb-5 text-sm font-bold text-[#333]">
          وضعیت حساب
        </h3>

        <div className="space-y-0">
          <SimpleInfoRow
            icon={Phone}
            title="شماره موبایل"
            value={
              profileData.phone || "ثبت نشده"
            }
            dir="ltr"
          />

          <SimpleInfoRow
            icon={Mail}
            title="ایمیل"
            value={
              profileData.email || "ثبت نشده"
            }
            dir="ltr"
          />

          <SimpleInfoRow
            icon={ShieldCheck}
            title="وضعیت حساب"
            value="فعال"
          />

          <SimpleInfoRow
            icon={CalendarDays}
            title="نوع حساب"
            value="کاربر فروشگاه"
          />
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   ORDERS
===================================================== */

function OrdersSection() {
  return (
    <div className="py-7">
      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-[#eeeeee]
          pb-5
        "
      >
        <div>
          <h2 className="text-lg font-bold text-[#222]">
            سفارش‌های من
          </h2>

          <p className="mt-2 text-xs text-[#888]">
            مشاهده وضعیت و جزئیات سفارش‌ها
          </p>
        </div>

        <ShoppingBag className="h-5 w-5 text-[#888]" />
      </div>

      {/* Tabs */}

      <div className="flex border-b border-[#eeeeee]">
        <button
          type="button"
          className="
            border-b-2
            border-[#173a2c]
            px-4
            py-4
            text-xs
            font-semibold
            text-[#173a2c]
          "
        >
          همه
        </button>

        <button
          type="button"
          className="
            border-b-2
            border-transparent
            px-4
            py-4
            text-xs
            text-[#777]
          "
        >
          در حال پردازش
        </button>

        <button
          type="button"
          className="
            border-b-2
            border-transparent
            px-4
            py-4
            text-xs
            text-[#777]
          "
        >
          تحویل شده
        </button>
      </div>

      {/* Orders */}

      <div>
        <OrderItem
          orderNumber="#10024"
          date="۲۴ شهریور ۱۴۰۵"
          price="۸۵۰,۰۰۰ تومان"
          status="در حال پردازش"
          statusType="processing"
          count="۲ کالا"
        />

        <OrderItem
          orderNumber="#10018"
          date="۱۸ شهریور ۱۴۰۵"
          price="۴۲۰,۰۰۰ تومان"
          status="تحویل شده"
          statusType="completed"
          count="۱ کالا"
        />

        <OrderItem
          orderNumber="#10011"
          date="۱۱ شهریور ۱۴۰۵"
          price="۱,۲۰۰,۰۰۰ تومان"
          status="تحویل شده"
          statusType="completed"
          count="۳ کالا"
        />
      </div>
    </div>
  );
}

/* =====================================================
   ORDER ITEM
===================================================== */

function OrderItem({
  orderNumber,
  date,
  price,
  status,
  statusType,
  count,
}) {
  const completed = statusType === "completed";

  return (
    <div
      className="
        border-b
        border-[#eeeeee]
        py-6
      "
    >
      <div
        className="
          flex
          flex-col
          gap-5
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        {/* Order information */}

        <div className="flex items-center gap-4">
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[#f4f6f5]
              text-[#17634b]
            "
          >
            <Package className="h-5 w-5" />
          </div>

          <div>
            <p className="text-sm font-semibold text-[#333]">
              سفارش {orderNumber}
            </p>

            <div className="mt-2 flex items-center gap-2 text-[10px] text-[#999]">
              <CalendarDays className="h-3 w-3" />

              <span>{date}</span>

              <span>•</span>

              <span>{count}</span>
            </div>
          </div>
        </div>

        {/* Price */}

        <div className="lg:min-w-[150px]">
          <p className="text-[10px] text-[#999]">
            مبلغ
          </p>

          <p className="mt-1 text-xs font-semibold text-[#333]">
            {price}
          </p>
        </div>

        {/* Status */}

        <div className="flex items-center gap-4">
          <span
            className={`
              flex
              items-center
              gap-2
              text-xs
              ${
                completed
                  ? "text-[#267052]"
                  : "text-[#887f38]"
              }
            `}
          >
            {completed ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <Truck className="h-4 w-4" />
            )}

            {status}
          </span>

          <button
            type="button"
            className="
              flex
              items-center
              gap-1
              text-xs
              text-[#777]
              transition
              hover:text-[#173a2c]
            "
          >
            جزئیات

            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   ADDRESSES
===================================================== */

function AddressesSection({
  addresses,
  profileData,
  handleAddAddress,
  handleDeleteAddress,
}) {
  return (
    <div className="py-7">
      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-[#eeeeee]
          pb-5
        "
      >
        <div>
          <h2 className="text-lg font-bold text-[#222]">
            آدرس‌های من
          </h2>

          <p className="mt-2 text-xs text-[#888]">
            آدرس‌های مورد استفاده برای ارسال سفارش
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddAddress}
          className="
            flex
            items-center
            gap-2
            text-xs
            font-semibold
            text-[#17634b]
            transition
            hover:text-[#0f2f23]
          "
        >
          <Plus className="h-4 w-4" />

          افزودن آدرس
        </button>
      </div>

      <div>
        {addresses.length === 0 ? (
          <EmptyState
            icon={MapPin}
            title="هنوز آدرسی ثبت نکرده‌اید"
            description="برای ارسال سفارش، یک آدرس به حساب خود اضافه کنید."
            buttonText="افزودن آدرس"
            onClick={handleAddAddress}
          />
        ) : (
          addresses.map((address) => (
            <div
              key={address.id}
              className="
                border-b
                border-[#eeeeee]
                py-6
              "
            >
              <div className="flex justify-between gap-4">
                <div className="flex gap-4">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#17634b]" />

                  <div>
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-semibold text-[#333]">
                        {address.title}
                      </p>

                      <span
                        className="
                          rounded-full
                          bg-[#f0f5f2]
                          px-2
                          py-1
                          text-[9px]
                          text-[#17634b]
                        "
                      >
                        آدرس
                      </span>
                    </div>

                    <p className="mt-2 text-xs leading-6 text-[#777]">
                      {address.text}
                    </p>

                    {address.phone && (
                      <p
                        dir="ltr"
                        className="mt-2 text-xs text-[#999]"
                      >
                        {address.phone}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleDeleteAddress(address.id)
                  }
                  className="
                    flex
                    h-fit
                    items-center
                    gap-1.5
                    text-xs
                    text-[#888]
                    transition
                    hover:text-[#333]
                  "
                >
                  <Trash2 className="h-4 w-4" />

                  حذف
                </button>
              </div>
            </div>
          ))
        )}

        {addresses.length > 0 && (
          <p className="pt-5 text-[11px] text-[#999]">
            شماره تماس سفارش‌ها:
            <span
              dir="ltr"
              className="mr-1 text-[#555]"
            >
              {profileData.phone || "ثبت نشده"}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

/* =====================================================
   FAVORITES
===================================================== */

function FavoritesSection({ navigate }) {
  return (
    <div className="py-7">
      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-[#eeeeee]
          pb-5
        "
      >
        <div>
          <h2 className="text-lg font-bold text-[#222]">
            علاقه‌مندی‌ها
          </h2>

          <p className="mt-2 text-xs text-[#888]">
            محصولاتی که ذخیره کرده‌اید
          </p>
        </div>

        <Heart className="h-5 w-5 text-[#888]" />
      </div>

      <EmptyState
        icon={Heart}
        title="لیست علاقه‌مندی‌های شما خالی است"
        description="محصولات مورد علاقه خود را ذخیره کنید تا بعداً سریع‌تر به آن‌ها دسترسی داشته باشید."
        buttonText="مشاهده محصولات"
        onClick={() => navigate("/products")}
      />
    </div>
  );
}

/* =====================================================
   SETTINGS
===================================================== */

function SettingsSection({
  setActiveSection,
  handleLogout,
}) {
  return (
    <div className="py-7">
      <div
        className="
          border-b
          border-[#eeeeee]
          pb-5
        "
      >
        <h2 className="text-lg font-bold text-[#222]">
          تنظیمات
        </h2>

        <p className="mt-2 text-xs text-[#888]">
          مدیریت تنظیمات حساب کاربری
        </p>
      </div>

      <div>
        <SettingRow
          title="اطلاعات حساب"
          description="نام، شماره موبایل و ایمیل"
          icon={UserRound}
          onClick={() =>
            setActiveSection("account")
          }
        />

        <SettingRow
          title="آدرس‌های من"
          description="مدیریت آدرس‌های ارسال"
          icon={MapPin}
          onClick={() =>
            setActiveSection("addresses")
          }
        />

        <SettingRow
          title="امنیت حساب"
          description="وضعیت امنیت و ورود به حساب"
          icon={ShieldCheck}
        />

        <SettingRow
          title="روش‌های پرداخت"
          description="مدیریت اطلاعات پرداخت"
          icon={CreditCard}
        />

        <SettingRow
          title="خروج از حساب"
          description="خروج از حساب کاربری در این دستگاه"
          icon={LogOut}
          onClick={handleLogout}
        />
      </div>
    </div>
  );
}

/* =====================================================
   SETTING ROW
===================================================== */

function SettingRow({
  title,
  description,
  icon: Icon,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className="
        group
        flex
        w-full
        items-center
        justify-between
        border-b
        border-[#eeeeee]
        py-6
        text-right
        transition
        hover:bg-[#fcfcfc]
        disabled:hover:bg-transparent
      "
    >
      <div className="flex items-center gap-4">
        <Icon className="h-5 w-5 text-[#17634b]" />

        <div>
          <p className="text-sm font-medium text-[#333]">
            {title}
          </p>

          <p className="mt-1.5 text-[11px] text-[#999]">
            {description}
          </p>
        </div>
      </div>

      {onClick && (
        <ChevronLeft
          className="
            h-4
            w-4
            text-[#aaa]
            transition
            group-hover:-translate-x-1
            group-hover:text-[#17634b]
          "
        />
      )}
    </button>
  );
}

/* =====================================================
   SIMPLE INFO ROW
===================================================== */

function SimpleInfoRow({
  icon: Icon,
  title,
  value,
  dir,
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-5
        border-b
        border-[#eeeeee]
        py-5
      "
    >
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4 text-[#888]" />

        <span className="text-xs text-[#777]">
          {title}
        </span>
      </div>

      <span
        dir={dir}
        className="text-xs font-medium text-[#333]"
      >
        {value}
      </span>
    </div>
  );
}

/* =====================================================
   INPUT
===================================================== */

function InputField({
  label,
  value,
  disabled,
  onChange,
  placeholder,
  dir,
}) {
  return (
    <div>
      <label className="mb-2 block text-xs text-[#666]">
        {label}
      </label>

      <input
        type="text"
        value={value}
        disabled={disabled}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        dir={dir}
        className={`
          h-11
          w-full
          border-b
          border-[#d8d8d8]
          bg-transparent
          px-1
          text-xs
          outline-none
          transition
          placeholder:text-[#aaa]
          ${
            dir === "ltr"
              ? "text-left"
              : "text-right"
          }
          ${
            disabled
              ? "cursor-default text-[#555]"
              : "border-[#aebeb6] focus:border-[#173a2c]"
          }
        `}
      />
    </div>
  );
}

/* =====================================================
   EMPTY STATE
===================================================== */

function EmptyState({
  icon: Icon,
  title,
  description,
  buttonText,
  onClick,
}) {
  return (
    <div
      className="
        flex
        min-h-[330px]
        flex-col
        items-center
        justify-center
        text-center
      "
    >
      <div
        className="
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          bg-[#f3f6f4]
          text-[#17634b]
        "
      >
        <Icon className="h-7 w-7" />
      </div>

      <h3 className="mt-5 text-sm font-bold text-[#333]">
        {title}
      </h3>

      <p className="mt-2 max-w-[420px] text-xs leading-6 text-[#999]">
        {description}
      </p>

      {buttonText && (
        <button
          type="button"
          onClick={onClick}
          className="
            mt-5
            flex
            items-center
            gap-2
            text-xs
            font-semibold
            text-[#17634b]
            transition
            hover:text-[#0f2f23]
          "
        >
          {buttonText}

          <ArrowLeft className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}