import { motion } from "framer-motion";
import { ArrowLeft, Bell, Calendar, Wallet, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { notifications } from "@/data/mockData";

const typeIcons: Record<string, typeof Bell> = {
  shift: Calendar,
  leave: Calendar,
  payroll: Wallet,
  system: AlertCircle,
};

const typeColors: Record<string, string> = {
  shift: "bg-info/15 text-info",
  leave: "bg-success/15 text-success",
  payroll: "bg-primary/15 text-primary",
  system: "bg-warning/15 text-warning",
};

export default function NotificationsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background safe-bottom">
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/home")} className="touch-target flex items-center justify-center rounded-xl bg-card border border-border h-10 w-10">
            <ArrowLeft size={18} className="text-foreground" />
          </button>
          <h1 className="text-xl font-bold text-foreground">Notifikasi</h1>
        </div>
      </div>

      <div className="px-5 space-y-3">
        {notifications.map((notif, i) => {
          const Icon = typeIcons[notif.type] || Bell;
          return (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-xl bg-card border p-4 ${notif.read ? "border-border" : "border-primary/30"}`}
            >
              <div className="flex gap-3">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${typeColors[notif.type]}`}>
                  <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">{notif.title}</p>
                    {!notif.read && <div className="h-2 w-2 rounded-full bg-primary shrink-0" />}
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">{notif.body}</p>
                  <p className="mt-1 text-[10px] text-muted-foreground">{notif.time}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
