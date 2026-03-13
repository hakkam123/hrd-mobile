export interface Employee {
  id: string;
  name: string;
  role: string;
  outlet: string;
  phone: string;
  leaveQuota: number;
  leaveUsed: number;
  photo: string;
}

export interface Shift {
  shiftId: string;
  outlet: string;
  start: string;
  end: string;
  status: "on-shift" | "upcoming" | "completed" | "missed";
  role: string;
}

export interface AttendanceRecord {
  date: string;
  checkIn: string;
  checkOut: string | null;
  late: number;
  method: "gps" | "qr" | "manual";
}

export interface LeaveRequest {
  id: string;
  type: "Sick" | "Personal" | "Emergency";
  typeId: "sakit" | "pribadi" | "darurat";
  from: string;
  to: string;
  status: "pending" | "approved" | "rejected";
  reason: string;
  attachment?: string;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  type: "shift" | "leave" | "payroll" | "system";
}

export const currentUser: Employee = {
  id: "E001",
  name: "Sinta Dewi",
  role: "Waiter",
  outlet: "Central Kitchen",
  phone: "+628123456789",
  leaveQuota: 12,
  leaveUsed: 3,
  photo: "",
};

export const todayShift: Shift = {
  shiftId: "S100",
  outlet: "Central Kitchen",
  start: "2026-03-16T07:00:00+07:00",
  end: "2026-03-16T15:00:00+07:00",
  status: "upcoming",
  role: "Waiter",
};

export const attendanceHistory: AttendanceRecord[] = [
  { date: "2026-03-15", checkIn: "07:02", checkOut: "15:03", late: 2, method: "gps" },
  { date: "2026-03-14", checkIn: "07:00", checkOut: "15:00", late: 0, method: "qr" },
  { date: "2026-03-13", checkIn: "06:58", checkOut: "15:01", late: 0, method: "gps" },
  { date: "2026-03-12", checkIn: "07:05", checkOut: "15:00", late: 5, method: "manual" },
  { date: "2026-03-11", checkIn: "07:00", checkOut: "15:02", late: 0, method: "gps" },
  { date: "2026-03-10", checkIn: "07:00", checkOut: "15:00", late: 0, method: "qr" },
  { date: "2026-03-09", checkIn: "07:02", checkOut: "15:03", late: 2, method: "gps" },
];

export const leaveRequests: LeaveRequest[] = [
  { id: "L001", type: "Sick", typeId: "sakit", from: "2026-03-20", to: "2026-03-21", status: "pending", reason: "Demam tinggi" },
  { id: "L002", type: "Personal", typeId: "pribadi", from: "2026-03-05", to: "2026-03-05", status: "approved", reason: "Acara keluarga" },
  { id: "L003", type: "Emergency", typeId: "darurat", from: "2026-02-15", to: "2026-02-16", status: "rejected", reason: "Urusan mendadak" },
];

export const notifications: Notification[] = [
  { id: "N001", title: "Shift Berubah", body: "Shift Anda tanggal 18 Mar berubah menjadi 08:00–16:00", time: "2 jam lalu", read: false, type: "shift" },
  { id: "N002", title: "Cuti Disetujui", body: "Permohonan cuti tanggal 5 Mar telah disetujui", time: "1 hari lalu", read: false, type: "leave" },
  { id: "N003", title: "Slip Gaji Tersedia", body: "Slip gaji bulan Februari sudah tersedia", time: "3 hari lalu", read: true, type: "payroll" },
  { id: "N004", title: "Pengumuman", body: "Meeting bulanan akan diadakan Senin, 17 Mar pukul 09:00", time: "5 hari lalu", read: true, type: "system" },
];

export const weeklyStats = {
  hoursWorked: 32,
  hoursTarget: 40,
  shiftsCompleted: 4,
  shiftsRemaining: 1,
  lateCount: 1,
  onTimePercentage: 96,
};
