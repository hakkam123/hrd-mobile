import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AttendanceItem } from "@/components/AttendanceItem";
import { attendanceHistory } from "@/data/mockData";

export default function AttendancePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background safe-bottom">
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/home")} className="touch-target flex items-center justify-center rounded-xl bg-card border border-border h-10 w-10">
            <ArrowLeft size={18} className="text-foreground" />
          </button>
          <h1 className="text-xl font-bold text-foreground">Riwayat Presensi</h1>
        </div>
      </div>

      <div className="px-5">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          {attendanceHistory.map((record, i) => (
            <motion.div key={record.date} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <AttendanceItem record={record} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
