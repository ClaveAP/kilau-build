import React, { useEffect, useRef, useState } from "react";
import { statsData } from "../../mocks/about.mock";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation, useInView, easeOut } from "framer-motion";
import type { Variants } from "framer-motion"; // ✅ Type-only import (fix TS error)

const AboutSection: React.FC = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const controls = useAnimation();
  const [hasStartedCount, setHasStartedCount] = useState(false);

  // ✅ Mulai animasi dan count-up hanya saat elemen masuk viewport
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
      setHasStartedCount(true);
    }
  }, [isInView, controls]);

  // ✅ Count-up logic (stabil)
  const useCountUp = (targetValue: number, duration = 1500) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!hasStartedCount) return;

      let start = 0;
      const increment = targetValue / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= targetValue) {
          setCount(targetValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }, [hasStartedCount, targetValue, duration]);

    return count;
  };

  // ✅ Framer Motion Variants tanpa error
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: easeOut }, // FIX: pakai easing bawaan framer-motion
    },
  };

  const handleNavigate = () => {
    navigate("/tentang-kami");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      className="py-12 sm:py-16 lg:py-20 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate={controls}
          className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8 sm:mb-12"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          Tentang Kami
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={controls}
            transition={{ delay: 0.2 }}
            className="order-2 max-md:order-1"
          >
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000"
              alt="Construction Team"
              className="w-full h-[300px] sm:h-[400px] object-cover rounded-lg shadow-lg"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={controls}
            transition={{ delay: 0.4 }}
            className="order-1 md:order-2"
          >
            <h3
              className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              Menyediakan{" "}
              <span className="text-[#005592]">
                Layanan Konstruksi & Interior
              </span>{" "}
              Berkualitas
            </h3>

            <p
              className="text-sm sm:text-base text-gray-700 mb-6 leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Kilau Build hadir untuk memberikan solusi konstruksi dan interior
              yang nyaman, modern, dan fungsional. Kami selalu mengutamakan
              transparansi, ketepatan waktu, dan kualitas terbaik di setiap
              proyek.
            </p>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={controls}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-4 mb-6"
            >
              {statsData.map((stat) => {
                const targetValue = parseInt(stat.value.replace(/\D/g, ""), 10);
                const count = useCountUp(targetValue);

                return (
                  <motion.div
                    key={stat.id}
                    className="text-center transition-transform duration-700 ease-out transform hover:scale-105"
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#005592]">
                      {count}
                      {stat.value.replace(/[0-9]/g, "")}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                      {stat.label}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Button */}
            <motion.button
              variants={fadeUp}
              initial="hidden"
              animate={controls}
              transition={{ delay: 0.8 }}
              onClick={handleNavigate}
              className="bg-[#005592] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-medium hover:bg-[#004d82] transition-colors duration-300"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Read More
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
