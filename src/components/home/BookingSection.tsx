import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Tambah ini

// --- Konfigurasi API Google ---
declare global {
  interface Window {
    gapi: any;
  }
}

const API_KEY = "AIzaSyCJSR34KvGws7nGrk06xkkDA_JAnmpAbm0";
const CALENDAR_ID =
  "1d18a76541f60412799a65fa6410e1a2c4f089dcb97fb648ab2f94ac14d69903@group.calendar.google.com";
const DISCOVERY_DOC =
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";

const BookingSection: React.FC = () => {
  const navigate = useNavigate(); // ✅ Inisialisasi navigasi
  const [events, setEvents] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGapiInitialized, setIsGapiInitialized] = useState(false);

  // --- 1. Load Script Google API ---
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.async = true; // optional, biar non-blocking
    script.onload = () => initializeGapiClient();
    script.onerror = () => {
      setError("Gagal memuat script Google. Cek koneksi atau adblocker.");
      setIsLoading(false);
    };

    document.body.appendChild(script);

    // ✅ return harus fungsi cleanup (bukan HTML element)
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // --- 2. Inisialisasi GAPI ---
  const initializeGapiClient = () => {
    if (!window.gapi) {
      setError("GAPI tidak ditemukan. Coba refresh halaman.");
      setIsLoading(false);
      return;
    }

    window.gapi.load("client", async () => {
      try {
        await window.gapi.client.init({
          apiKey: API_KEY,
          discoveryDocs: [DISCOVERY_DOC],
        });
        setIsGapiInitialized(true);
      } catch (err) {
        console.error("Error initializing GAPI:", err);
        setError("Gagal menginisialisasi Google API");
        setIsLoading(false);
      }
    });
  };

  // --- 3. Muat Event Kalender ---
  useEffect(() => {
    if (!isGapiInitialized) return;

    const loadCalendarEvents = async (month: Date) => {
      setIsLoading(true);
      setError(null);

      if (!window.gapi?.client?.calendar) {
        setError("Client Google Calendar tidak siap.");
        setIsLoading(false);
        return;
      }

      try {
        const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
        const endOfMonth = new Date(
          month.getFullYear(),
          month.getMonth() + 1,
          0
        );

        const response = await window.gapi.client.calendar.events.list({
          calendarId: CALENDAR_ID,
          timeMin: startOfMonth.toISOString(),
          timeMax: endOfMonth.toISOString(),
          showDeleted: false,
          singleEvents: true,
          orderBy: "startTime",
        });

        setEvents(response.result.items || []);
      } catch (err: any) {
        console.error("Error loading events:", err);
        setError(
          "Gagal memuat event kalender. Pastikan kalender publik & API key benar."
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadCalendarEvents(currentMonth);
  }, [isGapiInitialized, currentMonth]);

  // --- 4. Helper Fungsi ---
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startOffset = (firstDay.getDay() + 6) % 7;

    const days: (number | null)[] = [];
    for (let i = 0; i < startOffset; i++) days.push(null);
    for (let day = 1; day <= daysInMonth; day++) days.push(day);
    return days;
  };

  const isDateBooked = (day: number | null): boolean => {
    if (!day) return false;
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    return events.some((e) => {
      const eventDate = new Date(e.start.date || e.start.dateTime);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const isToday = (day: number | null) => {
    if (!day) return false;
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  // --- 5. Navigasi ---
  const handleNavigate = () => {
    navigate("/konsultasi-booking"); // ✅ Arahkan ke halaman KonsultasiBooking
    window.scrollTo({ top: 0, behavior: "smooth" }); // ✅ Scroll ke atas
  };

  // --- 6. Render UI ---
  const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const days = getDaysInMonth(currentMonth);

  return (
    <section
      className="relative py-16 sm:py-20 lg:py-24 overflow-hidden"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2000")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(0, 76, 132, 0.95), rgba(0, 102, 174, 0.85))",
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* LEFT CONTENT */}
          <div className="text-white">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              Konsultasi & Booking Tanggal Survey
            </h2>
            <p
              className="text-lg sm:text-xl mb-8 leading-relaxed font-light"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Atur tanggal survey dan konsultasikan rencana proyek Anda bersama
              tim kami.
            </p>
            <button
              onClick={handleNavigate} // ✅ Navigasi
              className="bg-white text-[#005592] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Read More
            </button>
          </div>

          {/* RIGHT CALENDAR */}
          <div className="flex justify-center lg:justify-end">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() =>
                    setCurrentMonth(
                      new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth() - 1
                      )
                    )
                  }
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  ←
                </button>
                <h3 className="text-base font-medium text-gray-800">
                  {currentMonth.toLocaleDateString("id-ID", {
                    month: "long",
                    year: "numeric",
                  })}
                </h3>
                <button
                  onClick={() =>
                    setCurrentMonth(
                      new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth() + 1
                      )
                    )
                  }
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  →
                </button>
              </div>

              {/* Weekdays */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs font-medium text-gray-500 py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Loading / Error / Calendar */}
              {isLoading ? (
                <div className="text-center p-8 text-gray-500">
                  Memuat jadwal...
                </div>
              ) : error ? (
                <div className="text-center p-8 text-red-500 text-sm">
                  {error}
                </div>
              ) : (
                <div className="grid grid-cols-7 gap-1">
                  {days.map((day, i) => {
                    const booked = isDateBooked(day);
                    const today = isToday(day);
                    return (
                      <button
                        key={i}
                        onClick={() => day && !booked && setSelectedDate(day)}
                        disabled={!day || booked}
                        className={`aspect-square rounded-lg text-sm flex items-center justify-center transition-all ${
                          !day
                            ? "invisible"
                            : booked
                            ? "bg-gray-100 text-gray-300 line-through cursor-not-allowed"
                            : today
                            ? "bg-[#005592] text-white font-semibold"
                            : "text-gray-700 hover:bg-gray-50"
                        } ${
                          selectedDate === day && !booked && !today
                            ? "ring-2 ring-[#005592]"
                            : ""
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
