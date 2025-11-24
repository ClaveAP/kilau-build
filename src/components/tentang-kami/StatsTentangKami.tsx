import React, { useState, useEffect } from "react";
import axios from "axios";

interface StatItem {
  id: number;
  label: string;
  value: string;
}

const API_URL = import.meta.env.VITE_API_URL;
const StatsTentangKami: React.FC = () => {
  const [hasStartedCount, setHasStartedCount] = useState(false);

  const [statsData, setStatsData] = useState<StatItem[]>([
    { id: 1, label: "Tahun Pengalaman", value: "0+" },
    { id: 2, label: "Proyek Selesai", value: "0+" },
    { id: 3, label: "Klien Puas", value: "0+" },
    { id: 4, label: "Kota", value: "0+" },
  ]);

  useEffect(() => {
    setHasStartedCount(true);

    const fetchStats = async () => {
      try {
        const response = await axios.get(`${API_URL}/statistic`);
        if (response.data.success && response.data.data.length > 0) {
          const data = response.data.data[0];
          setStatsData([
            { id: 1, label: "Tahun Pengalaman", value: data.tahun_pengalaman },
            { id: 2, label: "Proyek Selesai", value: data.proyek_selesai },
            { id: 3, label: "Klien Puas", value: data.klien_puas },
            { id: 4, label: "Kota", value: data.sebaran_kota },
          ]);
        }
      } catch (error) {
        console.error("Gagal load statistik:", error);
      }
    };
    fetchStats();
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

  const StatItemDisplay = ({
    value,
    label,
  }: {
    value: string;
    label: string;
  }) => {
    const numericValue = parseInt(value.replace(/\D/g, ""), 10) || 0;
    const suffix = value.replace(/[0-9]/g, "");
    const count = useCountUp(numericValue);

    return (
      <div className="flex flex-col items-center justify-center min-w-[200px]">
        <h4
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#005592] mb-3"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          {count}
          {suffix}
        </h4>
        <p
          className="text-sm sm:text-base lg:text-lg text-gray-800"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {label}
        </p>
      </div>
    );
  };

  return (
    <div className="relative z-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="flex justify-center items-center flex-wrap gap-10 sm:gap-16 text-center">
          {statsData.map((stat) => (
            <StatItemDisplay
              key={stat.id}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsTentangKami;
