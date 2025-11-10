import React from "react";
import ownerImage from "../../assets/owner.jpeg";

const SocialIcon: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-[#005592] hover:bg-gray-100 transition-colors shadow-md"
    >
      {children}
    </a>
  );
};

const OwnerSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8 lg:gap-12">
          {/* Owner Image */}
          <div className="shrink-0">
            <div className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden shadow-lg">
              <img
                src={ownerImage}
                alt="Pak Bagus - Owner Kilau Build"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            {/* Name */}
            <h3
              className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-gray-900 mb-2"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Pak Bagus
            </h3>

            {/* Title */}
            <p
              className="text-base sm:text-lg lg:text-xl font-medium text-[#005592] mb-4"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              Owner Kilau Build
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
              {/* LinkedIn */}
              <SocialIcon href="https://linkedin.com">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
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
            </div>

            {/* Description */}
            <p
              className="text-sm sm:text-base lg:text-[17px] text-gray-800 leading-relaxed text-justify max-w-2xl"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Berbekal pengalaman lebih dari 10 tahun di bidang konstruksi dan
              desain arsitektur, Pak Bagus memimpin Kilau Build dengan fokus
              terhadap kualitas bangunan, ketepatan waktu, serta pelayanan
              transparan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OwnerSection;
