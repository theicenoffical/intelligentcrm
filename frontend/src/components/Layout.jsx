import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Lenis from "lenis";
import axios from "axios";
import { Navbar, Footer } from "./Navbar";
import { Toaster } from "./ui/sonner";
import { API } from "../lib/api";

export const Layout = () => {
  const { pathname } = useLocation();
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenisRef.current = lenis;
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    axios.post(`${API}/track`, { path: pathname }).catch(() => {});
  }, [pathname]);

  return (
    <div className="noise-overlay min-h-screen bg-[#FAFAF9]">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toaster theme="light" position="bottom-right" />
    </div>
  );
};
