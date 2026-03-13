import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Phone, LogOut, ChevronRight, HelpCircle, Building2, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { currentUser } from "@/data/mockData";

export default function ProfilePage() {
  const navigate = useNavigate();

  const menuItems = [
    { icon: Building2, label: "Outlet", value: currentUser.outlet },
    { icon: Phone, label: "Telepon", value: currentUser.phone },
    { icon: Shield, label: "Keamanan", value: "" },
    { icon: HelpCircle, label: "Bantuan", value: "" },
  ];

  return (
    <div className="min-h-screen bg-background safe-bottom">
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/home")} className="touch-target flex items-center justify-center rounded-xl bg-card border border-border h-10 w-10">
            <ArrowLeft size={18} className="text-foreground" />
          </button>
          <h1 className="text-xl font-bold text-foreground">Profil</h1>
        </div>
      </div>

      {/* Avatar & Info */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="px-5 mb-6">
        <div className="flex items-center gap-4 rounded-xl gradient-card border border-border p-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full gradient-primary text-2xl font-bold text-primary-foreground">
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">{currentUser.name}</h2>
            <p className="text-sm text-muted-foreground">{currentUser.role}</p>
            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin size={12} /> {currentUser.outlet}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Menu */}
      <div className="px-5 space-y-2">
        {menuItems.map((item, i) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="w-full flex items-center gap-3 rounded-xl bg-card border border-border p-4 touch-target text-left"
          >
            <item.icon size={20} className="text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{item.label}</p>
              {item.value && <p className="text-xs text-muted-foreground">{item.value}</p>}
            </div>
            <ChevronRight size={16} className="text-muted-foreground" />
          </motion.button>
        ))}
      </div>

      {/* Manager view link */}
      <div className="px-5 mt-6">
        <button
          onClick={() => navigate("/manager")}
          className="w-full flex items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary/10 p-4 touch-target"
        >
          <Shield size={18} className="text-primary" />
          <span className="text-sm font-semibold text-primary">Halaman Manager</span>
        </button>
      </div>

      {/* Logout */}
      <div className="px-5 mt-4">
        <button
          onClick={() => navigate("/")}
          className="w-full flex items-center justify-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-4 touch-target"
        >
          <LogOut size={18} className="text-destructive" />
          <span className="text-sm font-semibold text-destructive">Keluar</span>
        </button>
      </div>
    </div>
  );
}
