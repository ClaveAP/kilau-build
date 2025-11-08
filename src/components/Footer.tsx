import React from "react";
import logo from "../assets/logo.png";
// 🔽 1. AKU TAMBAHIN INI 🔽
//    Biar link-nya nggak nge-refresh halaman
import { Link } from "react-router-dom";

const SocialIcon: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#0066AE] hover:bg-gray-100 transition-colors"
    >
      {children}
    </a>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0066AE] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Left Column - Logo & Description */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-4 mb-6">
              {/* Logo with white background */}
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center p-3">
                <img src={logo} alt="logo-kilaubuild" className="w-18 h-14 " />
              </div>
              <span
                className="text-3xl font-bold text-white"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                Kilau Build
              </span>
            </Link>

            <p
              className="text-base leading-relaxed mb-6"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Kilau Build adalah penyedia layanan konstruksi profesional untuk
              rumah, kantor, dan proyek komersial.
            </p>

            {/* Social Media Icons */}
            <div className="flex gap-4">
              {/* Facebook */}
              <SocialIcon href="https://www.facebook.com/profile.php?id=61564503036667">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </SocialIcon>

              {/* Instagram */}
              <SocialIcon href="https://instagram.com/kilaubuild">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.646-.07-4.85s.012-3.584.07-4.85c.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </SocialIcon>

              {/* TikTok - FIXED ICON */}
              <SocialIcon href="https://tiktok.com/@buildkilau">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </SocialIcon>

              {/* Twitter/X */}
              <SocialIcon href="https://x.com/KilauBuild">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153zm-1.613 19.548h2.039L6.482 3.239H4.298l12.99 17.462z" />
                </svg>
              </SocialIcon>

              {/* YouTube */}
              <SocialIcon href="https://youtube.com/@KilauBuild">
                <svg
                  className="w-7 h-7"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </SocialIcon>
            </div>
          </div>

          {/* Middle Column - Company */}
          <div className="md:col-span-1">
            <h3
              className="text-2xl font-bold text-white mb-6"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              Company
            </h3>
            <ul
              className="space-y-4"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {/* 🔽 2. REVISI <a> JADI <Link> 🔽 */}
              <li>
                <Link
                  to="/tentang-kami"
                  className="text-white hover:text-gray-200 transition-colors text-base"
                >
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  to="/layanan-kami"
                  className="text-white hover:text-gray-200 transition-colors text-base"
                >
                  Layanan Kami
                </Link>
              </li>
              <li>
                <Link
                  to="/portofolio"
                  className="text-white hover:text-gray-200 transition-colors text-base"
                >
                  Portofolio
                </Link>
              </li>
              <li>
                <Link
                  to="/konsultasi-booking"
                  className="text-white hover:text-gray-200 transition-colors text-base"
                >
                  Konsultasi & Booking
                </Link>
              </li>
              <li>
                <Link
                  to="/media-sosial"
                  className="text-white hover:text-gray-200 transition-colors text-base"
                >
                  Media Sosial
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Column - Contact */}
          <div className="md:col-span-1">
            <h3
              className="text-2xl font-bold text-white mb-6"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              Contact
            </h3>
            <ul
              className="space-y-4"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <li>
                <a
                  href="tel:+6287776360795"
                  className="text-white hover:text-gray-200 transition-colors text-base"
                >
                  +62 877-7636-0795
                </a>
              </li>
              <li>
                <a
                  href="mailto:kilaubuild@gmail.com"
                  className="text-white hover:text-gray-200 transition-colors text-base"
                >
                  kilaubuild@gmail.com
                </a>
              </li>
              <li className="leading-relaxed text-white text-base">
                Jl. Raya Citayam No.34, RT./Rw.001/004, Pd. Jaya, Kec. Cipayung,
                Kota Depok, Jawa Barat 16444
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        {/* 🔽 REVISI: Garisnya dibikin lebih terang (putih/30) 🔽 */}
        <hr className="my-8 border-t border-white/30" />

        {/* Copyright */}
        <div className="text-center">
          <p
            className="text-base text-white"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Copyright © 2025 Kilau Build. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
