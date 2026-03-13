import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import AttendancePage from "./pages/AttendancePage";
import LeavePage from "./pages/LeavePage";
import NotificationsPage from "./pages/NotificationsPage";
import ProfilePage from "./pages/ProfilePage";
import ManagerPage from "./pages/ManagerPage";
import NotFound from "./pages/NotFound";
import { BottomNav } from "./components/BottomNav";
import { useLocation } from "react-router-dom";

const queryClient = new QueryClient();

function AppLayout() {
  const location = useLocation();
  const showNav = location.pathname !== "/" && location.pathname !== "/login";

  return (
    <div className="mx-auto max-w-md min-h-screen relative">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/leave" element={<LeavePage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/manager" element={<ManagerPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {showNav && <BottomNav />}
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner position="top-center" toastOptions={{ className: "bg-card text-foreground border-border" }} />
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
