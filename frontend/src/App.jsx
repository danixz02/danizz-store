import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Header } from "./components/Header/Header.jsx";
import { Banner } from "./components/Banner/Banner.jsx";
import { Footer } from "./components/Footer/Footer.jsx";
import { ProductSection } from "./components/ProductSection/ProductSection.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute.jsx";
import { DetailsProduct } from "./Pages/DetailsProduct.jsx";
import { Login } from "./Pages/Login.jsx";
import { AdminPanel } from "./Pages/AdminPanel.jsx";
import "./App.css";

function Home() {
  return (
    <>
      <Banner />
      <ProductSection />
    </>
  );
}

function StoreLayout() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/produto/:id" element={<DetailsProduct />} />
      </Routes>
      <Footer />
    </>
  );
}

function AppRoutes() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  if (isAdminRoute) {
    return (
      <Routes>
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
    );
  }

  return <StoreLayout />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
