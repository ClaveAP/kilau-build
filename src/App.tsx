import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
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
import Login from "./pages/admin/auth/Login";
import Beranda from "./pages/admin/dashboard/Beranda";
import Statistik from "./pages/admin/dashboard/Statistik";
import Testimoni from "./pages/admin/dashboard/Testimoni";
import FAQ from "./pages/admin/dashboard/FAQ";
import AdminPortofolio from "./pages/admin/dashboard/Portofolio";
import { StatistikProvider } from "./contexts/StatistikContext";
import { TestimoniProvider } from "./contexts/TestimoniContext";
import { KontakProvider } from "./contexts/KontakContext";
import { FAQProvider } from "./contexts/FAQContext";
import { SurveyProvider } from "./contexts/SurveyKalenderContext";
import { PortofolioProvider } from "./contexts/PortofolioContext";
import { MediaSosialProvider } from "./contexts/MediaSosialContext";
import { BerandaPortofolioProvider } from "./contexts/BerandaPortofolioContext";
import KontakAdmin from "./pages/admin/dashboard/KontakAdmin";
import MediaSosialAdmin from "./pages/admin/dashboard/MediaSosialAdmin";
import ChangePassword from "./pages/admin/dashboard/ChangePassword";

// 1. Buat Layout Khusus Public (Ada Navbar & Footer)
const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

// 2. Buat Layout Khusus Admin
const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollTop />
      <div className="min-h-screen">
        <StatistikProvider>
          <TestimoniProvider>
            <KontakProvider>
              <FAQProvider>
                <SurveyProvider>
                  <PortofolioProvider>
                    <MediaSosialProvider>
                      <BerandaPortofolioProvider>
                        <Routes>
                          {/* ========================================= */}
                          {/* GROUP 1: PUBLIC ROUTES (Pakai PublicLayout) */}
                          {/* ========================================= */}
                          <Route element={<PublicLayout />}>
                            <Route path="/" element={<Home />} />
                            <Route
                              path="/tentang-kami"
                              element={<TentangKami />}
                            />
                            <Route
                              path="/layanan-kami"
                              element={<LayananKami />}
                            />
                            <Route
                              path="/portofolio"
                              element={<Portofolio />}
                            />
                            <Route
                              path="/konsultasi-booking"
                              element={<KonsultasiBooking />}
                            />
                            <Route
                              path="/media-sosial"
                              element={<MediaSosial />}
                            />
                            <Route path="/kontak" element={<Kontak />} />
                          </Route>

                          {/* ========================================= */}
                          {/* GROUP 2: AUTH ROUTES (Tanpa Layout)       */}
                          {/* ========================================= */}
                          <Route path="/login" element={<Login />} />

                          {/* ========================================= */}
                          {/* GROUP 3: ADMIN ROUTES (Pakai AdminLayout) */}
                          {/* ========================================= */}
                          <Route path="/admin" element={<AdminLayout />}>
                            <Route
                              index
                              element={<Navigate to="dashboard" replace />}
                            />

                            {/* Child Routes */}
                            <Route path="dashboard" element={<Beranda />} />
                            <Route
                              path="change-password"
                              element={<ChangePassword />}
                            />
                            <Route path="statistik" element={<Statistik />} />
                            <Route
                              path="portofolio"
                              element={<AdminPortofolio />}
                            />
                            <Route path="testimoni" element={<Testimoni />} />
                            <Route path="kontak" element={<KontakAdmin />} />
                            <Route path="faq" element={<FAQ />} />
                            <Route
                              path="media-sosial"
                              element={<MediaSosialAdmin />}
                            />
                          </Route>
                        </Routes>
                      </BerandaPortofolioProvider>
                    </MediaSosialProvider>
                  </PortofolioProvider>
                </SurveyProvider>
              </FAQProvider>
            </KontakProvider>
          </TestimoniProvider>
        </StatistikProvider>
      </div>
    </Router>
  );
}

export default App;
