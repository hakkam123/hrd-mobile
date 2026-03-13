import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = () => {
    if (phone.length >= 10) setStep("otp");
  };

  const handleVerify = () => {
    if (otp.join("").length === 4) navigate("/home");
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background px-6 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        {/* Logo area */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary">
            <span className="text-2xl font-extrabold text-primary-foreground">HR</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Lovable HRD</h1>
          <p className="mt-1 text-sm text-muted-foreground">Portal Karyawan</p>
        </div>

        {step === "phone" ? (
          <motion.div key="phone" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
            <label className="mb-2 block text-sm font-medium text-foreground">Nomor Handphone</label>
            <div className="flex items-center gap-2 rounded-xl border border-border bg-card p-1">
              <span className="pl-3 text-sm text-muted-foreground">+62</span>
              <input
                type="tel"
                placeholder="812 3456 7890"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                className="flex-1 touch-target bg-transparent px-2 text-foreground placeholder:text-muted-foreground outline-none text-base"
                autoFocus
              />
            </div>

            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={() => setRemember(!remember)}
                className={`h-5 w-5 rounded border-2 transition-colors ${remember ? "border-primary bg-primary" : "border-border bg-card"}`}
                aria-label="Remember device"
              >
                {remember && (
                  <svg className="h-full w-full text-primary-foreground p-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
              <span className="text-sm text-muted-foreground">Ingat perangkat ini</span>
            </div>

            <button
              onClick={handleSendOTP}
              disabled={phone.length < 10}
              className="mt-6 w-full touch-target rounded-xl gradient-primary text-primary-foreground font-semibold text-base disabled:opacity-40 transition-opacity"
            >
              Kirim OTP
            </button>
          </motion.div>
        ) : (
          <motion.div key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <button onClick={() => setStep("phone")} className="mb-4 flex items-center gap-1 text-sm text-muted-foreground touch-target">
              <ArrowLeft size={16} /> Kembali
            </button>
            <p className="mb-1 text-sm text-muted-foreground">Kode OTP dikirim ke</p>
            <p className="mb-6 text-sm font-medium text-foreground">+62{phone}</p>
            <div className="flex justify-center gap-3 mb-6">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  className="h-14 w-14 rounded-xl border-2 border-border bg-card text-center text-2xl font-bold text-foreground outline-none focus:border-primary transition-colors"
                  autoFocus={i === 0}
                />
              ))}
            </div>
            <button
              onClick={handleVerify}
              disabled={otp.join("").length < 4}
              className="w-full touch-target rounded-xl gradient-primary text-primary-foreground font-semibold text-base disabled:opacity-40 transition-opacity"
            >
              Verifikasi
            </button>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Tidak menerima kode? <button className="text-primary font-medium">Kirim ulang</button>
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
