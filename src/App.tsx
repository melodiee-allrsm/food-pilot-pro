import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Login from "./pages/Login.tsx";
import StudentDashboard from "./pages/StudentDashboard.tsx";
import KitchenDashboard from "./pages/KitchenDashboard.tsx";
import ServerDashboard from "./pages/ServerDashboard.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/orders" element={<StudentDashboard />} />
          <Route path="/student/qr" element={<StudentDashboard />} />
          <Route path="/student/antiwaste" element={<StudentDashboard />} />
          <Route path="/server" element={<ServerDashboard />} />
          <Route path="/server/orders" element={<ServerDashboard />} />
          <Route path="/server/scan" element={<ServerDashboard />} />
          <Route path="/server/billing" element={<ServerDashboard />} />
          <Route path="/kitchen" element={<KitchenDashboard />} />
          <Route path="/kitchen/menu" element={<KitchenDashboard />} />
          <Route path="/kitchen/alerts" element={<KitchenDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/analytics" element={<AdminDashboard />} />
          <Route path="/admin/inventory" element={<AdminDashboard />} />
          <Route path="/admin/staff" element={<AdminDashboard />} />
          <Route path="/admin/antiwaste" element={<AdminDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
