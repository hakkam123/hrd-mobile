import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { leaveRequests } from "@/data/mockData";
import { toast } from "sonner";

interface PendingItem {
  id: string;
  employee: string;
  type: string;
  from: string;
  to: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
}

const pendingApprovals: PendingItem[] = [
  { id: "L001", employee: "Sinta Dewi", type: "Sakit", from: "2026-03-20", to: "2026-03-21", reason: "Demam tinggi", status: "pending" },
  { id: "L004", employee: "Budi Santoso", type: "Pribadi", from: "2026-03-22", to: "2026-03-22", reason: "Acara wisuda", status: "pending" },
  { id: "L005", employee: "Rina Aulia", type: "Darurat", from: "2026-03-19", to: "2026-03-20", reason: "Keluarga sakit", status: "pending" },
];

export default function ManagerPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState(pendingApprovals);

  const handleAction = (id: string, action: "approved" | "rejected") => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, status: action } : item)));
    const label = action === "approved" ? "Disetujui" : "Ditolak";
    toast(label, {
      description: `Permohonan ${id} telah ${label.toLowerCase()}`,
      action: {
        label: "Undo",
        onClick: () => setItems((prev) => prev.map((item) => (item.id === id ? { ...item, status: "pending" } : item))),
      },
    });
  };

  return (
    <div className="min-h-screen bg-background safe-bottom">
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/profile")} className="touch-target flex items-center justify-center rounded-xl bg-card border border-border h-10 w-10">
            <ArrowLeft size={18} className="text-foreground" />
          </button>
          <h1 className="text-xl font-bold text-foreground">Persetujuan</h1>
        </div>
      </div>

      <div className="px-5 space-y-3">
        {items.map((item, i) => {
          const fromDate = new Date(item.from).toLocaleDateString("id-ID", { day: "numeric", month: "short" });
          const toDate = new Date(item.to).toLocaleDateString("id-ID", { day: "numeric", month: "short" });
          const dateRange = item.from === item.to ? fromDate : `${fromDate} — ${toDate}`;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl bg-card border border-border p-4"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.employee}</p>
                  <span className="inline-block mt-1 rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                    {item.type}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">{dateRange}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{item.reason}</p>

              {item.status === "pending" ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAction(item.id, "rejected")}
                    className="flex-1 touch-target flex items-center justify-center gap-1 rounded-xl border border-destructive/30 bg-destructive/10 text-destructive text-sm font-medium"
                  >
                    <X size={16} /> Tolak
                  </button>
                  <button
                    onClick={() => handleAction(item.id, "approved")}
                    className="flex-1 touch-target flex items-center justify-center gap-1 rounded-xl bg-success text-success-foreground text-sm font-medium"
                  >
                    <Check size={16} /> Setujui
                  </button>
                </div>
              ) : (
                <div className={`text-center text-sm font-medium rounded-xl py-2 ${item.status === "approved" ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`}>
                  {item.status === "approved" ? "✓ Disetujui" : "✕ Ditolak"}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
