import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({ open, title, description, confirmLabel, onConfirm, onCancel }: ConfirmModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-background/60 backdrop-blur-sm p-4"
          onClick={onCancel}
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="w-full max-w-sm rounded-2xl bg-card border border-border p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">{title}</h3>
              <button onClick={onCancel} className="touch-target flex items-center justify-center rounded-full hover:bg-secondary">
                <X size={20} className="text-muted-foreground" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground mb-6">{description}</p>
            <div className="flex gap-3">
              <button
                onClick={onCancel}
                className="flex-1 touch-target rounded-xl bg-secondary text-secondary-foreground font-medium text-sm"
              >
                Batal
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 touch-target rounded-xl gradient-primary text-primary-foreground font-medium text-sm"
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function SuccessModal({ open, message, onClose }: { open: boolean; message: string; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/60 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="flex flex-col items-center rounded-2xl bg-card border border-border p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-success/20 mb-4"
            >
              <svg className="h-10 w-10 text-success animate-check-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <p className="text-lg font-semibold text-foreground text-center">{message}</p>
            <button
              onClick={onClose}
              className="mt-6 touch-target rounded-xl bg-secondary px-8 text-sm font-medium text-secondary-foreground"
            >
              OK
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
