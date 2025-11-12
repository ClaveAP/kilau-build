import React, { useState, useEffect } from "react";

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

const BookingKalendar: React.FC = () => {
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
    script.async = true;
    script.onload = () => initializeGapiClient();
    script.onerror = () => {
      setError("Gagal memuat script Google. Cek koneksi atau adblocker.");
      setIsLoading(false);
    };

    document.body.appendChild(script);

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

  // --- 5. Handle WhatsApp Booking ---
  const handleJadwalkanSurvey = () => {
    const message = "Hai admin Kilau, saya mau booking jadwal survey!";
    const whatsappUrl = `https://wa.me/6287776360795?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  // --- 6. Render UI ---
  const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const days = getDaysInMonth(currentMonth);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* LEFT - Calendar */}
          <div className="flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="bg-white border-2 border-gray-200 rounded-3xl shadow-lg p-6 sm:p-8 w-full max-w-md">
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
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Previous month"
                >
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <h3
                  className="text-lg sm:text-xl font-semibold text-gray-800"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  {currentMonth.toLocaleDateString("en-US", {
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
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Next month"
                >
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              {/* Weekdays */}
              <div className="grid grid-cols-7 gap-2 mb-3">
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs sm:text-sm font-medium text-gray-500 py-2"
                    style={{ fontFamily: "Inter, sans-serif" }}
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
                <div className="grid grid-cols-7 gap-2">
                  {days.map((day, i) => {
                    const booked = isDateBooked(day);
                    const today = isToday(day);
                    return (
                      <button
                        key={i}
                        onClick={() => day && !booked && setSelectedDate(day)}
                        disabled={!day || booked}
                        className={`aspect-square rounded-lg text-sm sm:text-base flex items-center justify-center transition-all font-medium ${
                          !day
                            ? "invisible"
                            : booked
                            ? "bg-gray-100 text-gray-300 line-through cursor-not-allowed"
                            : today
                            ? "bg-[#005592] text-white font-bold shadow-md"
                            : "text-gray-700 hover:bg-blue-50 hover:text-[#005592]"
                        } ${
                          selectedDate === day && !booked && !today
                            ? "ring-2 ring-[#005592] bg-blue-50"
                            : ""
                        }`}
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT - Information */}
          <div className="order-1 lg:order-2">
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#005592] mb-6 sm:mb-8"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              Kalender Survey
            </h2>

            <div className="space-y-4 sm:space-y-5 mb-8 sm:mb-10">
              <div className="flex items-start gap-3">
                <span
                  className="text-lg sm:text-xl font-bold text-gray-900 shrink-0"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  1.
                </span>
                <p
                  className="text-base sm:text-lg text-gray-700 leading-relaxed"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Warna abu-abu (-) sudah terisi
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span
                  className="text-lg sm:text-xl font-bold text-gray-900 shrink-0"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  2.
                </span>
                <p
                  className="text-base sm:text-lg text-gray-700 leading-relaxed"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Pilih tanggal yang tersedia
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span
                  className="text-lg sm:text-xl font-bold text-gray-900 shrink-0"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  3.
                </span>
                <p
                  className="text-base sm:text-lg text-gray-700 leading-relaxed"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Konfirmasi tanggal pilihanmu, dengan mengklik tombol dibawah
                  ini
                </p>
              </div>
            </div>

            {/* Button Jadwalkan Survey */}
            <button
              onClick={handleJadwalkanSurvey}
              className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-[#005592] text-white text-base sm:text-lg font-bold rounded-full hover:bg-[#004577] transition-all duration-300 shadow-lg hover:shadow-xl"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              Jadwalkan Survey
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingKalendar;
