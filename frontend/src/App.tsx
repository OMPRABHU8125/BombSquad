import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext"; // ✅ ADD THIS
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Scan from "./pages/Scan";
import Result from "./pages/Result";
import Remedies from "./pages/Remedies";
import History from "./pages/History";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import AuthCallback from "./pages/AuthCallback";
import AuthGuard from "@/guards/AuthGuard";
import Unauthorized from "./pages/Unauthorized";
import { isPWA } from "@/lib/utils/isPWA";

if (window.matchMedia('(display-mode: standalone)').matches) {
  localStorage.setItem("isPWA", "true");
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider> {/* ✅ WRAP WITH AuthProvider */}
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* PUBLIC ROUTES */}
              <Route path="/" element={<Splash />} />
              <Route path="/login" element={<Login />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/unauthorized" element={<Unauthorized />} />

              {/* PROTECTED ROUTES */}
              <Route element={<AuthGuard />}>
                <Route path="/home" element={<Home />} />
                <Route path="/scan" element={<Scan />} />
                <Route path="/result" element={<Result />} />
                <Route path="/remedies" element={<Remedies />} />
                <Route path="/history" element={<History />} />
                <Route path="/profile" element={<Profile />} />

                {/* placeholders */}
                <Route path="/library" element={<Home />} />
                <Route path="/crops" element={<Home />} />
                <Route path="/expert" element={<Home />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider> {/* ✅ CLOSE AuthProvider */}
  </QueryClientProvider>
);

export default App;