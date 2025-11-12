import React from "react";
import HeroKonsultasiBooking from "../components/konsultasi-booking/HeroKonsultasiBooking";
import BookingKalendar from "../components/konsultasi-booking/BookingKalendar";

const KonsultasiBooking: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen">
      <HeroKonsultasiBooking />
      <BookingKalendar />
    </div>
  );
};

export default KonsultasiBooking;
