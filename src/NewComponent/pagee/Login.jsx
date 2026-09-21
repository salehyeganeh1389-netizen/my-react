import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

import {
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  Smartphone,
  Mail,
} from "lucide-react";

// =====================================================
// Validation
// =====================================================

const identifierSchema = z.object({
  identifier: z
    .string()
    .min(1, "شماره موبایل یا ایمیل را وارد کنید")
    .refine(
      (value) => {
        const isPhone = /^09\d{9}$/.test(value);
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

        return isPhone || isEmail;
      },
      {
        message: "شماره موبایل یا ایمیل معتبر وارد کنید",
      }
    ),
});

const passwordSchema = z.object({
  password: z
    .string()
    .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
});

// =====================================================
// Component
// =====================================================

export default function Login() {
  const navigate = useNavigate();

  const [step, setStep] = useState("identifier");

  const [identifier, setIdentifier] = useState("");

  const [isExistingUser, setIsExistingUser] = useState(false);

  const [otp, setOtp] = useState("");

  const [showPassword, setShowPassword] = useState(false);

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
  // Password Form
  // =====================================================

  const passwordForm = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
  } = passwordForm;

  // =====================================================
  // Step 1
  // =====================================================

  const onIdentifierSubmit = (data) => {
    setIdentifier(data.identifier);

    /*
      فعلاً فقط برای تست Frontend است.

      بعداً این قسمت با API واقعی جایگزین می‌شود.

      مثال:

      POST /api/auth/check-user
    */

    const existing =
      data.identifier.includes("0912") ||
      data.identifier.includes("test@");

    setIsExistingUser(existing);

    if (existing) {
      setStep("password");
    } else {
      setStep("otp");
    }
  };

  // =====================================================
  // Login
  // =====================================================

  const onPasswordSubmit = (data) => {
    console.log("Login:", {
      identifier,
      password: data.password,
    });

    alert("ورود با موفقیت انجام شد");
  };

  // =====================================================
  // OTP
  // =====================================================

  const handleOtpSubmit = (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      alert("کد ۶ رقمی را کامل وارد کنید");
      return;
    }

    console.log("OTP:", otp);

    /*
      بعداً اینجا API بررسی کد قرار می‌گیرد.
    */

    setStep("create-password");
  };

  // =====================================================
  // Create Account
  // =====================================================

  const handleCreatePassword = (data) => {
    console.log("Create account:", {
      identifier,
      password: data.password,
    });

    alert("حساب شما با موفقیت ایجاد شد");

    setStep("identifier");
    setIdentifier("");
    setOtp("");

    identifierForm.reset();
    passwordForm.reset();
  };

  // =====================================================
  // Back Inside Auth
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
  // Render
  // =====================================================

  return (
    <main
      dir="rtl"
      className="relative min-h-screen overflow-hidden bg-[#f5f3ee]"
    >
      {/* =================================================
          Background
      ================================================= */}

      <img
        src="/file_00000000d58c820da9bfbc1b74d4fefb.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* فقط برای خوانایی فرم */}
      <div className="absolute inset-0 bg-black/25" />

      {/* =================================================
          Back To Store
      ================================================= */}

      <button
        type="button"
        onClick={() => navigate(-1)}
        className="
          absolute
          right-5
          top-5
          z-20
          flex
          items-center
          gap-2
          rounded-full
          bg-white/95
          px-4
          py-2.5
          text-sm
          font-medium
          text-gray-800
          shadow-lg
          backdrop-blur-sm
          transition
          hover:bg-white
          sm:right-8
          sm:top-8
        "
      >
        بازگشت به فروشگاه
        <ArrowRight className="h-4 w-4" />
      </button>

      {/* =================================================
          Main Content
      ================================================= */}

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4 sm:p-6">
        <Card
          className="
            w-full
            max-w-md
            overflow-hidden
            border-0
            bg-white/95
            shadow-2xl
            backdrop-blur-md
          "
        >
          <CardContent className="p-6 sm:p-9">

            {/* =================================================
                STEP 1
            ================================================= */}

            {step === "identifier" && (
              <div className="space-y-7">

                <div className="text-center">

                  <div className="mb-5">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                      قماش شیخ الاسلامی
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                      ورود یا ایجاد حساب
                    </p>
                  </div>

                  <p className="mx-auto max-w-sm text-sm leading-6 text-gray-500">
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

                    <Label htmlFor="identifier">
                      شماره موبایل یا ایمیل
                    </Label>

                    <Input
                      id="identifier"
                      {...registerIdentifier("identifier")}
                      placeholder="09123456789 یا example@gmail.com"
                      className="h-12 bg-white text-left"
                      dir="ltr"
                      autoComplete="username"
                    />

                    {identifierErrors.identifier && (
                      <p className="text-sm text-red-500">
                        {identifierErrors.identifier.message}
                      </p>
                    )}

                  </div>

                  <Button
                    type="submit"
                    className="h-12 w-full text-base"
                  >
                    ادامه
                    <ArrowLeft className="mr-2 h-4 w-4" />
                  </Button>
                </form>

                <p className="text-center text-xs leading-5 text-gray-400">
                  با ادامه دادن، شرایط استفاده و حریم خصوصی
                  فروشگاه را می‌پذیرید.
                </p>

              </div>
            )}

            {/* =================================================
                STEP 2 - PASSWORD
            ================================================= */}

            {step === "password" && (
              <div className="space-y-7">

                <button
                  type="button"
                  onClick={handleStepBack}
                  className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-gray-500
                    transition
                    hover:text-gray-900
                  "
                >
                  <ArrowRight className="h-4 w-4" />
                  بازگشت
                </button>

                <div>

                  <div
                    className="
                      mb-5
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-full
                      bg-gray-100
                    "
                  >
                    {isPhone ? (
                      <Smartphone className="h-5 w-5 text-gray-700" />
                    ) : (
                      <Mail className="h-5 w-5 text-gray-700" />
                    )}
                  </div>

                  <h1 className="text-2xl font-bold text-gray-900">
                    ورود به حساب
                  </h1>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    رمز عبور حساب خود را وارد کنید.
                  </p>

                  <p
                    dir="ltr"
                    className="mt-2 text-sm font-medium text-gray-800"
                  >
                    {identifier}
                  </p>

                </div>

                <form
                  onSubmit={handlePasswordSubmit(
                    onPasswordSubmit
                  )}
                  className="space-y-5"
                >

                  <div className="space-y-2">

                    <Label htmlFor="password">
                      رمز عبور
                    </Label>

                    <div className="relative">

                      <Input
                        id="password"
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        {...registerPassword("password")}
                        placeholder="رمز عبور خود را وارد کنید"
                        className="h-12 bg-white pl-12"
                        autoComplete="current-password"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(
                            (prev) => !prev
                          )
                        }
                        className="
                          absolute
                          left-3
                          top-1/2
                          -translate-y-1/2
                          text-gray-400
                          transition
                          hover:text-gray-700
                        "
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>

                    </div>

                    {passwordErrors.password && (
                      <p className="text-sm text-red-500">
                        {passwordErrors.password.message}
                      </p>
                    )}

                  </div>

                  <div className="text-left">

                    <button
                      type="button"
                      className="
                        text-sm
                        text-gray-500
                        underline-offset-4
                        transition
                        hover:text-gray-900
                        hover:underline
                      "
                    >
                      رمز عبور را فراموش کرده‌اید؟
                    </button>

                  </div>

                  <Button
                    type="submit"
                    className="h-12 w-full text-base"
                  >
                    ورود
                  </Button>

                </form>

              </div>
            )}

            {/* =================================================
                STEP 3 - OTP
            ================================================= */}

            {step === "otp" && (
              <div className="space-y-7">

                <button
                  type="button"
                  onClick={handleStepBack}
                  className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-gray-500
                    transition
                    hover:text-gray-900
                  "
                >
                  <ArrowRight className="h-4 w-4" />
                  بازگشت
                </button>

                <div className="text-center">

                  <div
                    className="
                      mx-auto
                      mb-5
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-full
                      bg-gray-100
                    "
                  >
                    {isPhone ? (
                      <Smartphone className="h-6 w-6 text-gray-700" />
                    ) : (
                      <Mail className="h-6 w-6 text-gray-700" />
                    )}
                  </div>

                  <h1 className="text-2xl font-bold text-gray-900">
                    تأیید حساب
                  </h1>

                  <p className="mt-3 text-sm text-gray-500">
                    کد تأیید برای
                  </p>

                  <p
                    dir="ltr"
                    className="mt-1 text-sm font-medium text-gray-800"
                  >
                    {identifier}
                  </p>

                </div>

                <form
                  onSubmit={handleOtpSubmit}
                  className="space-y-5"
                >

                  <div className="space-y-2">

                    <Label htmlFor="otp">
                      کد تأیید
                    </Label>

                    <Input
                      id="otp"
                      value={otp}
                      onChange={(e) =>
                        setOtp(
                          e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 6)
                        )
                      }
                      placeholder="------"
                      inputMode="numeric"
                      maxLength={6}
                      className="
                        h-14
                        bg-white
                        text-center
                        text-2xl
                        tracking-[0.5em]
                      "
                      dir="ltr"
                      autoFocus
                    />

                  </div>

                  <Button
                    type="submit"
                    className="h-12 w-full text-base"
                  >
                    تأیید کد
                  </Button>

                  <button
                    type="button"
                    onClick={() =>
                      console.log(
                        `Send OTP to ${identifier}`
                      )
                    }
                    className="
                      w-full
                      text-center
                      text-sm
                      text-gray-500
                      transition
                      hover:text-gray-900
                    "
                  >
                    ارسال مجدد کد
                  </button>

                </form>

              </div>
            )}

            {/* =================================================
                STEP 4 - CREATE PASSWORD
            ================================================= */}

            {step === "create-password" && (
              <div className="space-y-7">

                <button
                  type="button"
                  onClick={handleStepBack}
                  className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-gray-500
                    transition
                    hover:text-gray-900
                  "
                >
                  <ArrowRight className="h-4 w-4" />
                  بازگشت
                </button>

                <div>

                  <div
                    className="
                      mb-5
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-full
                      bg-gray-100
                    "
                  >
                    {isPhone ? (
                      <Smartphone className="h-5 w-5 text-gray-700" />
                    ) : (
                      <Mail className="h-5 w-5 text-gray-700" />
                    )}
                  </div>

                  <h1 className="text-2xl font-bold text-gray-900">
                    ایجاد حساب
                  </h1>

                  <p className="mt-3 text-sm leading-6 text-gray-500">
                    حساب شما تأیید شد. یک رمز عبور برای
                    حساب خود انتخاب کنید.
                  </p>

                </div>

                <form
                  onSubmit={handlePasswordSubmit(
                    handleCreatePassword
                  )}
                  className="space-y-5"
                >

                  <div className="space-y-2">

                    <Label htmlFor="create-password">
                      رمز عبور جدید
                    </Label>

                    <div className="relative">

                      <Input
                        id="create-password"
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        {...registerPassword("password")}
                        placeholder="حداقل ۶ کاراکتر"
                        className="h-12 bg-white pl-12"
                        autoComplete="new-password"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(
                            (prev) => !prev
                          )
                        }
                        className="
                          absolute
                          left-3
                          top-1/2
                          -translate-y-1/2
                          text-gray-400
                          transition
                          hover:text-gray-700
                        "
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>

                    </div>

                    {passwordErrors.password && (
                      <p className="text-sm text-red-500">
                        {passwordErrors.password.message}
                      </p>
                    )}

                  </div>

                  <Button
                    type="submit"
                    className="h-12 w-full text-base"
                  >
                    ایجاد حساب
                  </Button>

                </form>

              </div>
            )}

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
