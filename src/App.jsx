import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import NProgress from "nprogress";
import About from "./NewComponent/body/appp/About";

import Navbar from "./NewComponent/nav/Navbar";
import Footer from "./NewComponent/footer/Footer";
import Articles from "./NewComponent/body/appp/Articles";
import BodyAll from "./NewComponent/body/BodyAll";
import Contact from "./NewComponent/body/appp/Contact";

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

function AppContent() {
  return (
    <>
      <PageTransition />

      <Navbar />

      <Routes>
        <Route path="/" element={<BodyAll />} />

                <Route path="/articles" element={<Articles />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}