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
} from "lucide-react";

const menuItems = [
  {
    id: "account",
    label: "اطلاعات حساب",
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
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#f3f6f4]
        "
      >
        <p className="text-sm text-[#68756f]">
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
        text-[#222]
      "
    >
      {/* Header */}
   
      {/* Page */}
      <div
        className="
          mx-auto
          max-w-[1200px]
          px-4
          py-6
          sm:px-6
          sm:py-8
        "
      >
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#173a2c]">
            حساب کاربری
          </h1>

          <p className="mt-2 text-sm text-[#718078]">
            اطلاعات حساب و مدیریت سفارش‌های شما
          </p>
        </div>

        {/* Main Layout */}
        <div
          className="
            grid
            gap-6
            lg:grid-cols-[250px_1fr]
          "
        >
          {/* Sidebar */}
          <aside
            className="
              h-fit
              overflow-hidden
              rounded-2xl
              border
              border-[#dfe7e2]
              bg-white
              shadow-[0_6px_24px_rgba(23,58,44,0.06)]
            "
          >
            {/* User Header */}
            <div
              className="
                border-b
                border-[#e4ebe7]
                bg-[#edf4f0]
                p-5
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-[#d5e2db]
                    bg-white
                    text-[#17634b]
                    shadow-[0_3px_10px_rgba(23,58,44,0.07)]
                  "
                >
                  <UserRound className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#173a2c]">
                    {displayName}
                  </p>

                  <p
                    dir="ltr"
                    className="
                      mt-1
                      truncate
                      text-left
                      text-xs
                      text-[#75827c]
                    "
                  >
                    {identifier}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu */}
            <nav className="p-3">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  activeSection === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      setActiveSection(item.id)
                    }
                    className={`
                      group
                      mb-1
                      flex
                      w-full
                      items-center
                      justify-between
                      gap-3
                      rounded-xl
                      px-4
                      py-3
                      text-right
                      text-sm
                      transition-all
                      duration-200
                      ${
                        isActive
                          ? "bg-[#e7f1ec] font-semibold text-[#173a2c] shadow-[inset_0_0_0_1px_rgba(23,58,44,0.07)]"
                          : "text-[#66736d] hover:bg-[#f3f7f5] hover:text-[#173a2c]"
                      }
                    `}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          rounded-lg
                          transition
                          ${
                            isActive
                              ? "bg-white text-[#17634b] shadow-[0_2px_8px_rgba(23,58,44,0.08)]"
                              : "bg-[#f5f7f6] text-[#7a8580] group-hover:bg-white group-hover:text-[#17634b]"
                          }
                        `}
                      >
                        <Icon className="h-[17px] w-[17px]" />
                      </span>

                      <span>{item.label}</span>
                    </span>

                    <ChevronLeft
                      className={`
                        h-4
                        w-4
                        transition-all
                        ${
                          isActive
                            ? "translate-x-0 text-[#17634b] opacity-80"
                            : "translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-50"
                        }
                      `}
                    />
                  </button>
                );
              })}
            </nav>

            {/* Logout */}
            <div className="border-t border-[#e7ece9] p-3">
              <button
                type="button"
                onClick={handleLogout}
                className="
                  group
                  flex
                  w-full
                  items-center
                  justify-between
                  gap-3
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  text-[#707b76]
                  transition
                  hover:bg-[#f5f7f6]
                  hover:text-[#173a2c]
                "
              >
                <span className="flex items-center gap-3">
                  <span
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-lg
                      bg-[#f1f4f2]
                      text-[#6e7a74]
                    "
                  >
                    <LogOut className="h-[17px] w-[17px]" />
                  </span>

                  خروج از حساب
                </span>

                <ChevronLeft className="h-4 w-4 opacity-40 transition-transform group-hover:-translate-x-1" />
              </button>
            </div>
          </aside>

          {/* Content */}
          <section
            className="
              min-w-0
              overflow-hidden
              rounded-2xl
              border
              border-[#dfe7e2]
              bg-white
              shadow-[0_6px_24px_rgba(23,58,44,0.06)]
            "
          >
            {/* =========================================
                ACCOUNT
            ========================================= */}
            {activeSection === "account" && (
              <div>
                <div
                  className="
                    flex
                    flex-col
                    gap-4
                    border-b
                    border-[#e4ebe7]
                    bg-[#edf4f0]
                    p-5
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    sm:p-7
                  "
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <div
                        className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-lg
                          bg-white
                          text-[#17634b]
                          shadow-[0_2px_8px_rgba(23,58,44,0.08)]
                        "
                      >
                        <UserRound className="h-4 w-4" />
                      </div>

                      <h2 className="text-lg font-bold text-[#173a2c]">
                        اطلاعات حساب
                      </h2>
                    </div>

                    <p className="mt-2 text-xs text-[#75827c]">
                      اطلاعات شخصی حساب کاربری شما
                    </p>
                  </div>

                  {!isEditing ? (
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="
                        group
                        flex
                        w-fit
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-[#cfdcd5]
                        bg-white
                        px-4
                        py-2.5
                        text-sm
                        text-[#315748]
                        shadow-[0_2px_8px_rgba(23,58,44,0.05)]
                        transition
                        hover:border-[#a9c2b5]
                        hover:bg-[#f7faf8]
                      "
                    >
                      <Pencil className="h-4 w-4" />
                      ویرایش اطلاعات
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSaveProfile}
                      className="
                        flex
                        w-fit
                        items-center
                        gap-2
                        rounded-xl
                        bg-[#173a2c]
                        px-4
                        py-2.5
                        text-sm
                        text-white
                        shadow-[0_4px_12px_rgba(23,58,44,0.16)]
                        transition
                        hover:bg-[#0f2f23]
                      "
                    >
                      <Save className="h-4 w-4" />
                      ذخیره تغییرات
                    </button>
                  )}
                </div>

                <div className="p-5 sm:p-7">
                  {/* Profile Summary */}
                  <div
                    className="
                      mb-6
                      grid
                      gap-3
                      sm:grid-cols-3
                    "
                  >
                    <ProfileInfoCard
                      icon={UserRound}
                      title="نام کاربر"
                      value={displayName}
                    />

                    <ProfileInfoCard
                      icon={Phone}
                      title="شماره موبایل"
                      value={profileData.phone || "ثبت نشده"}
                      dir="ltr"
                    />

                    <ProfileInfoCard
                      icon={Mail}
                      title="ایمیل"
                      value={profileData.email || "ثبت نشده"}
                      dir="ltr"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
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

                  {/* Account Status */}
                  <div
                    className="
                      mt-7
                      flex
                      items-start
                      gap-3
                      rounded-xl
                      border
                      border-[#cfe0d7]
                      bg-[#eef6f2]
                      p-4
                      shadow-[0_3px_10px_rgba(23,58,44,0.04)]
                    "
                  >
                    <div
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-white
                        text-[#17634b]
                        shadow-[0_2px_7px_rgba(23,58,44,0.07)]
                      "
                    >
                      <ShieldCheck className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-[#244b3d]">
                        حساب فعال
                      </p>

                      <p className="mt-1 text-xs leading-6 text-[#718078]">
                        حساب کاربری شما فعال است و می‌توانید سفارش‌های خود را مدیریت کنید.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* =========================================
                ORDERS
            ========================================= */}
            {activeSection === "orders" && (
              <div>
                <div
                  className="
                    flex
                    items-center
                    gap-3
                    border-b
                    border-[#e4ebe7]
                    bg-[#edf4f0]
                    p-5
                    sm:p-7
                  "
                >
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-lg
                      bg-white
                      text-[#17634b]
                      shadow-[0_2px_8px_rgba(23,58,44,0.08)]
                    "
                  >
                    <ShoppingBag className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-[#173a2c]">
                      سفارش‌های من
                    </h2>

                    <p className="mt-1 text-xs text-[#75827c]">
                      سفارش‌های ثبت‌شده شما
                    </p>
                  </div>
                </div>

                <div className="p-5 sm:p-7">
                  <div className="mb-5 grid gap-3 sm:grid-cols-3">
                    <OrderStat
                      icon={Package}
                      title="همه سفارش‌ها"
                      value="۳"
                    />

                    <OrderStat
                      icon={Clock3}
                      title="در حال پردازش"
                      value="۱"
                    />

                    <OrderStat
                      icon={CheckCircle2}
                      title="تحویل شده"
                      value="۲"
                    />
                  </div>

                  <div className="space-y-3">
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
              </div>
            )}

            {/* =========================================
                ADDRESSES
            ========================================= */}
            {activeSection === "addresses" && (
              <div>
                <div
                  className="
                    flex
                    flex-col
                    gap-4
                    border-b
                    border-[#e4ebe7]
                    bg-[#edf4f0]
                    p-5
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    sm:p-7
                  "
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-lg
                        bg-white
                        text-[#17634b]
                        shadow-[0_2px_8px_rgba(23,58,44,0.08)]
                      "
                    >
                      <MapPin className="h-5 w-5" />
                    </div>

                    <div>
                      <h2 className="text-lg font-bold text-[#173a2c]">
                        آدرس‌های من
                      </h2>

                      <p className="mt-1 text-xs text-[#75827c]">
                        آدرس‌های مورد استفاده برای ارسال سفارش
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddAddress}
                    className="
                      flex
                      w-fit
                      items-center
                      gap-2
                      rounded-xl
                      bg-[#173a2c]
                      px-4
                      py-2.5
                      text-sm
                      text-white
                      shadow-[0_4px_12px_rgba(23,58,44,0.16)]
                      transition
                      hover:bg-[#0f2f23]
                    "
                  >
                    <Plus className="h-4 w-4" />
                    افزودن آدرس
                  </button>
                </div>

                <div className="p-5 sm:p-7">
                  {addresses.length === 0 ? (
                    <div
                      className="
                        flex
                        min-h-[250px]
                        flex-col
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-dashed
                        border-[#cbdad2]
                        bg-[#f5f9f7]
                        px-5
                        text-center
                      "
                    >
                      <div
                        className="
                          flex
                          h-14
                          w-14
                          items-center
                          justify-center
                          rounded-xl
                          border
                          border-[#d9e5df]
                          bg-white
                          text-[#17634b]
                          shadow-[0_3px_10px_rgba(23,58,44,0.06)]
                        "
                      >
                        <MapPin className="h-6 w-6" />
                      </div>

                      <p className="mt-4 text-sm font-medium text-[#355849]">
                        هنوز آدرسی ثبت نکرده‌اید
                      </p>

                      <p className="mt-2 text-xs text-[#8a9690]">
                        برای ثبت آدرس جدید روی دکمه افزودن آدرس بزنید.
                      </p>

                      <button
                        type="button"
                        onClick={handleAddAddress}
                        className="
                          group
                          mt-5
                          flex
                          items-center
                          gap-2
                          rounded-xl
                          bg-[#173a2c]
                          px-5
                          py-2.5
                          text-sm
                          text-white
                          shadow-[0_4px_12px_rgba(23,58,44,0.14)]
                          transition
                          hover:bg-[#0f2f23]
                        "
                      >
                        افزودن اولین آدرس

                        <ArrowLeft
                          className="
                            h-4
                            w-4
                            transition-transform
                            group-hover:-translate-x-1
                          "
                        />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {addresses.map((address) => (
                        <div
                          key={address.id}
                          className="
                            group
                            flex
                            flex-col
                            gap-4
                            rounded-2xl
                            border
                            border-[#dfe7e2]
                            bg-white
                            p-5
                            shadow-[0_3px_12px_rgba(23,58,44,0.04)]
                            transition
                            hover:border-[#bfd2c8]
                            hover:bg-[#fbfdfc]
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                          "
                        >
                          <div className="flex items-start gap-4">
                            <div
                              className="
                                flex
                                h-11
                                w-11
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-[#dce7e1]
                                bg-[#edf4f0]
                              "
                            >
                              <MapPin className="h-5 w-5 text-[#17634b]" />
                            </div>

                            <div>
                              <p className="text-sm font-semibold text-[#294c3e]">
                                {address.title}
                              </p>

                              <p className="mt-2 text-sm leading-6 text-[#718078]">
                                {address.text}
                              </p>

                              {address.phone && (
                                <p
                                  dir="ltr"
                                  className="mt-2 flex items-center gap-2 text-xs text-[#8a9690]"
                                >
                                  <Phone className="h-3.5 w-3.5" />
                                  {address.phone}
                                </p>
                              )}
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteAddress(
                                address.id
                              )
                            }
                            className="
                              flex
                              w-fit
                              items-center
                              gap-2
                              rounded-lg
                              px-3
                              py-2
                              text-xs
                              text-[#777]
                              transition
                              hover:bg-[#f0f5f2]
                              hover:text-[#173a2c]
                            "
                          >
                            <Trash2 className="h-4 w-4" />
                            حذف
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* =========================================
                FAVORITES
            ========================================= */}
            {activeSection === "favorites" && (
              <div>
                <div
                  className="
                    flex
                    items-center
                    gap-3
                    border-b
                    border-[#e4ebe7]
                    bg-[#edf4f0]
                    p-5
                    sm:p-7
                  "
                >
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-lg
                      bg-white
                      text-[#17634b]
                      shadow-[0_2px_8px_rgba(23,58,44,0.08)]
                    "
                  >
                    <Heart className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-[#173a2c]">
                      علاقه‌مندی‌ها
                    </h2>

                    <p className="mt-1 text-xs text-[#75827c]">
                      محصولاتی که ذخیره کرده‌اید
                    </p>
                  </div>
                </div>

                <div className="p-5 sm:p-7">
                  <div
                    className="
                      flex
                      min-h-[300px]
                      flex-col
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-dashed
                      border-[#cbdad2]
                      bg-[#f5f9f7]
                      px-5
                      text-center
                    "
                  >
                    <div
                      className="
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-[#d9e5df]
                        bg-white
                        text-[#17634b]
                        shadow-[0_3px_10px_rgba(23,58,44,0.06)]
                      "
                    >
                      <Heart className="h-6 w-6" />
                    </div>

                    <p className="mt-4 text-sm font-medium text-[#355849]">
                      هنوز محصولی در علاقه‌مندی‌ها ندارید
                    </p>

                    <p className="mt-2 max-w-md text-xs leading-6 text-[#8a9690]">
                      محصولات مورد علاقه خود را ذخیره کنید تا بعداً به‌راحتی به آن‌ها دسترسی داشته باشید.
                    </p>

                    <button
                      type="button"
                      onClick={() => navigate("/")}
                      className="
                        group
                        mt-5
                        flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-[#173a2c]
                        px-5
                        py-2.5
                        text-sm
                        text-white
                        shadow-[0_4px_12px_rgba(23,58,44,0.14)]
                        transition
                        hover:bg-[#0f2f23]
                      "
                    >
                      مشاهده محصولات

                      <ArrowLeft
                        className="
                          h-4
                          w-4
                          transition-transform
                          group-hover:-translate-x-1
                        "
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* =========================================
                SETTINGS
            ========================================= */}
            {activeSection === "settings" && (
              <div>
                <div
                  className="
                    flex
                    items-center
                    gap-3
                    border-b
                    border-[#e4ebe7]
                    bg-[#edf4f0]
                    p-5
                    sm:p-7
                  "
                >
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-lg
                      bg-white
                      text-[#17634b]
                      shadow-[0_2px_8px_rgba(23,58,44,0.08)]
                    "
                  >
                    <Settings className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-[#173a2c]">
                      تنظیمات حساب
                    </h2>

                    <p className="mt-1 text-xs text-[#75827c]">
                      مدیریت تنظیمات حساب کاربری
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <div
                    className="
                      overflow-hidden
                      rounded-2xl
                      border
                      border-[#dfe7e2]
                      bg-white
                      shadow-[0_3px_12px_rgba(23,58,44,0.04)]
                    "
                  >
                    <SettingRow
                      title="اطلاعات شخصی"
                      description="مدیریت نام، شماره موبایل و ایمیل"
                      icon={UserRound}
                      onClick={() =>
                        setActiveSection("account")
                      }
                    />

                    <SettingRow
                      title="آدرس‌های ارسال"
                      description="مدیریت آدرس‌های مورد استفاده برای سفارش"
                      icon={MapPin}
                      onClick={() =>
                        setActiveSection("addresses")
                      }
                    />

                    <SettingRow
                      title="امنیت حساب"
                      description="حساب شما با اطلاعات ورود محافظت می‌شود"
                      icon={ShieldCheck}
                    />

                    <SettingRow
                      title="خروج از حساب"
                      description="خروج از حساب کاربری در این دستگاه"
                      icon={LogOut}
                      onClick={handleLogout}
                    />
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

/* =====================================================
   PROFILE INFO CARD
===================================================== */

function ProfileInfoCard({
  icon: Icon,
  title,
  value,
  dir,
}) {
  return (
    <div
      className="
        group
        rounded-xl
        border
        border-[#dfe7e2]
        bg-[#fbfdfc]
        p-4
        shadow-[0_3px_10px_rgba(23,58,44,0.035)]
        transition
        hover:border-[#c7d8cf]
        hover:bg-[#f7faf8]
        hover:shadow-[0_5px_15px_rgba(23,58,44,0.055)]
      "
    >
      <div className="flex items-center gap-3">
        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-lg
            bg-[#e8f1ec]
            text-[#17634b]
            transition
            group-hover:bg-[#deebe4]
          "
        >
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className="text-[11px] text-[#87938d]">
            {title}
          </p>

          <p
            dir={dir}
            className={`
              mt-1
              truncate
              text-sm
              font-medium
              text-[#294c3e]
              ${dir === "ltr" ? "text-left" : ""}
            `}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   INPUT FIELD
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
      <label className="mb-2 block text-sm font-medium text-[#40574d]">
        {label}
      </label>

      <div
        className={`
          relative
          rounded-xl
          transition
          ${
            disabled
              ? ""
              : "focus-within:shadow-[0_4px_14px_rgba(23,58,44,0.06)]"
          }
        `}
      >
        <input
          type="text"
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          dir={dir}
          className={`
            h-12
            w-full
            rounded-xl
            border
            border-[#d8e2dd]
            bg-white
            px-4
            text-sm
            outline-none
            transition
            placeholder:text-[#a5afaa]
            ${
              dir === "ltr"
                ? "text-left"
                : "text-right"
            }
            ${
              disabled
                ? "cursor-default bg-[#f3f6f4] text-[#66756d]"
                : "focus:border-[#789d8d] focus:bg-[#fcfefd]"
            }
          `}
        />
      </div>
    </div>
  );
}

/* =====================================================
   ORDER STAT
===================================================== */

function OrderStat({
  icon: Icon,
  title,
  value,
}) {
  return (
    <div
      className="
        group
        flex
        items-center
        justify-between
        rounded-xl
        border
        border-[#dfe7e2]
        bg-[#fbfdfc]
        p-4
        shadow-[0_3px_10px_rgba(23,58,44,0.035)]
        transition
        hover:border-[#c7d8cf]
        hover:bg-[#f7faf8]
        hover:shadow-[0_5px_15px_rgba(23,58,44,0.05)]
      "
    >
      <div className="flex items-center gap-3">
        <div
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            bg-[#e8f1ec]
            text-[#17634b]
          "
        >
          <Icon className="h-4 w-4" />
        </div>

        <span className="text-xs text-[#68766f]">
          {title}
        </span>
      </div>

      <span className="text-lg font-bold text-[#244b3d]">
        {value}
      </span>
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
  const isCompleted = statusType === "completed";

  return (
    <div
      className="
        group
        rounded-2xl
        border
        border-[#dfe7e2]
        bg-white
        p-4
        shadow-[0_3px_12px_rgba(23,58,44,0.035)]
        transition
        hover:border-[#c7d8cf]
        hover:bg-[#fbfdfc]
        hover:shadow-[0_5px_16px_rgba(23,58,44,0.055)]
      "
    >
      <div
        className="
          flex
          flex-col
          gap-4
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        {/* Order Info */}
        <div className="flex items-center gap-4">
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-[#dce7e1]
              bg-[#edf4f0]
              text-[#17634b]
              transition
              group-hover:bg-[#e6f0eb]
            "
          >
            <Package className="h-5 w-5" />
          </div>

          <div>
            <p className="text-sm font-semibold text-[#294c3e]">
              سفارش {orderNumber}
            </p>

            <div className="mt-1 flex items-center gap-2 text-xs text-[#929d97]">
              <CalendarDays className="h-3.5 w-3.5" />
              <span>{date}</span>
              <span>•</span>
              <span>{count}</span>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="lg:text-center">
          <p className="text-xs text-[#929d97]">
            مبلغ سفارش
          </p>

          <p className="mt-1 text-sm font-semibold text-[#294c3e]">
            {price}
          </p>
        </div>

        {/* Status */}
        <div className="flex items-center justify-between gap-5 lg:justify-end">
          <div
            className={`
              flex
              items-center
              gap-2
              rounded-lg
              px-3
              py-2
              ${
                isCompleted
                  ? "bg-[#e9f4ee] text-[#287052]"
                  : "bg-[#f1f4ed] text-[#68733e]"
              }
            `}
          >
            {isCompleted ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <Truck className="h-4 w-4" />
            )}

            <span className="text-xs">
              {status}
            </span>
          </div>

          <button
            type="button"
            className="
              group/details
              flex
              items-center
              gap-1
              rounded-lg
              px-2
              py-2
              text-xs
              text-[#66736d]
              transition
              hover:bg-[#f0f5f2]
              hover:text-[#173a2c]
            "
          >
            جزئیات

            <ChevronLeft
              className="
                h-3.5
                w-3.5
                transition-transform
                group-hover/details:-translate-x-1
              "
            />
          </button>
        </div>
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
        gap-4
        border-b
        border-[#e7ece9]
        p-5
        text-right
        transition
        last:border-b-0
        hover:bg-[#f5f9f7]
        disabled:cursor-default
      "
    >
      <div className="flex items-center gap-4">
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-lg
            border
            border-[#dce6e1]
            bg-[#edf4f0]
            text-[#17634b]
            transition
            group-hover:bg-white
            group-hover:shadow-[0_2px_8px_rgba(23,58,44,0.06)]
          "
        >
          <Icon className="h-5 w-5" />
        </div>

        <div>
          <p className="text-sm font-medium text-[#294c3e]">
            {title}
          </p>

          <p className="mt-1 text-xs text-[#8a9690]">
            {description}
          </p>
        </div>
      </div>

      {onClick && (
        <ChevronLeft
          className="
            h-4
            w-4
            text-[#9aa59f]
            transition-transform
            group-hover:-translate-x-1
            group-hover:text-[#17634b]
          "
        />
      )}
    </button>
  );
}






































































// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import {
//   UserRound,
//   ShoppingBag,
//   MapPin,
//   Heart,
//   Settings,
//   LogOut,
//   Pencil,
//   ChevronLeft,
//   ShieldCheck,
//   Package,
//   Truck,
//   CheckCircle2,
//   Clock3,
//   Plus,
//   Trash2,
//   Save,
//   Phone,
//   Mail,
//   CalendarDays,
//   ArrowLeft,
// } from "lucide-react";

// const menuItems = [
//   {
//     id: "account",
//     label: "اطلاعات حساب",
//     icon: UserRound,
//   },
//   {
//     id: "orders",
//     label: "سفارش‌های من",
//     icon: ShoppingBag,
//   },
//   {
//     id: "addresses",
//     label: "آدرس‌های من",
//     icon: MapPin,
//   },
//   {
//     id: "favorites",
//     label: "علاقه‌مندی‌ها",
//     icon: Heart,
//   },
//   {
//     id: "settings",
//     label: "تنظیمات",
//     icon: Settings,
//   },
// ];

// export default function Profile() {
//   const navigate = useNavigate();

//   const [user, setUser] = useState(null);
//   const [activeSection, setActiveSection] = useState("account");

//   const [isEditing, setIsEditing] = useState(false);

//   const [profileData, setProfileData] = useState({
//     firstName: "",
//     lastName: "",
//     phone: "",
//     email: "",
//   });

//   const [addresses, setAddresses] = useState([]);

//   useEffect(() => {
//     const savedUser = localStorage.getItem("qomash_auth");

//     if (!savedUser) {
//       navigate("/login");
//       return;
//     }

//     try {
//       const parsedUser = JSON.parse(savedUser);

//       if (!parsedUser?.isLoggedIn) {
//         navigate("/login");
//         return;
//       }

//       setUser(parsedUser);

//       const savedProfile =
//         localStorage.getItem("qomash_profile");

//       if (savedProfile) {
//         try {
//           const parsedProfile = JSON.parse(savedProfile);
//           setProfileData(parsedProfile);
//         } catch {
//           console.log("خطا در خواندن پروفایل");
//         }
//       } else {
//         const identifier = parsedUser.identifier || "";

//         setProfileData({
//           firstName: "",
//           lastName: "",
//           phone: /^09\d{9}$/.test(identifier)
//             ? identifier
//             : "",
//           email: !/^09\d{9}$/.test(identifier)
//             ? identifier
//             : "",
//         });
//       }

//       const savedAddresses =
//         localStorage.getItem("qomash_addresses");

//       if (savedAddresses) {
//         try {
//           setAddresses(JSON.parse(savedAddresses));
//         } catch {
//           setAddresses([]);
//         }
//       }
//     } catch {
//       localStorage.removeItem("qomash_auth");
//       navigate("/login");
//     }
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("qomash_auth");

//     window.dispatchEvent(
//       new Event("qomash-auth-changed")
//     );

//     navigate("/login");
//   };

//   const handleProfileChange = (field, value) => {
//     setProfileData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleSaveProfile = () => {
//     localStorage.setItem(
//       "qomash_profile",
//       JSON.stringify(profileData)
//     );

//     setIsEditing(false);
//   };

//   const handleDeleteAddress = (id) => {
//     const updatedAddresses = addresses.filter(
//       (address) => address.id !== id
//     );

//     setAddresses(updatedAddresses);

//     localStorage.setItem(
//       "qomash_addresses",
//       JSON.stringify(updatedAddresses)
//     );
//   };

//   const handleAddAddress = () => {
//     const newAddress = {
//       id: Date.now(),
//       title: "آدرس جدید",
//       text: "هنوز آدرسی برای این مورد ثبت نشده است.",
//       phone: profileData.phone || "",
//     };

//     const updatedAddresses = [
//       ...addresses,
//       newAddress,
//     ];

//     setAddresses(updatedAddresses);

//     localStorage.setItem(
//       "qomash_addresses",
//       JSON.stringify(updatedAddresses)
//     );
//   };

//   if (!user) {
//     return (
//       <main
//         dir="rtl"
//         className="
//           flex
//           min-h-screen
//           items-center
//           justify-center
//           bg-[#f7f4ed]
//         "
//       >
//         <p className="text-sm text-[#69758a]">
//           در حال بارگذاری...
//         </p>
//       </main>
//     );
//   }

//   const identifier = user.identifier || "";

//   const displayName =
//     profileData.firstName || profileData.lastName
//       ? `${profileData.firstName} ${profileData.lastName}`.trim()
//       : "کاربر قماش";

//   return (
//     <main
//       dir="rtl"
//       className="
//         min-h-screen
//         bg-[#f7f4ed]
//         text-[#263143]
//       "
//     >
//       {/* Header */}
//       <header
//         className="
//           border-b
//           border-[#e8dfd2]
//           bg-white
//         "
//       >
//         <div
//           className="
//             mx-auto
//             flex
//             h-[76px]
//             max-w-[1200px]
//             items-center
//             justify-between
//             px-4
//             sm:px-6
//           "
//         >
//           <button
//             type="button"
//             onClick={() => navigate("/")}
//             className="
//               group
//               flex
//               items-center
//               gap-2
//               rounded-lg
//               px-2
//               py-2
//               text-sm
//               text-[#68758a]
//               transition
//               hover:bg-[#f5f1e9]
//               hover:text-[#243b63]
//             "
//           >
//             <ChevronLeft
//               className="
//                 h-4
//                 w-4
//                 transition-transform
//                 group-hover:-translate-x-1
//               "
//             />

//             بازگشت به فروشگاه
//           </button>

//           <button
//             type="button"
//             onClick={() => navigate("/")}
//             className="
//               flex
//               items-center
//               gap-3
//               rounded-xl
//               px-2
//               py-1.5
//               transition
//               hover:bg-[#f8f5ef]
//             "
//           >
//             <div
//               className="
//                 flex
//                 h-11
//                 w-11
//                 items-center
//                 justify-center
//               "
//             >
//               <img
//                 src="/qomash_sheikh_eslami_logo_transparent-3.png"
//                 alt="قماش شیخ الاسلامی"
//                 className="h-full w-full object-contain"
//               />
//             </div>

//             <span
//               className="
//                 hidden
//                 text-sm
//                 font-bold
//                 text-[#243b63]
//                 sm:block
//               "
//             >
//               قماش شیخ الاسلامی
//             </span>
//           </button>
//         </div>
//       </header>

//       {/* Page */}
//       <div
//         className="
//           mx-auto
//           max-w-[1200px]
//           px-4
//           py-6
//           sm:px-6
//           sm:py-8
//         "
//       >
//         {/* Page Title */}
//         <div className="mb-6">
//           <h1 className="text-2xl font-bold text-[#243b63]">
//             حساب کاربری
//           </h1>

//           <p className="mt-2 text-sm text-[#7a8494]">
//             اطلاعات حساب و مدیریت سفارش‌های شما
//           </p>
//         </div>

//         {/* Main Layout */}
//         <div
//           className="
//             grid
//             gap-6
//             lg:grid-cols-[250px_1fr]
//           "
//         >
//           {/* Sidebar */}
//           <aside
//             className="
//               h-fit
//               overflow-hidden
//               rounded-2xl
//               border
//               border-[#e6ddd0]
//               bg-white
//               shadow-[0_8px_30px_rgba(55,45,30,0.07)]
//             "
//           >
//             {/* User Header */}
//             <div
//               className="
//                 border-b
//                 border-[#e9e1d6]
//                 bg-[#f1eee6]
//                 p-5
//               "
//             >
//               <div className="flex items-center gap-3">
//                 <div
//                   className="
//                     flex
//                     h-12
//                     w-12
//                     shrink-0
//                     items-center
//                     justify-center
//                     rounded-xl
//                     border
//                     border-[#d9d0c2]
//                     bg-white
//                     text-[#304c78]
//                     shadow-[0_3px_10px_rgba(45,58,80,0.07)]
//                   "
//                 >
//                   <UserRound className="h-5 w-5" />
//                 </div>

//                 <div className="min-w-0">
//                   <p className="truncate text-sm font-semibold text-[#263143]">
//                     {displayName}
//                   </p>

//                   <p
//                     dir="ltr"
//                     className="
//                       mt-1
//                       truncate
//                       text-left
//                       text-xs
//                       text-[#7d8796]
//                     "
//                   >
//                     {identifier}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Menu */}
//             <nav className="p-3">
//               {menuItems.map((item) => {
//                 const Icon = item.icon;
//                 const isActive =
//                   activeSection === item.id;

//                 return (
//                   <button
//                     key={item.id}
//                     type="button"
//                     onClick={() =>
//                       setActiveSection(item.id)
//                     }
//                     className={`
//                       group
//                       mb-1
//                       flex
//                       w-full
//                       items-center
//                       justify-between
//                       gap-3
//                       rounded-xl
//                       px-4
//                       py-3
//                       text-right
//                       text-sm
//                       transition-all
//                       duration-200
//                       ${
//                         isActive
//                           ? "bg-[#e9eef6] font-semibold text-[#243b63] shadow-[inset_0_0_0_1px_rgba(36,59,99,0.08)]"
//                           : "text-[#697589] hover:bg-[#f7f4ee] hover:text-[#243b63]"
//                       }
//                     `}
//                   >
//                     <span className="flex items-center gap-3">
//                       <span
//                         className={`
//                           flex
//                           h-8
//                           w-8
//                           items-center
//                           justify-center
//                           rounded-lg
//                           transition
//                           ${
//                             isActive
//                               ? "bg-white text-[#304f7d] shadow-[0_2px_8px_rgba(45,60,90,0.08)]"
//                               : "bg-[#f5f3ef] text-[#8a93a0] group-hover:bg-white group-hover:text-[#304f7d]"
//                           }
//                         `}
//                       >
//                         <Icon className="h-[17px] w-[17px]" />
//                       </span>

//                       <span>{item.label}</span>
//                     </span>

//                     <ChevronLeft
//                       className={`
//                         h-4
//                         w-4
//                         transition-all
//                         ${
//                           isActive
//                             ? "translate-x-0 text-[#304f7d] opacity-80"
//                             : "translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-50"
//                         }
//                       `}
//                     />
//                   </button>
//                 );
//               })}
//             </nav>

//             {/* Logout */}
//             <div className="border-t border-[#e9e1d6] p-3">
//               <button
//                 type="button"
//                 onClick={handleLogout}
//                 className="
//                   group
//                   flex
//                   w-full
//                   items-center
//                   justify-between
//                   gap-3
//                   rounded-xl
//                   px-4
//                   py-3
//                   text-sm
//                   text-[#727b87]
//                   transition
//                   hover:bg-[#f7f4ee]
//                   hover:text-[#243b63]
//                 "
//               >
//                 <span className="flex items-center gap-3">
//                   <span
//                     className="
//                       flex
//                       h-8
//                       w-8
//                       items-center
//                       justify-center
//                       rounded-lg
//                       bg-[#f4f1eb]
//                       text-[#7a8491]
//                     "
//                   >
//                     <LogOut className="h-[17px] w-[17px]" />
//                   </span>

//                   خروج از حساب
//                 </span>

//                 <ChevronLeft className="h-4 w-4 opacity-40 transition-transform group-hover:-translate-x-1" />
//               </button>
//             </div>
//           </aside>

//           {/* Content */}
//           <section
//             className="
//               min-w-0
//               overflow-hidden
//               rounded-2xl
//               border
//               border-[#e6ddd0]
//               bg-white
//               shadow-[0_8px_30px_rgba(55,45,30,0.07)]
//             "
//           >
//             {/* =========================================
//                 ACCOUNT
//             ========================================= */}
//             {activeSection === "account" && (
//               <div>
//                 <div
//                   className="
//                     flex
//                     flex-col
//                     gap-4
//                     border-b
//                     border-[#e8e0d5]
//                     bg-[#f1eee6]
//                     p-5
//                     sm:flex-row
//                     sm:items-center
//                     sm:justify-between
//                     sm:p-7
//                   "
//                 >
//                   <div>
//                     <div className="flex items-center gap-2">
//                       <div
//                         className="
//                           flex
//                           h-9
//                           w-9
//                           items-center
//                           justify-center
//                           rounded-lg
//                           bg-white
//                           text-[#304f7d]
//                           shadow-[0_2px_8px_rgba(45,60,90,0.08)]
//                         "
//                       >
//                         <UserRound className="h-4 w-4" />
//                       </div>

//                       <h2 className="text-lg font-bold text-[#243b63]">
//                         اطلاعات حساب
//                       </h2>
//                     </div>

//                     <p className="mt-2 text-xs text-[#7c8695]">
//                       اطلاعات شخصی حساب کاربری شما
//                     </p>
//                   </div>

//                   {!isEditing ? (
//                     <button
//                       type="button"
//                       onClick={() => setIsEditing(true)}
//                       className="
//                         group
//                         flex
//                         w-fit
//                         items-center
//                         gap-2
//                         rounded-xl
//                         border
//                         border-[#d8cfbf]
//                         bg-white
//                         px-4
//                         py-2.5
//                         text-sm
//                         text-[#3c5273]
//                         shadow-[0_2px_8px_rgba(45,60,90,0.05)]
//                         transition
//                         hover:border-[#b9c5d6]
//                         hover:bg-[#f8f6f1]
//                       "
//                     >
//                       <Pencil className="h-4 w-4" />
//                       ویرایش اطلاعات
//                     </button>
//                   ) : (
//                     <button
//                       type="button"
//                       onClick={handleSaveProfile}
//                       className="
//                         flex
//                         w-fit
//                         items-center
//                         gap-2
//                         rounded-xl
//                         bg-[#304f7d]
//                         px-4
//                         py-2.5
//                         text-sm
//                         text-white
//                         shadow-[0_4px_12px_rgba(48,79,125,0.18)]
//                         transition
//                         hover:bg-[#243f67]
//                       "
//                     >
//                       <Save className="h-4 w-4" />
//                       ذخیره تغییرات
//                     </button>
//                   )}
//                 </div>

//                 <div className="p-5 sm:p-7">
//                   {/* Profile Summary */}
//                   <div
//                     className="
//                       mb-6
//                       grid
//                       gap-3
//                       sm:grid-cols-3
//                     "
//                   >
//                     <ProfileInfoCard
//                       icon={UserRound}
//                       title="نام کاربر"
//                       value={displayName}
//                     />

//                     <ProfileInfoCard
//                       icon={Phone}
//                       title="شماره موبایل"
//                       value={profileData.phone || "ثبت نشده"}
//                       dir="ltr"
//                     />

//                     <ProfileInfoCard
//                       icon={Mail}
//                       title="ایمیل"
//                       value={profileData.email || "ثبت نشده"}
//                       dir="ltr"
//                     />
//                   </div>

//                   <div className="grid gap-5 sm:grid-cols-2">
//                     <InputField
//                       label="نام"
//                       value={profileData.firstName}
//                       disabled={!isEditing}
//                       onChange={(value) =>
//                         handleProfileChange(
//                           "firstName",
//                           value
//                         )
//                       }
//                       placeholder="نام خود را وارد کنید"
//                     />

//                     <InputField
//                       label="نام خانوادگی"
//                       value={profileData.lastName}
//                       disabled={!isEditing}
//                       onChange={(value) =>
//                         handleProfileChange(
//                           "lastName",
//                           value
//                         )
//                       }
//                       placeholder="نام خانوادگی خود را وارد کنید"
//                     />

//                     <InputField
//                       label="شماره موبایل"
//                       value={profileData.phone}
//                       disabled={!isEditing}
//                       onChange={(value) =>
//                         handleProfileChange(
//                           "phone",
//                           value
//                         )
//                       }
//                       placeholder="09123456789"
//                       dir="ltr"
//                     />

//                     <InputField
//                       label="ایمیل"
//                       value={profileData.email}
//                       disabled={!isEditing}
//                       onChange={(value) =>
//                         handleProfileChange(
//                           "email",
//                           value
//                         )
//                       }
//                       placeholder="example@gmail.com"
//                       dir="ltr"
//                     />
//                   </div>

//                   {/* Account Status */}
//                   <div
//                     className="
//                       mt-7
//                       flex
//                       items-start
//                       gap-3
//                       rounded-xl
//                       border
//                       border-[#e6d9ad]
//                       bg-[#fff8df]
//                       p-4
//                       shadow-[0_3px_10px_rgba(100,80,20,0.04)]
//                     "
//                   >
//                     <div
//                       className="
//                         flex
//                         h-9
//                         w-9
//                         shrink-0
//                         items-center
//                         justify-center
//                         rounded-lg
//                         bg-white
//                         text-[#9b7925]
//                         shadow-[0_2px_7px_rgba(100,80,20,0.07)]
//                       "
//                     >
//                       <ShieldCheck className="h-5 w-5" />
//                     </div>

//                     <div>
//                       <p className="text-sm font-medium text-[#6f5a21]">
//                         حساب فعال
//                       </p>

//                       <p className="mt-1 text-xs leading-6 text-[#8a7b52]">
//                         حساب کاربری شما فعال است و می‌توانید سفارش‌های خود را مدیریت کنید.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* =========================================
//                 ORDERS
//             ========================================= */}
//             {activeSection === "orders" && (
//               <div>
//                 <div
//                   className="
//                     flex
//                     items-center
//                     gap-3
//                     border-b
//                     border-[#e8e0d5]
//                     bg-[#f1eee6]
//                     p-5
//                     sm:p-7
//                   "
//                 >
//                   <div
//                     className="
//                       flex
//                       h-10
//                       w-10
//                       items-center
//                       justify-center
//                       rounded-lg
//                       bg-white
//                       text-[#304f7d]
//                       shadow-[0_2px_8px_rgba(45,60,90,0.08)]
//                     "
//                   >
//                     <ShoppingBag className="h-5 w-5" />
//                   </div>

//                   <div>
//                     <h2 className="text-lg font-bold text-[#243b63]">
//                       سفارش‌های من
//                     </h2>

//                     <p className="mt-1 text-xs text-[#7c8695]">
//                       سفارش‌های ثبت‌شده شما
//                     </p>
//                   </div>
//                 </div>

//                 <div className="p-5 sm:p-7">
//                   <div className="mb-5 grid gap-3 sm:grid-cols-3">
//                     <OrderStat
//                       icon={Package}
//                       title="همه سفارش‌ها"
//                       value="۳"
//                     />

//                     <OrderStat
//                       icon={Clock3}
//                       title="در حال پردازش"
//                       value="۱"
//                     />

//                     <OrderStat
//                       icon={CheckCircle2}
//                       title="تحویل شده"
//                       value="۲"
//                     />
//                   </div>

//                   <div className="space-y-3">
//                     <OrderItem
//                       orderNumber="#10024"
//                       date="۲۴ شهریور ۱۴۰۵"
//                       price="۸۵۰,۰۰۰ تومان"
//                       status="در حال پردازش"
//                       statusType="processing"
//                       count="۲ کالا"
//                     />

//                     <OrderItem
//                       orderNumber="#10018"
//                       date="۱۸ شهریور ۱۴۰۵"
//                       price="۴۲۰,۰۰۰ تومان"
//                       status="تحویل شده"
//                       statusType="completed"
//                       count="۱ کالا"
//                     />

//                     <OrderItem
//                       orderNumber="#10011"
//                       date="۱۱ شهریور ۱۴۰۵"
//                       price="۱,۲۰۰,۰۰۰ تومان"
//                       status="تحویل شده"
//                       statusType="completed"
//                       count="۳ کالا"
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* =========================================
//                 ADDRESSES
//             ========================================= */}
//             {activeSection === "addresses" && (
//               <div>
//                 <div
//                   className="
//                     flex
//                     flex-col
//                     gap-4
//                     border-b
//                     border-[#e8e0d5]
//                     bg-[#f1eee6]
//                     p-5
//                     sm:flex-row
//                     sm:items-center
//                     sm:justify-between
//                     sm:p-7
//                   "
//                 >
//                   <div className="flex items-center gap-3">
//                     <div
//                       className="
//                         flex
//                         h-10
//                         w-10
//                         items-center
//                         justify-center
//                         rounded-lg
//                         bg-white
//                         text-[#304f7d]
//                         shadow-[0_2px_8px_rgba(45,60,90,0.08)]
//                       "
//                     >
//                       <MapPin className="h-5 w-5" />
//                     </div>

//                     <div>
//                       <h2 className="text-lg font-bold text-[#243b63]">
//                         آدرس‌های من
//                       </h2>

//                       <p className="mt-1 text-xs text-[#7c8695]">
//                         آدرس‌های مورد استفاده برای ارسال سفارش
//                       </p>
//                     </div>
//                   </div>

//                   <button
//                     type="button"
//                     onClick={handleAddAddress}
//                     className="
//                       flex
//                       w-fit
//                       items-center
//                       gap-2
//                       rounded-xl
//                       bg-[#304f7d]
//                       px-4
//                       py-2.5
//                       text-sm
//                       text-white
//                       shadow-[0_4px_12px_rgba(48,79,125,0.18)]
//                       transition
//                       hover:bg-[#243f67]
//                     "
//                   >
//                     <Plus className="h-4 w-4" />
//                     افزودن آدرس
//                   </button>
//                 </div>

//                 <div className="p-5 sm:p-7">
//                   {addresses.length === 0 ? (
//                     <div
//                       className="
//                         flex
//                         min-h-[250px]
//                         flex-col
//                         items-center
//                         justify-center
//                         rounded-2xl
//                         border
//                         border-dashed
//                         border-[#d9cfbe]
//                         bg-[#faf8f3]
//                         px-5
//                         text-center
//                       "
//                     >
//                       <div
//                         className="
//                           flex
//                           h-14
//                           w-14
//                           items-center
//                           justify-center
//                           rounded-xl
//                           border
//                           border-[#ddd5c8]
//                           bg-white
//                           text-[#304f7d]
//                           shadow-[0_3px_10px_rgba(45,60,90,0.06)]
//                         "
//                       >
//                         <MapPin className="h-6 w-6" />
//                       </div>

//                       <p className="mt-4 text-sm font-medium text-[#3d506e]">
//                         هنوز آدرسی ثبت نکرده‌اید
//                       </p>

//                       <p className="mt-2 text-xs text-[#8a9099]">
//                         برای ثبت آدرس جدید روی دکمه افزودن آدرس بزنید.
//                       </p>

//                       <button
//                         type="button"
//                         onClick={handleAddAddress}
//                         className="
//                           group
//                           mt-5
//                           flex
//                           items-center
//                           gap-2
//                           rounded-xl
//                           bg-[#304f7d]
//                           px-5
//                           py-2.5
//                           text-sm
//                           text-white
//                           shadow-[0_4px_12px_rgba(48,79,125,0.14)]
//                           transition
//                           hover:bg-[#243f67]
//                         "
//                       >
//                         افزودن اولین آدرس

//                         <ArrowLeft
//                           className="
//                             h-4
//                             w-4
//                             transition-transform
//                             group-hover:-translate-x-1
//                           "
//                         />
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="space-y-3">
//                       {addresses.map((address) => (
//                         <div
//                           key={address.id}
//                           className="
//                             group
//                             flex
//                             flex-col
//                             gap-4
//                             rounded-2xl
//                             border
//                             border-[#e5ddd1]
//                             bg-white
//                             p-5
//                             shadow-[0_3px_12px_rgba(55,45,30,0.04)]
//                             transition
//                             hover:border-[#c9d2df]
//                             hover:bg-[#fcfbf8]
//                             sm:flex-row
//                             sm:items-center
//                             sm:justify-between
//                           "
//                         >
//                           <div className="flex items-start gap-4">
//                             <div
//                               className="
//                                 flex
//                                 h-11
//                                 w-11
//                                 shrink-0
//                                 items-center
//                                 justify-center
//                                 rounded-xl
//                                 border
//                                 border-[#dce1e8]
//                                 bg-[#eef2f7]
//                               "
//                             >
//                               <MapPin className="h-5 w-5 text-[#304f7d]" />
//                             </div>

//                             <div>
//                               <p className="text-sm font-semibold text-[#344866]">
//                                 {address.title}
//                               </p>

//                               <p className="mt-2 text-sm leading-6 text-[#77818e]">
//                                 {address.text}
//                               </p>

//                               {address.phone && (
//                                 <p
//                                   dir="ltr"
//                                   className="mt-2 flex items-center gap-2 text-xs text-[#9098a2]"
//                                 >
//                                   <Phone className="h-3.5 w-3.5" />
//                                   {address.phone}
//                                 </p>
//                               )}
//                             </div>
//                           </div>

//                           <button
//                             type="button"
//                             onClick={() =>
//                               handleDeleteAddress(
//                                 address.id
//                               )
//                             }
//                             className="
//                               flex
//                               w-fit
//                               items-center
//                               gap-2
//                               rounded-lg
//                               px-3
//                               py-2
//                               text-xs
//                               text-[#777d86]
//                               transition
//                               hover:bg-[#f5f1e9]
//                               hover:text-[#304f7d]
//                             "
//                           >
//                             <Trash2 className="h-4 w-4" />
//                             حذف
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* =========================================
//                 FAVORITES
//             ========================================= */}
//             {activeSection === "favorites" && (
//               <div>
//                 <div
//                   className="
//                     flex
//                     items-center
//                     gap-3
//                     border-b
//                     border-[#e8e0d5]
//                     bg-[#f1eee6]
//                     p-5
//                     sm:p-7
//                   "
//                 >
//                   <div
//                     className="
//                       flex
//                       h-10
//                       w-10
//                       items-center
//                       justify-center
//                       rounded-lg
//                       bg-white
//                       text-[#304f7d]
//                       shadow-[0_2px_8px_rgba(45,60,90,0.08)]
//                     "
//                   >
//                     <Heart className="h-5 w-5" />
//                   </div>

//                   <div>
//                     <h2 className="text-lg font-bold text-[#243b63]">
//                       علاقه‌مندی‌ها
//                     </h2>

//                     <p className="mt-1 text-xs text-[#7c8695]">
//                       محصولاتی که ذخیره کرده‌اید
//                     </p>
//                   </div>
//                 </div>

//                 <div className="p-5 sm:p-7">
//                   <div
//                     className="
//                       flex
//                       min-h-[300px]
//                       flex-col
//                       items-center
//                       justify-center
//                       rounded-2xl
//                       border
//                       border-dashed
//                       border-[#d9cfbe]
//                       bg-[#faf8f3]
//                       px-5
//                       text-center
//                     "
//                   >
//                     <div
//                       className="
//                         flex
//                         h-14
//                         w-14
//                         items-center
//                         justify-center
//                         rounded-xl
//                         border
//                         border-[#ddd5c8]
//                         bg-white
//                         text-[#304f7d]
//                         shadow-[0_3px_10px_rgba(45,60,90,0.06)]
//                       "
//                     >
//                       <Heart className="h-6 w-6" />
//                     </div>

//                     <p className="mt-4 text-sm font-medium text-[#3d506e]">
//                       هنوز محصولی در علاقه‌مندی‌ها ندارید
//                     </p>

//                     <p className="mt-2 max-w-md text-xs leading-6 text-[#8a9099]">
//                       محصولات مورد علاقه خود را ذخیره کنید تا بعداً به‌راحتی به آن‌ها دسترسی داشته باشید.
//                     </p>

//                     <button
//                       type="button"
//                       onClick={() => navigate("/")}
//                       className="
//                         group
//                         mt-5
//                         flex
//                         items-center
//                         gap-2
//                         rounded-xl
//                         bg-[#304f7d]
//                         px-5
//                         py-2.5
//                         text-sm
//                         text-white
//                         shadow-[0_4px_12px_rgba(48,79,125,0.14)]
//                         transition
//                         hover:bg-[#243f67]
//                       "
//                     >
//                       مشاهده محصولات

//                       <ArrowLeft
//                         className="
//                           h-4
//                           w-4
//                           transition-transform
//                           group-hover:-translate-x-1
//                         "
//                       />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* =========================================
//                 SETTINGS
//             ========================================= */}
//             {activeSection === "settings" && (
//               <div>
//                 <div
//                   className="
//                     flex
//                     items-center
//                     gap-3
//                     border-b
//                     border-[#e8e0d5]
//                     bg-[#f1eee6]
//                     p-5
//                     sm:p-7
//                   "
//                 >
//                   <div
//                     className="
//                       flex
//                       h-10
//                       w-10
//                       items-center
//                       justify-center
//                       rounded-lg
//                       bg-white
//                       text-[#304f7d]
//                       shadow-[0_2px_8px_rgba(45,60,90,0.08)]
//                     "
//                   >
//                     <Settings className="h-5 w-5" />
//                   </div>

//                   <div>
//                     <h2 className="text-lg font-bold text-[#243b63]">
//                       تنظیمات حساب
//                     </h2>

//                     <p className="mt-1 text-xs text-[#7c8695]">
//                       مدیریت تنظیمات حساب کاربری
//                     </p>
//                   </div>
//                 </div>

//                 <div className="p-4 sm:p-5">
//                   <div
//                     className="
//                       overflow-hidden
//                       rounded-2xl
//                       border
//                       border-[#e5ddd1]
//                       bg-white
//                       shadow-[0_3px_12px_rgba(55,45,30,0.04)]
//                     "
//                   >
//                     <SettingRow
//                       title="اطلاعات شخصی"
//                       description="مدیریت نام، شماره موبایل و ایمیل"
//                       icon={UserRound}
//                       onClick={() =>
//                         setActiveSection("account")
//                       }
//                     />

//                     <SettingRow
//                       title="آدرس‌های ارسال"
//                       description="مدیریت آدرس‌های مورد استفاده برای سفارش"
//                       icon={MapPin}
//                       onClick={() =>
//                         setActiveSection("addresses")
//                       }
//                     />

//                     <SettingRow
//                       title="امنیت حساب"
//                       description="حساب شما با اطلاعات ورود محافظت می‌شود"
//                       icon={ShieldCheck}
//                     />

//                     <SettingRow
//                       title="خروج از حساب"
//                       description="خروج از حساب کاربری در این دستگاه"
//                       icon={LogOut}
//                       onClick={handleLogout}
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}
//           </section>
//         </div>
//       </div>
//     </main>
//   );
// }

// /* =====================================================
//    PROFILE INFO CARD
// ===================================================== */

// function ProfileInfoCard({
//   icon: Icon,
//   title,
//   value,
//   dir,
// }) {
//   return (
//     <div
//       className="
//         group
//         rounded-xl
//         border
//         border-[#e5ddd1]
//         bg-[#fcfbf8]
//         p-4
//         shadow-[0_3px_10px_rgba(55,45,30,0.035)]
//         transition
//         hover:border-[#cdd6e1]
//         hover:bg-[#f9f7f2]
//         hover:shadow-[0_5px_15px_rgba(45,60,90,0.055)]
//       "
//     >
//       <div className="flex items-center gap-3">
//         <div
//           className="
//             flex
//             h-9
//             w-9
//             shrink-0
//             items-center
//             justify-center
//             rounded-lg
//             bg-[#e9eef6]
//             text-[#304f7d]
//             transition
//             group-hover:bg-[#dfe7f1]
//           "
//         >
//           <Icon className="h-4 w-4" />
//         </div>

//         <div className="min-w-0">
//           <p className="text-[11px] text-[#8b939d]">
//             {title}
//           </p>

//           <p
//             dir={dir}
//             className={`
//               mt-1
//               truncate
//               text-sm
//               font-medium
//               text-[#344866]
//               ${dir === "ltr" ? "text-left" : ""}
//             `}
//           >
//             {value}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* =====================================================
//    INPUT FIELD
// ===================================================== */

// function InputField({
//   label,
//   value,
//   disabled,
//   onChange,
//   placeholder,
//   dir,
// }) {
//   return (
//     <div>
//       <label className="mb-2 block text-sm font-medium text-[#4c5b70]">
//         {label}
//       </label>

//       <div
//         className={`
//           relative
//           rounded-xl
//           transition
//           ${
//             disabled
//               ? ""
//               : "focus-within:shadow-[0_4px_14px_rgba(48,79,125,0.06)]"
//           }
//         `}
//       >
//         <input
//           type="text"
//           value={value}
//           disabled={disabled}
//           onChange={(e) => onChange(e.target.value)}
//           placeholder={placeholder}
//           dir={dir}
//           className={`
//             h-12
//             w-full
//             rounded-xl
//             border
//             border-[#ddd6ca]
//             bg-white
//             px-4
//             text-sm
//             outline-none
//             transition
//             placeholder:text-[#a6abb1]
//             ${
//               dir === "ltr"
//                 ? "text-left"
//                 : "text-right"
//             }
//             ${
//               disabled
//                 ? "cursor-default bg-[#f5f2ec] text-[#707b88]"
//                 : "focus:border-[#9babc0] focus:bg-[#fffefd]"
//             }
//           `}
//         />
//       </div>
//     </div>
//   );
// }

// /* =====================================================
//    ORDER STAT
// ===================================================== */

// function OrderStat({
//   icon: Icon,
//   title,
//   value,
// }) {
//   return (
//     <div
//       className="
//         group
//         flex
//         items-center
//         justify-between
//         rounded-xl
//         border
//         border-[#e5ddd1]
//         bg-[#fcfbf8]
//         p-4
//         shadow-[0_3px_10px_rgba(55,45,30,0.035)]
//         transition
//         hover:border-[#cdd6e1]
//         hover:bg-[#f9f7f2]
//         hover:shadow-[0_5px_15px_rgba(45,60,90,0.05)]
//       "
//     >
//       <div className="flex items-center gap-3">
//         <div
//           className="
//             flex
//             h-9
//             w-9
//             items-center
//             justify-center
//             rounded-lg
//             bg-[#e9eef6]
//             text-[#304f7d]
//           "
//         >
//           <Icon className="h-4 w-4" />
//         </div>

//         <span className="text-xs text-[#6f7a89]">
//           {title}
//         </span>
//       </div>

//       <span className="text-lg font-bold text-[#344866]">
//         {value}
//       </span>
//     </div>
//   );
// }

// /* =====================================================
//    ORDER ITEM
// ===================================================== */

// function OrderItem({
//   orderNumber,
//   date,
//   price,
//   status,
//   statusType,
//   count,
// }) {
//   const isCompleted = statusType === "completed";

//   return (
//     <div
//       className="
//         group
//         rounded-2xl
//         border
//         border-[#e5ddd1]
//         bg-white
//         p-4
//         shadow-[0_3px_12px_rgba(55,45,30,0.035)]
//         transition
//         hover:border-[#cdd6e1]
//         hover:bg-[#fcfbf8]
//         hover:shadow-[0_5px_16px_rgba(45,60,90,0.055)]
//       "
//     >
//       <div
//         className="
//           flex
//           flex-col
//           gap-4
//           lg:flex-row
//           lg:items-center
//           lg:justify-between
//         "
//       >
//         {/* Order Info */}
//         <div className="flex items-center gap-4">
//           <div
//             className="
//               flex
//               h-11
//               w-11
//               shrink-0
//               items-center
//               justify-center
//               rounded-xl
//               border
//               border-[#dce2e9]
//               bg-[#eef2f7]
//               text-[#304f7d]
//               transition
//               group-hover:bg-[#e7edf5]
//             "
//           >
//             <Package className="h-5 w-5" />
//           </div>

//           <div>
//             <p className="text-sm font-semibold text-[#344866]">
//               سفارش {orderNumber}
//             </p>

//             <div className="mt-1 flex items-center gap-2 text-xs text-[#9299a2]">
//               <CalendarDays className="h-3.5 w-3.5" />
//               <span>{date}</span>
//               <span>•</span>
//               <span>{count}</span>
//             </div>
//           </div>
//         </div>

//         {/* Price */}
//         <div className="lg:text-center">
//           <p className="text-xs text-[#9299a2]">
//             مبلغ سفارش
//           </p>

//           <p className="mt-1 text-sm font-semibold text-[#344866]">
//             {price}
//           </p>
//         </div>

//         {/* Status */}
//         <div className="flex items-center justify-between gap-5 lg:justify-end">
//           <div
//             className={`
//               flex
//               items-center
//               gap-2
//               rounded-lg
//               px-3
//               py-2
//               ${
//                 isCompleted
//                   ? "bg-[#edf5ef] text-[#477258]"
//                   : "bg-[#fff6df] text-[#92732a]"
//               }
//             `}
//           >
//             {isCompleted ? (
//               <CheckCircle2 className="h-4 w-4" />
//             ) : (
//               <Truck className="h-4 w-4" />
//             )}

//             <span className="text-xs">
//               {status}
//             </span>
//           </div>

//           <button
//             type="button"
//             className="
//               group/details
//               flex
//               items-center
//               gap-1
//               rounded-lg
//               px-2
//               py-2
//               text-xs
//               text-[#6e7885]
//               transition
//               hover:bg-[#f5f1e9]
//               hover:text-[#304f7d]
//             "
//           >
//             جزئیات

//             <ChevronLeft
//               className="
//                 h-3.5
//                 w-3.5
//                 transition-transform
//                 group-hover/details:-translate-x-1
//               "
//             />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* =====================================================
//    SETTING ROW
// ===================================================== */

// function SettingRow({
//   title,
//   description,
//   icon: Icon,
//   onClick,
// }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       disabled={!onClick}
//       className="
//         group
//         flex
//         w-full
//         items-center
//         justify-between
//         gap-4
//         border-b
//         border-[#ebe4d9]
//         p-5
//         text-right
//         transition
//         last:border-b-0
//         hover:bg-[#faf8f3]
//         disabled:cursor-default
//       "
//     >
//       <div className="flex items-center gap-4">
//         <div
//           className="
//             flex
//             h-10
//             w-10
//             shrink-0
//             items-center
//             justify-center
//             rounded-lg
//             border
//             border-[#dce2e9]
//             bg-[#eef2f7]
//             text-[#304f7d]
//             transition
//             group-hover:bg-white
//             group-hover:shadow-[0_2px_8px_rgba(45,60,90,0.06)]
//           "
//         >
//           <Icon className="h-5 w-5" />
//         </div>

//         <div>
//           <p className="text-sm font-medium text-[#344866]">
//             {title}
//           </p>

//           <p className="mt-1 text-xs text-[#8a929c]">
//             {description}
//           </p>
//         </div>
//       </div>

//       {onClick && (
//         <ChevronLeft
//           className="
//             h-4
//             w-4
//             text-[#9ba2ab]
//             transition-transform
//             group-hover:-translate-x-1
//             group-hover:text-[#304f7d]
//           "
//         />
//       )}
//     </button>
//   );
// }