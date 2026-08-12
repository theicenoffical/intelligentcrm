import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import Product from "@/pages/Product";
import Features from "@/pages/Features";
import Industries from "@/pages/Industries";
import IndustryDetail from "@/pages/IndustryDetail";
import Solutions from "@/pages/Solutions";
import PersonaDetail from "@/pages/PersonaDetail";
import Pricing from "@/pages/Pricing";
import Resources, { Blog, BlogPost, CaseStudies } from "@/pages/Resources";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import BookDemo from "@/pages/BookDemo";
import Partners from "@/pages/Partners";
import Developers from "@/pages/Developers";
import Security from "@/pages/Security";
import { Privacy, Terms } from "@/pages/Legal";
import NotFound from "@/pages/NotFound";
import Admin from "@/pages/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/features" element={<Features />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/industries/:slug" element={<IndustryDetail />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/solutions/:slug" element={<PersonaDetail />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/blog" element={<Blog />} />
          <Route path="/resources/blog/:slug" element={<BlogPost />} />
          <Route path="/resources/case-studies" element={<CaseStudies />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book-demo" element={<BookDemo />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/security" element={<Security />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
