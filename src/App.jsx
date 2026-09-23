import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import NProgress from "nprogress";

import About from "./NewComponent/body/appp/About";
import Navbar from "./NewComponent/nav/Navbar";
import Footer from "./NewComponent/footer/Footer";
import Articles from "./NewComponent/body/appp/Articles";
import BodyAll from "./NewComponent/body/BodyAll";
import Contact from "./NewComponent/body/appp/Contact";
import Login from "./NewComponent/pagee/Login";

import ArticleDetail from "./NewComponent/body/appp/ArticleDetail";

import ProductsOverview from "./NewComponent/body/card/ProductsOverview";
import ProductsPage from "./NewComponent/body/card/ProductsPage";
import CategoryProductsPage from "./NewComponent/body/card/CategoryProductsPage";
import ProductDetail from "./NewComponent/body/card/ProductDetail";

// ========================================
// Page Transition
// ========================================

function PageTransition() {
  const location = useLocation();

  useEffect(() => {
    NProgress.configure({
      showSpinner: false,
      trickle: false,
    });

    NProgress.start();

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        NProgress.done();
      });
    });
  }, [location.pathname]);

  return null;
}

// ========================================
// Scroll To Top
// ========================================

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}

// ========================================
// App Content
// ========================================

function AppContent() {
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  return (
    <>
      <PageTransition />

      {/* با هر تغییر صفحه، صفحه از بالا شروع می‌شود */}
      <ScrollToTop />

      {isLoginPage ? (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      ) : (
        <>
          <Navbar />

          <Routes>
            {/* ========================================
                صفحه اصلی
            ======================================== */}

            <Route
              path="/"
              element={<BodyAll />}
            />

            {/* ========================================
                مقالات
            ======================================== */}

            <Route
              path="/articles"
              element={<Articles />}
            />

            <Route
              path="/articles/:id"
              element={<ArticleDetail />}
            />

            {/* ========================================
                درباره ما
            ======================================== */}

            <Route
              path="/about"
              element={<About />}
            />

            {/* ========================================
                تماس با ما
            ======================================== */}

            <Route
              path="/contact"
              element={<Contact />}
            />

            {/* ========================================
                محصولات
            ======================================== */}

            <Route
              path="/products"
              element={<ProductsOverview />}
            />

            <Route
              path="/products/:type"
              element={<ProductsPage />}
            />

            <Route
              path="/products/:type/:categoryId"
              element={<CategoryProductsPage />}
            />

            <Route
              path="/product/:id"
              element={<ProductDetail />}
            />
          </Routes>

          <Footer />
        </>
      )}
    </>
  );
}

// ========================================
// App
// ========================================

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}