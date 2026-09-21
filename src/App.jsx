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
import ProductsPage from "./NewComponent/body/card/ProductsPage";
// import ProductCategories from "./NewComponent/body/card/ProductCategories";

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
// App Content
// ========================================

function AppContent() {
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  return (
    <>
      <PageTransition />

      {/* ========================================
          Login Page
          بدون Navbar و Footer
      ======================================== */}

      {isLoginPage ? (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      ) : (
        <>
          {/* ========================================
              Navbar
          ======================================== */}

          <Navbar />

          {/* ========================================
              Main Routes
          ======================================== */}

       <Routes>
  <Route
    path="/products/:type"
    element={<ProductsPage />}
  />

  {/* <Route
    path="/products/:type/:id"
    element={<ProductCategories />}
  /> */}

  <Route path="/" element={<BodyAll />} />

  <Route path="/articles" element={<Articles />} />

  <Route path="/about" element={<About />} />

  <Route path="/contact" element={<Contact />} />
</Routes>
          {/* ========================================
              Footer
          ======================================== */}

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
