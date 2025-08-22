"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import Alert from "../components/Common/Alert";

// Alert Types
type AlertType = "success" | "error" | "info";

interface AlertState {
  visible: boolean;
  message: string;
  type: AlertType;
  progress: number;
}

interface AlertContextProps {
  showAlert: (type: AlertType, message: string, duration?: number) => void;
}

// Context
const AlertContext = createContext<AlertContextProps | undefined>(undefined);

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const [alert, setAlert] = useState<AlertState>({
    visible: false,
    message: "",
    type: "info",
    progress: 100,
  });

  const showAlert = (type: AlertType, message: string, duration = 3000) => {
    setAlert({ visible: true, type, message, progress: 100 });

    let interval: NodeJS.Timeout;
    const step = 100 / (duration / 50);

    interval = setInterval(() => {
      setAlert((prev) => {
        if (prev.progress <= 0) {
          clearInterval(interval);
          return { ...prev, visible: false };
        }
        return { ...prev, progress: prev.progress - step };
      });
    }, 50);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert.visible && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500">
          <Alert
            type={alert.type}
            message={alert.message}
            progress={alert.progress}
            onClose={() =>
              setAlert({
                visible: false,
                message: "",
                type: "info",
                progress: 0,
              })
            }
          />
        </div>
      )}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
