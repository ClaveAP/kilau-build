import React, { useState, useEffect } from "react";
import { statsData } from "../../mocks/stats.mock";

const StatsTentangKami: React.FC = () => {
  const [hasStartedCount, setHasStartedCount] = useState(false);

  useEffect(() => {
    setHasStartedCount(true);
  }, []);

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

  return (
    <div className="relative z-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="flex justify-center items-center flex-wrap gap-10 sm:gap-16 text-center">
          {statsData.map((stat) => {
            const targetValue = parseInt(stat.value.replace(/\D/g, ""), 10);
            const count = useCountUp(targetValue);

            return (
              <div
                key={stat.id}
                className="flex flex-col items-center justify-center min-w-[200px]"
              >
                <h4
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#005592] mb-3"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  {count}
                  {stat.value.replace(/[0-9]/g, "")}
                </h4>
                <p
                  className="text-sm sm:text-base lg:text-lg text-gray-800"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StatsTentangKami;
