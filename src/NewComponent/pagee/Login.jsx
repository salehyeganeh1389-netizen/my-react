import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import {
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  Smartphone,
  Mail,
  ShieldCheck,
  Check,
  RefreshCw,
  LockKeyhole,
} from "lucide-react";

// =====================================================
// Validation
// =====================================================

const identifierSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, "شماره موبایل یا ایمیل را وارد کنید")
    .refine(
      (value) => {
        const isPhone = /^09\d{9}$/.test(value);

        const isEmail =
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

        return isPhone || isEmail;
      },
      {
        message: "شماره موبایل یا ایمیل معتبر وارد کنید",
      }
    ),
});

const loginPasswordSchema = z.object({
  password: z
    .string()
    .min(1, "رمز عبور را وارد کنید")
    .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
});

const createPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, "رمز عبور باید حداقل ۶ کاراکتر داشته باشد"),

    confirmPassword: z
      .string()
      .min(1, "تکرار رمز عبور را وارد کنید"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمزهای عبور یکسان نیستند",
    path: ["confirmPassword"],
  });

// =====================================================
// Component
// =====================================================

export default function Login() {
  const navigate = useNavigate();

  // =====================================================
  // States
  // =====================================================

  const [step, setStep] = useState("identifier");

  const [identifier, setIdentifier] = useState("");

  const [otp, setOtp] = useState("");

  const [showLoginPassword, setShowLoginPassword] =
    useState(false);

  const [showCreatePassword, setShowCreatePassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [otpTimer, setOtpTimer] = useState(60);

  const [isSuccess, setIsSuccess] = useState(false);

  // =====================================================
  // Identifier Form
  // =====================================================

  const identifierForm = useForm({
    resolver: zodResolver(identifierSchema),

    defaultValues: {
      identifier: "",
    },
  });

  const {
    register: registerIdentifier,
    handleSubmit: handleIdentifierSubmit,
    formState: { errors: identifierErrors },
  } = identifierForm;

  // =====================================================
  // Login Password Form
  // =====================================================

  const loginPasswordForm = useForm({
    resolver: zodResolver(loginPasswordSchema),

    defaultValues: {
      password: "",
    },
  });

  const {
    register: registerLoginPassword,
    handleSubmit: handleLoginPasswordSubmit,
    formState: { errors: loginPasswordErrors },
  } = loginPasswordForm;

  // =====================================================
  // Create Password Form
  // =====================================================

  const createPasswordForm = useForm({
    resolver: zodResolver(createPasswordSchema),

    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const {
    register: registerCreatePassword,
    handleSubmit: handleCreatePasswordSubmit,
    formState: { errors: createPasswordErrors },
  } = createPasswordForm;

  // =====================================================
  // OTP Timer
  // =====================================================

  useEffect(() => {
    if (step !== "otp") return;

    if (otpTimer <= 0) return;

    const timer = setInterval(() => {
      setOtpTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [step, otpTimer]);

  // =====================================================
  // Save User
  // =====================================================

  const saveLoggedInUser = (userIdentifier) => {
    const user = {
      identifier: userIdentifier,
      isLoggedIn: true,
    };

    localStorage.setItem(
      "qomash_auth",
      JSON.stringify(user)
    );

    window.dispatchEvent(
      new Event("qomash-auth-changed")
    );
  };

  // =====================================================
  // Identifier Submit
  // =====================================================

  const onIdentifierSubmit = (data) => {
    const value = data.identifier.trim();

    setIdentifier(value);

    const existing =
      value.includes("0912") || value.includes("test@");

    if (existing) {
      setStep("password");
    } else {
      setOtp("");
      setOtpTimer(60);
      setStep("otp");
    }
  };

  // =====================================================
  // Login
  // =====================================================

  const onLoginSubmit = (data) => {
    console.log("Login:", {
      identifier,
      password: data.password,
    });

    saveLoggedInUser(identifier);

    setIsSuccess(true);
  };

  // =====================================================
  // OTP Change
  // =====================================================

  const handleOtpChange = (index, value) => {
    const number = value.replace(/\D/g, "");

    if (!number) return;

    const otpArray = otp.padEnd(6, "").split("");

    otpArray[index] = number[number.length - 1];

    const newOtp = otpArray.join("").slice(0, 6);

    setOtp(newOtp);

    if (index < 5) {
      document
        .getElementById(`otp-${index + 1}`)
        ?.focus();
    }
  };

  // =====================================================
  // OTP Keyboard
  // =====================================================

  const handleOtpKeyDown = (index, e) => {
    if (e.key !== "Backspace") return;

    const otpArray = otp.padEnd(6, "").split("");

    if (otpArray[index]) {
      otpArray[index] = "";

      setOtp(otpArray.join(""));

      return;
    }

    if (index > 0) {
      document
        .getElementById(`otp-${index - 1}`)
        ?.focus();
    }
  };

  // =====================================================
  // OTP Paste
  // =====================================================

  const handleOtpPaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pasted) return;

    setOtp(pasted);

    document
      .getElementById(
        `otp-${Math.min(pasted.length - 1, 5)}`
      )
      ?.focus();
  };

  // =====================================================
  // OTP Submit
  // =====================================================

  const handleOtpSubmit = (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      alert("کد ۶ رقمی را کامل وارد کنید");

      return;
    }

    console.log("OTP:", otp);

    setStep("create-password");
  };

  // =====================================================
  // Resend OTP
  // =====================================================

  const handleResendOtp = () => {
    if (otpTimer > 0) return;

    console.log(`Send OTP to ${identifier}`);

    setOtp("");

    setOtpTimer(60);
  };

  // =====================================================
  // Create Account
  // =====================================================

  const handleCreateAccount = (data) => {
    console.log("Create account:", {
      identifier,
      password: data.password,
    });

    saveLoggedInUser(identifier);

    setIsSuccess(true);
  };

  // =====================================================
  // Back
  // =====================================================

  const handleStepBack = () => {
    if (step === "password" || step === "otp") {
      setStep("identifier");

      return;
    }

    if (step === "create-password") {
      setStep("otp");
    }
  };

  // =====================================================
  // Identifier Type
  // =====================================================

  const isPhone = /^09\d{9}$/.test(identifier);

  // =====================================================
  // Timer
  // =====================================================

  const formattedTimer = `00:${String(otpTimer).padStart(
    2,
    "0"
  )}`;

  // =====================================================
  // SUCCESS
  // =====================================================

  if (isSuccess) {
    return (
      <main
        dir="rtl"
        className="
          min-h-screen
          bg-[#f4f6f5]
          px-4
          py-8
          sm:px-6
        "
      >
        <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
          <div
            className="
              relative
              w-full
              max-w-[450px]
              overflow-hidden
              rounded-[24px]
              border
              border-[#dfe5e1]
              bg-white
              px-6
              py-10
              text-center
              shadow-[0_20px_60px_rgba(23,58,44,0.08)]
              sm:px-10
              sm:py-12
            "
          >
            <div className="absolute right-0 top-0 h-1 w-full bg-[#173a2c]" />

            <div
              className="
                mx-auto
                mb-7
                flex
                h-24
                w-24
                items-center
                justify-center
                rounded-[20px]
                border
                border-[#e1e7e3]
                bg-[#f7f9f8]
              "
            >
              <img
                src="/qomash_sheikh_eslami_logo_transparent-3.png"
                alt="قماش شیخ الاسلامی"
                className="h-16 w-16 object-contain"
              />
            </div>

            <div
              className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-[16px]
                bg-[#173a2c]
                text-white
              "
            >
              <Check className="h-6 w-6" />
            </div>

            <h1 className="mt-7 text-2xl font-bold text-[#17231e]">
              ورود با موفقیت انجام شد
            </h1>

            <p className="mt-4 text-sm leading-8 text-[#68736e]">
              خوش آمدید.
              <br />
              حالا می‌توانید از فروشگاه قماش شیخ الاسلامی دیدن کنید.
            </p>

            <Button
              type="button"
              onClick={() => navigate("/")}
              className="
                mt-8
                h-14
                w-full
                rounded-[16px]
                bg-[#173a2c]
                text-base
                font-medium
                text-white
                shadow-none
                transition
                hover:bg-[#0f2d21]
              "
            >
              ورود به فروشگاه
              <ArrowLeft className="mr-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </main>
    );
  }

  // =====================================================
  // MAIN
  // =====================================================

  return (
    <main
      dir="rtl"
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#f4f6f5]
      "
    >
      {/* Background */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute
            right-0
            top-0
            h-1
            w-full
            bg-[#173a2c]
            opacity-90
          "
        />

        <div
          className="
            absolute
            bottom-0
            right-0
            h-px
            w-full
            bg-[#dce4df]
          "
        />
      </div>

      {/* Back */}

      <button
        type="button"
        onClick={() => navigate("/")}
        className="
          absolute
          right-5
          top-5
          z-30
          flex
          items-center
          gap-2
          rounded-[14px]
          border
          border-[#dce3df]
          bg-white
          px-4
          py-3
          text-sm
          font-medium
          text-[#34423b]
          shadow-sm
          transition
          hover:border-[#bfcfc6]
          hover:bg-[#f8faf9]
          sm:right-8
          sm:top-8
        "
      >
        <ArrowRight className="h-4 w-4" />

        بازگشت به فروشگاه
      </button>

      {/* Center */}

      <div
        className="
          relative
          z-10
          flex
          min-h-screen
          items-center
          justify-center
          px-4
          py-24
          sm:px-6
        "
      >
        <div className="w-full max-w-[600px]">
          {/* Main Card */}

          <div
            className="
              overflow-hidden
              rounded-[24px]
              border
              border-[#dce4df]
              bg-white
              shadow-[0_25px_80px_rgba(23,58,44,0.08)]
            "
          >
            {/* FORM */}

            <div className="bg-white">
              <div className="p-6 sm:p-10 lg:p-12">

                {/* Mobile Logo */}

                <div className="mb-8 text-center">
                  <div
                    className="
                      mx-auto
                      mb-4
                      flex
                      h-20
                      w-20
                      items-center
                      justify-center
                      rounded-[18px]
                      border
                      border-[#e0e7e3]
                      bg-[#f7f9f8]
                      p-2
                    "
                  >
                    <img
                      src="/qomash_sheikh_eslami_logo_transparent-3.png"
                      alt="قماش شیخ الاسلامی"
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <h1 className="text-xl font-bold text-[#173a2c]">
                    قماش شیخ الاسلامی
                  </h1>

                  <div className="mx-auto mt-3 h-px w-12 bg-[#173a2c]" />
                </div>

                {/* =================================================
                    STEP 1
                ================================================= */}

                {step === "identifier" && (
                  <div>
                    <div className="mb-8">
                      <div
                        className="
                          mb-5
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-[14px]
                          bg-[#edf3ef]
                          text-[#173a2c]
                        "
                      >
                        <LockKeyhole className="h-5 w-5" />
                      </div>

                      <h2 className="text-2xl font-bold text-[#17231e]">
                        ورود به حساب
                      </h2>

                      <p className="mt-3 text-sm leading-7 text-[#68736e]">
                        برای ورود یا ساخت حساب، شماره موبایل یا
                        ایمیل خود را وارد کنید.
                      </p>
                    </div>

                    <form
                      onSubmit={handleIdentifierSubmit(
                        onIdentifierSubmit
                      )}
                      className="space-y-5"
                    >
                      <div className="space-y-2">
                        <Label
                          htmlFor="identifier"
                          className="text-sm font-medium text-[#35433c]"
                        >
                          شماره موبایل یا ایمیل
                        </Label>

                        <Input
                          id="identifier"
                          {...registerIdentifier("identifier")}
                          placeholder="09123456789 یا example@gmail.com"
                          dir="ltr"
                          autoComplete="username"
                          className="
                            h-14
                            rounded-[14px]
                            border-[#d9e1dc]
                            bg-[#fafcfb]
                            px-4
                            text-left
                            text-[15px]
                            shadow-none
                            outline-none
                            transition
                            placeholder:text-[#9ba59f]
                            focus:border-[#173a2c]
                            focus:ring-4
                            focus:ring-[#173a2c]/10
                          "
                        />

                        {identifierErrors.identifier && (
                          <p className="text-sm text-red-500">
                            {identifierErrors.identifier.message}
                          </p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        className="
                          h-14
                          w-full
                          rounded-[14px]
                          bg-[#173a2c]
                          text-base
                          font-medium
                          text-white
                          shadow-none
                          transition
                          hover:bg-[#0f2d21]
                        "
                      >
                        ادامه

                        <ArrowLeft className="mr-2 h-5 w-5" />
                      </Button>
                    </form>

                    <p className="mt-7 text-center text-xs leading-6 text-[#9aa39e]">
                      با ادامه دادن، شرایط استفاده و حریم خصوصی
                      فروشگاه را می‌پذیرید.
                    </p>
                  </div>
                )}

                {/* =================================================
                    STEP 2
                ================================================= */}

                {step === "password" && (
                  <div>
                    <button
                      type="button"
                      onClick={handleStepBack}
                      className="
                        mb-7
                        flex
                        items-center
                        gap-2
                        text-sm
                        text-[#68736e]
                        transition
                        hover:text-[#173a2c]
                      "
                    >
                      <ArrowRight className="h-4 w-4" />

                      تغییر شماره یا ایمیل
                    </button>

                    <div className="mb-8">
                      <div className="mb-5 flex items-center gap-3">
                        <div
                          className="
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-[14px]
                            bg-[#edf3ef]
                            text-[#173a2c]
                          "
                        >
                          {isPhone ? (
                            <Smartphone className="h-5 w-5" />
                          ) : (
                            <Mail className="h-5 w-5" />
                          )}
                        </div>

                        <div>
                          <p className="text-xs text-[#9aa39e]">
                            حساب شما
                          </p>

                          <p
                            dir="ltr"
                            className="mt-1 text-sm font-medium text-[#35433c]"
                          >
                            {identifier}
                          </p>
                        </div>
                      </div>

                      <h2 className="text-2xl font-bold text-[#17231e]">
                        خوش آمدید
                      </h2>

                      <p className="mt-3 text-sm text-[#68736e]">
                        رمز عبور خود را وارد کنید.
                      </p>
                    </div>

                    <form
                      onSubmit={handleLoginPasswordSubmit(
                        onLoginSubmit
                      )}
                      className="space-y-5"
                    >
                      <div className="space-y-2">
                        <Label
                          htmlFor="login-password"
                          className="text-sm font-medium text-[#35433c]"
                        >
                          رمز عبور
                        </Label>

                        <div className="relative">
                          <Input
                            id="login-password"
                            type={
                              showLoginPassword
                                ? "text"
                                : "password"
                            }
                            {...registerLoginPassword("password")}
                            placeholder="رمز عبور خود را وارد کنید"
                            autoComplete="current-password"
                            className="
                              h-14
                              rounded-[14px]
                              border-[#d9e1dc]
                              bg-[#fafcfb]
                              pl-12
                              shadow-none
                              transition
                              placeholder:text-[#9ba59f]
                              focus:border-[#173a2c]
                              focus:ring-4
                              focus:ring-[#173a2c]/10
                            "
                          />

                          <button
                            type="button"
                            onClick={() =>
                              setShowLoginPassword(
                                (prev) => !prev
                              )
                            }
                            className="
                              absolute
                              left-3
                              top-1/2
                              -translate-y-1/2
                              text-[#9aa39e]
                              transition
                              hover:text-[#173a2c]
                            "
                          >
                            {showLoginPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>

                        {loginPasswordErrors.password && (
                          <p className="text-sm text-red-500">
                            {
                              loginPasswordErrors.password
                                .message
                            }
                          </p>
                        )}
                      </div>

                      <div className="flex justify-start">
                        <button
                          type="button"
                          className="
                            text-sm
                            text-[#68736e]
                            transition
                            hover:text-[#173a2c]
                            hover:underline
                          "
                        >
                          رمز عبور را فراموش کرده‌اید؟
                        </button>
                      </div>

                      <Button
                        type="submit"
                        className="
                          h-14
                          w-full
                          rounded-[14px]
                          bg-[#173a2c]
                          text-base
                          font-medium
                          text-white
                          shadow-none
                          transition
                          hover:bg-[#0f2d21]
                        "
                      >
                        ورود به حساب
                      </Button>
                    </form>
                  </div>
                )}

                {/* =================================================
                    STEP 3
                ================================================= */}

                {step === "otp" && (
                  <div>
                    <button
                      type="button"
                      onClick={handleStepBack}
                      className="
                        mb-7
                        flex
                        items-center
                        gap-2
                        text-sm
                        text-[#68736e]
                        transition
                        hover:text-[#173a2c]
                      "
                    >
                      <ArrowRight className="h-4 w-4" />

                      بازگشت
                    </button>

                    <div className="mb-8">
                      <div
                        className="
                          mb-5
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-[14px]
                          bg-[#edf3ef]
                          text-[#173a2c]
                        "
                      >
                        <ShieldCheck className="h-6 w-6" />
                      </div>

                      <h2 className="text-2xl font-bold text-[#17231e]">
                        تأیید اطلاعات
                      </h2>

                      <p className="mt-3 text-sm leading-7 text-[#68736e]">
                        کد تأیید ارسال‌شده را وارد کنید.
                      </p>

                      <p
                        dir="ltr"
                        className="mt-2 text-sm font-semibold text-[#35433c]"
                      >
                        {identifier}
                      </p>
                    </div>

                    <form
                      onSubmit={handleOtpSubmit}
                      className="space-y-6"
                    >
                      <div>
                        <Label className="mb-3 block text-sm font-medium text-[#35433c]">
                          کد تأیید
                        </Label>

                        <div
                          dir="ltr"
                          onPaste={handleOtpPaste}
                          className="grid grid-cols-6 gap-2 sm:gap-3"
                        >
                          {Array.from({ length: 6 }).map(
                            (_, index) => (
                              <Input
                                key={index}
                                id={`otp-${index}`}
                                value={otp[index] || ""}
                                onChange={(e) =>
                                  handleOtpChange(
                                    index,
                                    e.target.value
                                  )
                                }
                                onKeyDown={(e) =>
                                  handleOtpKeyDown(index, e)
                                }
                                inputMode="numeric"
                                maxLength={1}
                                autoFocus={index === 0}
                                className="
                                  h-14
                                  rounded-[14px]
                                  border-[#d9e1dc]
                                  bg-[#fafcfb]
                                  p-0
                                  text-center
                                  text-lg
                                  font-bold
                                  text-[#173a2c]
                                  shadow-none
                                  focus:border-[#173a2c]
                                  focus:ring-4
                                  focus:ring-[#173a2c]/10
                                "
                              />
                            )
                          )}
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="
                          h-14
                          w-full
                          rounded-[14px]
                          bg-[#173a2c]
                          text-base
                          font-medium
                          text-white
                          shadow-none
                          transition
                          hover:bg-[#0f2d21]
                        "
                      >
                        تأیید و ادامه

                        <ArrowLeft className="mr-2 h-5 w-5" />
                      </Button>

                      <div className="text-center">
                        {otpTimer > 0 ? (
                          <p className="text-sm text-[#9aa39e]">
                            ارسال مجدد کد تا{" "}

                            <span
                              dir="ltr"
                              className="font-medium text-[#52605a]"
                            >
                              {formattedTimer}
                            </span>
                          </p>
                        ) : (
                          <button
                            type="button"
                            onClick={handleResendOtp}
                            className="
                              inline-flex
                              items-center
                              gap-2
                              text-sm
                              font-medium
                              text-[#173a2c]
                              transition
                              hover:text-[#0f2d21]
                            "
                          >
                            <RefreshCw className="h-4 w-4" />

                            ارسال مجدد کد
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                )}

                {/* =================================================
                    STEP 4
                ================================================= */}

                {step === "create-password" && (
                  <div>
                    <button
                      type="button"
                      onClick={handleStepBack}
                      className="
                        mb-7
                        flex
                        items-center
                        gap-2
                        text-sm
                        text-[#68736e]
                        transition
                        hover:text-[#173a2c]
                      "
                    >
                      <ArrowRight className="h-4 w-4" />

                      بازگشت
                    </button>

                    <div className="mb-8">
                      <div
                        className="
                          mb-5
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-[14px]
                          bg-[#edf3ef]
                          text-[#173a2c]
                        "
                      >
                        <Check className="h-6 w-6" />
                      </div>

                      <h2 className="text-2xl font-bold text-[#17231e]">
                        ساخت حساب
                      </h2>

                      <p className="mt-3 text-sm leading-7 text-[#68736e]">
                        اطلاعات شما تأیید شد.
                        <br />
                        یک رمز عبور برای حساب خود انتخاب کنید.
                      </p>
                    </div>

                    <form
                      onSubmit={handleCreatePasswordSubmit(
                        handleCreateAccount
                      )}
                      className="space-y-5"
                    >
                      {/* Password */}

                      <div className="space-y-2">
                        <Label
                          htmlFor="create-password"
                          className="text-sm font-medium text-[#35433c]"
                        >
                          رمز عبور
                        </Label>

                        <div className="relative">
                          <Input
                            id="create-password"
                            type={
                              showCreatePassword
                                ? "text"
                                : "password"
                            }
                            {...registerCreatePassword(
                              "password"
                            )}
                            placeholder="حداقل ۶ کاراکتر"
                            autoComplete="new-password"
                            className="
                              h-14
                              rounded-[14px]
                              border-[#d9e1dc]
                              bg-[#fafcfb]
                              pl-12
                              shadow-none
                              transition
                              placeholder:text-[#9ba59f]
                              focus:border-[#173a2c]
                              focus:ring-4
                              focus:ring-[#173a2c]/10
                            "
                          />

                          <button
                            type="button"
                            onClick={() =>
                              setShowCreatePassword(
                                (prev) => !prev
                              )
                            }
                            className="
                              absolute
                              left-3
                              top-1/2
                              -translate-y-1/2
                              text-[#9aa39e]
                              transition
                              hover:text-[#173a2c]
                            "
                          >
                            {showCreatePassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>

                        {createPasswordErrors.password && (
                          <p className="text-sm text-red-500">
                            {
                              createPasswordErrors.password
                                .message
                            }
                          </p>
                        )}
                      </div>

                      {/* Confirm Password */}

                      <div className="space-y-2">
                        <Label
                          htmlFor="confirm-password"
                          className="text-sm font-medium text-[#35433c]"
                        >
                          تکرار رمز عبور
                        </Label>

                        <div className="relative">
                          <Input
                            id="confirm-password"
                            type={
                              showConfirmPassword
                                ? "text"
                                : "password"
                            }
                            {...registerCreatePassword(
                              "confirmPassword"
                            )}
                            placeholder="رمز عبور را دوباره وارد کنید"
                            autoComplete="new-password"
                            className="
                              h-14
                              rounded-[14px]
                              border-[#d9e1dc]
                              bg-[#fafcfb]
                              pl-12
                              shadow-none
                              transition
                              placeholder:text-[#9ba59f]
                              focus:border-[#173a2c]
                              focus:ring-4
                              focus:ring-[#173a2c]/10
                            "
                          />

                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(
                                (prev) => !prev
                              )
                            }
                            className="
                              absolute
                              left-3
                              top-1/2
                              -translate-y-1/2
                              text-[#9aa39e]
                              transition
                              hover:text-[#173a2c]
                            "
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>

                        {createPasswordErrors.confirmPassword && (
                          <p className="text-sm text-red-500">
                            {
                              createPasswordErrors
                                .confirmPassword.message
                            }
                          </p>
                        )}
                      </div>

                      {/* Password Hint */}

                      <div
                        className="
                          rounded-[14px]
                          border
                          border-[#dfe7e2]
                          bg-[#f5f8f6]
                          px-4
                          py-3
                          text-xs
                          leading-6
                          text-[#68736e]
                        "
                      >
                        رمز عبور شما باید حداقل ۶ کاراکتر داشته
                        باشد.
                      </div>

                      <Button
                        type="submit"
                        className="
                          h-14
                          w-full
                          rounded-[14px]
                          bg-[#173a2c]
                          text-base
                          font-medium
                          text-white
                          shadow-none
                          transition
                          hover:bg-[#0f2d21]
                        "
                      >
                        ایجاد حساب

                        <ArrowLeft className="mr-2 h-5 w-5" />
                      </Button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Text */}

          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-[#cfdad4]" />

            <p className="text-center text-xs text-[#7b8781]">
              قماش شیخ الاسلامی
            </p>

            <div className="h-px w-8 bg-[#cfdad4]" />
          </div>
        </div>
      </div>
    </main>
  );
}