import { motion } from "framer-motion";
import { LogIn, LogOut, Check } from "lucide-react";

interface CheckInButtonProps {
  state: "ready" | "checked-in" | "checked-out" | "disabled";
  onPress: () => void;
  disabledReason?: string;
}

export function CheckInButton({ state, onPress, disabledReason }: CheckInButtonProps) {
  const configs = {
    ready: {
      label: "Masuk Kerja",
      sublabel: "Check In",
      icon: LogIn,
      classes: "gradient-primary shadow-[0_0_30px_hsl(18,72%,52%,0.4)]",
    },
    "checked-in": {
      label: "Keluar Kerja",
      sublabel: "Check Out",
      icon: LogOut,
      classes: "bg-secondary shadow-lg",
    },
    "checked-out": {
      label: "Selesai",
      sublabel: "Completed",
      icon: Check,
      classes: "bg-success/20 border-2 border-success",
    },
    disabled: {
      label: "Tidak Tersedia",
      sublabel: "Unavailable",
      icon: LogIn,
      classes: "bg-muted opacity-50",
    },
  };

  const config = configs[state];
  const Icon = config.icon;
  const isDisabled = state === "disabled" || state === "checked-out";

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        {state === "ready" && (
          <>
            <div className="absolute inset-0 rounded-full gradient-primary animate-pulse-ring" />
            <div className="absolute inset-0 rounded-full gradient-primary animate-pulse-ring [animation-delay:0.5s]" />
          </>
        )}
        <motion.button
          whileTap={isDisabled ? {} : { scale: 0.92 }}
          whileHover={isDisabled ? {} : { scale: 1.05 }}
          onClick={isDisabled ? undefined : onPress}
          disabled={isDisabled}
          className={`relative z-10 flex h-28 w-28 flex-col items-center justify-center rounded-full transition-all ${config.classes}`}
          aria-label={config.label}
        >
          <Icon size={32} className={state === "checked-out" ? "text-success" : "text-primary-foreground"} />
          <span className={`mt-1 text-sm font-bold ${state === "checked-out" ? "text-success" : "text-primary-foreground"}`}>
            {config.label}
          </span>
        </motion.button>
      </div>
      {state === "disabled" && disabledReason && (
        <p className="text-xs text-muted-foreground text-center max-w-[200px]">{disabledReason}</p>
      )}
    </div>
  );
}
