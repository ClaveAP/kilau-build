import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollTop from "./components/ScrollTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import TentangKami from "./pages/TentangKami";
import LayananKami from "./pages/LayananKami";
import Portofolio from "./pages/Portofolio";
import KonsultasiBooking from "./pages/KonsultasiBooking";
import MediaSosial from "./pages/MediaSosial";
import Kontak from "./pages/Kontak";

function App() {
  return (
    <Router>
      <ScrollTop />
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tentang-kami" element={<TentangKami />} />
          <Route path="/layanan-kami" element={<LayananKami />} />
          <Route path="/portofolio" element={<Portofolio />} />
          <Route path="/konsultasi-booking" element={<KonsultasiBooking />} />
          <Route path="/media-sosial" element={<MediaSosial />} />
          <Route path="/kontak" element={<Kontak />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
