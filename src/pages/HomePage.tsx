import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, QrCode, TrendingUp, Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CheckInButton } from "@/components/CheckInButton";
import { ShiftCard } from "@/components/ShiftCard";
import { ConfirmModal, SuccessModal } from "@/components/Modals";
import { currentUser, todayShift, weeklyStats, notifications } from "@/data/mockData";

export default function HomePage() {
  const [checkState, setCheckState] = useState<"ready" | "checked-in" | "checked-out">("ready");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const unread = notifications.filter((n) => !n.read).length;
  const now = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

  const handleCheckIn = () => setShowConfirm(true);

  const confirmAction = () => {
    setShowConfirm(false);
    if (checkState === "ready") {
      setCheckState("checked-in");
      setSuccessMsg(`Presensi masuk berhasil — ${now}`);
    } else {
      setCheckState("checked-out");
      setSuccessMsg(`Presensi keluar berhasil — ${now}`);
    }
    setShowSuccess(true);
  };

  const fadeUp = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-background safe-bottom">
      {/* Header */}
      <motion.div {...fadeUp} className="px-5 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Selamat datang,</p>
            <h1 className="text-xl font-bold text-foreground">{currentUser.name} 👋</h1>
          </div>
          <button
            onClick={() => navigate("/notifications")}
            className="relative touch-target flex items-center justify-center rounded-xl bg-card border border-border h-11 w-11"
            aria-label="Notifikasi"
          >
            <Bell size={20} className="text-foreground" />
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {unread}
              </span>
            )}
          </button>
        </div>
      </motion.div>

      {/* Today's Shift */}
      <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="px-5 mb-5">
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">Shift Hari Ini</h2>
        <ShiftCard shift={todayShift} />
      </motion.div>

      {/* Check-in CTA */}
      <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="flex flex-col items-center py-6">
        <CheckInButton state={checkState} onPress={handleCheckIn} />
        <div className="mt-3 flex items-center gap-4">
          <button
            onClick={() => {/* QR scan */}}
            className="flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-2 text-xs font-medium text-secondary-foreground touch-target"
          >
            <QrCode size={14} /> Scan QR
          </button>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div {...fadeUp} transition={{ delay: 0.3 }} className="px-5 mb-6">
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">Statistik Minggu Ini</h2>
        <div className="grid grid-cols-2 gap-3">
          <StatCard icon={<Clock size={18} className="text-info" />} label="Jam Kerja" value={`${weeklyStats.hoursWorked}/${weeklyStats.hoursTarget}h`} />
          <StatCard icon={<Calendar size={18} className="text-primary" />} label="Shift Selesai" value={`${weeklyStats.shiftsCompleted} shift`} />
          <StatCard icon={<TrendingUp size={18} className="text-success" />} label="Ketepatan" value={`${weeklyStats.onTimePercentage}%`} />
          <StatCard icon={<Calendar size={18} className="text-warning" />} label="Sisa Cuti" value={`${currentUser.leaveQuota - currentUser.leaveUsed} hari`} />
        </div>
      </motion.div>

      <ConfirmModal
        open={showConfirm}
        title={checkState === "ready" ? "Konfirmasi Check In" : "Konfirmasi Check Out"}
        description={checkState === "ready" ? "Anda akan melakukan presensi masuk. Lanjutkan?" : "Anda akan melakukan presensi keluar. Lanjutkan?"}
        confirmLabel={checkState === "ready" ? "Check In" : "Check Out"}
        onConfirm={confirmAction}
        onCancel={() => setShowConfirm(false)}
      />
      <SuccessModal open={showSuccess} message={successMsg} onClose={() => setShowSuccess(false)} />
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="gradient-card rounded-xl border border-border p-3">
      <div className="mb-2">{icon}</div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-lg font-bold text-foreground">{value}</p>
    </div>
  );
}
