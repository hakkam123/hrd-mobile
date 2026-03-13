import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LeaveCard } from "@/components/LeaveCard";
import { leaveRequests, currentUser } from "@/data/mockData";
import type { LeaveRequest } from "@/data/mockData";
import { SuccessModal } from "@/components/Modals";

export default function LeavePage() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [requests, setRequests] = useState<LeaveRequest[]>(leaveRequests);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    type: "Sick" as LeaveRequest["type"],
    from: "",
    to: "",
    reason: "",
  });

  const remaining = currentUser.leaveQuota - currentUser.leaveUsed;

  const handleSubmit = () => {
    const newReq: LeaveRequest = {
      id: `L${Date.now()}`,
      type: formData.type,
      typeId: formData.type === "Sick" ? "sakit" : formData.type === "Personal" ? "pribadi" : "darurat",
      from: formData.from,
      to: formData.to || formData.from,
      status: "pending",
      reason: formData.reason,
    };
    setRequests([newReq, ...requests]);
    setShowForm(false);
    setFormData({ type: "Sick", from: "", to: "", reason: "" });
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen bg-background safe-bottom">
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/home")} className="touch-target flex items-center justify-center rounded-xl bg-card border border-border h-10 w-10">
              <ArrowLeft size={18} className="text-foreground" />
            </button>
            <h1 className="text-xl font-bold text-foreground">Cuti & Izin</h1>
          </div>
          <div className="rounded-lg bg-primary/15 px-3 py-1.5">
            <span className="text-xs font-semibold text-primary">Sisa: {remaining} hari</span>
          </div>
        </div>
      </div>

      {/* New request button */}
      <div className="px-5 mb-4">
        <button
          onClick={() => setShowForm(true)}
          className="w-full touch-target flex items-center justify-center gap-2 rounded-xl gradient-primary text-primary-foreground font-semibold text-sm"
        >
          <Plus size={18} /> Ajukan Cuti / Izin
        </button>
      </div>

      {/* Request list */}
      <div className="px-5 space-y-3">
        {requests.map((req, i) => (
          <motion.div key={req.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <LeaveCard request={req} />
          </motion.div>
        ))}
      </div>

      {/* Form modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end justify-center bg-background/60 backdrop-blur-sm"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-md rounded-t-2xl bg-card border-t border-border p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border" />
              <h3 className="text-lg font-semibold text-foreground mb-4">Formulir Pengajuan</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Jenis</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as LeaveRequest["type"] })}
                    className="w-full touch-target rounded-xl border border-border bg-secondary px-3 text-foreground text-sm"
                  >
                    <option value="Sick">Sakit</option>
                    <option value="Personal">Pribadi</option>
                    <option value="Emergency">Darurat</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Dari</label>
                    <input
                      type="date"
                      value={formData.from}
                      onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                      className="w-full touch-target rounded-xl border border-border bg-secondary px-3 text-foreground text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Sampai</label>
                    <input
                      type="date"
                      value={formData.to}
                      onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                      className="w-full touch-target rounded-xl border border-border bg-secondary px-3 text-foreground text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Alasan</label>
                  <textarea
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    placeholder="Jelaskan alasan Anda..."
                    className="w-full rounded-xl border border-border bg-secondary px-3 py-3 text-foreground text-sm placeholder:text-muted-foreground resize-none h-20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Lampiran (opsional)</label>
                  <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-border bg-secondary/50 p-4 cursor-pointer">
                    <span className="text-xs text-muted-foreground">Ketuk untuk mengunggah foto</span>
                  </div>
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={!formData.from || !formData.reason}
                  className="w-full touch-target rounded-xl gradient-primary text-primary-foreground font-semibold text-sm disabled:opacity-40"
                >
                  Ajukan
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SuccessModal open={showSuccess} message="Pengajuan cuti berhasil dikirim" onClose={() => setShowSuccess(false)} />
    </div>
  );
}
