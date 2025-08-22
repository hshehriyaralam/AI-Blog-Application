'use client'
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { motion } from "framer-motion";
import React, { JSX } from "react";

type AlertType = "success" | "error" | "info";

interface AlertProps {
  type?: AlertType;
  message: string;
  onClose: () => void;
  progress?: number;
}

const iconMap: Record<AlertType, JSX.Element> = {
  success: <CheckCircle className="text-green-600 w-6 h-6" />,
  error: <AlertCircle className="text-red-600 w-6 h-6" />,
  info: <Info className="text-blue-600 w-6 h-6" />,
};

const styleMap: Record<AlertType, string> = {
  success: "bg-green-100 text-green-900 border border-green-300",
  error: "bg-red-100 text-red-900 border border-red-300",
  info: "bg-blue-100 text-blue-900 border border-blue-300",
};

const barColorMap: Record<AlertType, string> = {
  success: "bg-green-600",
  error: "bg-red-600",
  info: "bg-blue-600",
};

export default function Alert({
  type = "info",
  message,
  onClose,
  progress = 100,
}: AlertProps) {
  return (
    <motion.div
      initial={{ y: -60, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: -60, opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`w-[90vw] max-w-md rounded-xl shadow-xl overflow-hidden backdrop-blur-md ${styleMap[type]}`}
    >
      {/* Header */}
      <div className="flex items-start gap-3 px-4 py-3">
        <div className="pt-1">{iconMap[type]}</div>
        <div className="flex-1 text-sm font-medium leading-relaxed">
          {message}
        </div>
        <button
          onClick={onClose}
          className="rounded-full hover:bg-black/10 p-1 transition"
        >
          <X className="w-4 h-4 mt-0.5 text-gray-600 hover:text-gray-900" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 relative bg-gray-200">
        <motion.div
          className={`${barColorMap[type]} h-full absolute top-0 left-0 rounded-r`}
          initial={{ width: "100%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.2, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
}
