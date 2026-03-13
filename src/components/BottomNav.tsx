import { NavLink, useLocation } from "react-router-dom";
import { Home, Clock, CalendarDays, Bell, User } from "lucide-react";
import { notifications } from "@/data/mockData";

const navItems = [
  { to: "/home", icon: Home, label: "Beranda" },
  { to: "/attendance", icon: Clock, label: "Presensi" },
  { to: "/leave", icon: CalendarDays, label: "Cuti" },
  { to: "/notifications", icon: Bell, label: "Notifikasi" },
  { to: "/profile", icon: User, label: "Profil" },
];

export function BottomNav() {
  const location = useLocation();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-lg">
      <div className="mx-auto flex max-w-md items-center justify-around px-2 pb-[env(safe-area-inset-bottom)]">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className="relative flex flex-col items-center gap-0.5 py-2 px-3 touch-target"
            >
              <div className={`relative p-1 rounded-xl transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                <item.icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
                {item.label === "Notifikasi" && unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {unreadCount}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
