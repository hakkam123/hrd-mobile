import { Clock, AlertTriangle } from "lucide-react";
import type { AttendanceRecord } from "@/data/mockData";

const methodIcons: Record<string, string> = {
  gps: "📍",
  qr: "📱",
  manual: "✏️",
};

export function AttendanceItem({ record }: { record: AttendanceRecord }) {
  const dateStr = new Date(record.date).toLocaleDateString("id-ID", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return (
    <div className="flex items-center gap-3 rounded-xl bg-card p-3 border border-border">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-lg">
        {methodIcons[record.method]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{dateStr}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <Clock size={12} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            {record.checkIn} — {record.checkOut ?? "—"}
          </span>
        </div>
      </div>
      {record.late > 0 && (
        <div className="flex items-center gap-1 rounded-full bg-warning/15 px-2.5 py-1">
          <AlertTriangle size={12} className="text-warning" />
          <span className="text-xs font-medium text-warning">+{record.late}m</span>
        </div>
      )}
    </div>
  );
}
