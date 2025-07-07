import * as React from "react";
import { cn } from "@/lib/utils";

// Create a context for the toast
type ToastContextType = {
  showToast: (message: string, variant?: "default" | "destructive") => void;
  toast: {
    success: (title: string, description?: string) => void;
    error: (title: string, description?: string) => void;
  };
};

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Array<{ id: string; message: string; variant?: "default" | "destructive" }>>([]);

  const showToast = React.useCallback((message: string, variant: "default" | "destructive" = "default") => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((currentToasts) => [...currentToasts, { id, message, variant }]);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
    }, 5000);
  }, []);

  const toast = React.useMemo(() => ({
    success: (title: string, description?: string) => {
      showToast(description ? `${title}: ${description}` : title, 'default');
    },
    error: (title: string, description?: string) => {
      showToast(description ? `${title}: ${description}` : title, 'destructive');
    }
  }), [showToast]);

  const removeToast = (id: string) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast, toast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "flex items-center justify-between p-4 rounded-md shadow-lg",
              toast.variant === "destructive"
                ? "bg-red-100 border-red-200 text-red-800"
                : "bg-white border border-gray-200"
            )}
          >
            <span>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  show?: boolean;
  onClose?: () => void;
  variant?: "default" | "destructive";
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, children, show = true, onClose, variant = "default", ...props }, ref) => {
    if (!show) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "fixed top-4 right-4 z-50 w-full max-w-sm rounded-lg border p-4 shadow-lg",
          variant === "destructive"
            ? "bg-red-100 border-red-200 text-red-800"
            : "bg-white border-gray-200",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between">
          <div>{children}</div>
          {onClose && (
            <button
              onClick={onClose}
              className="ml-4 text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    );
  }
);

Toast.displayName = "Toast";

export { Toast };

export function useToast() {
  const context = React.useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
