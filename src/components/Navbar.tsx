import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "../assets/logo.png"; // Impor logo sebagai gambar

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Tentang Kami", path: "/tentang-kami" },
    { name: "Layanan Kami", path: "/layanan-kami" },
    { name: "Portofolio", path: "/portofolio" },
    { name: "Konsultasi & Booking", path: "/konsultasi-booking" },
    { name: "Media Sosial", path: "/media-sosial" },
    { name: "Kontak", path: "/kontak" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={Logo} alt="Kilau Build Logo" className="w-14 h-14 mr-3" />
            <span
              className="text-2xl font-bold text-[#0066AE]"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              Kilau Build
            </span>
          </Link>

          {/* Desktop Navigation */}
          {/* 🔽 REVISI: 'md:flex' diubah jadi 'lg:flex' 🔽 */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm transition-colors duration-200 ${
                  isActive(item.path)
                    ? "text-[#66B2E0]"
                    : "text-[#0066AE] hover:text-[#66B2E0]"
                }`}
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          {/* 🔽 REVISI: 'md:hidden' diubah jadi 'lg:hidden' 🔽 */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-[#0066AE] hover:text-[#66B2E0] transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {/* 🔽 REVISI: 'md:hidden' diubah jadi 'lg:hidden' 🔽 */}
      <div
        className={`lg:hidden grid transition-[grid-template-rows] duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 pt-2 pb-4 space-y-3 bg-white shadow-lg">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block py-2 transition-colors duration-200 ${
                  isActive(item.path)
                    ? "text-[#66B2E0]"
                    : "text-[#0066AE] hover:text-[#66B2E0]"
                }`}
                style={{ fontFamily: "Inter, sans-serif" }}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/kontak"
              className="block text-center bg-[#66B2E0] text-white px-6 py-2 rounded-full hover:bg-[#0066AE] transition-colors duration-200"
              style={{ fontFamily: "Inter, sans-serif" }}
              onClick={() => setIsOpen(false)}
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
