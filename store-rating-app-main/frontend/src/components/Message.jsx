import React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

function Message({ message, onClose }) {
  if (!message) {
    return null;
  }

  const isSuccess =
    message.toLowerCase().includes("success") ||
    message.toLowerCase().includes("submitted") ||
    message.toLowerCase().includes("created");
  const isError =
    message.toLowerCase().includes("fail") ||
    message.toLowerCase().includes("error") ||
    message.toLowerCase().includes("unable") ||
    message.toLowerCase().includes("invalid");

  const toastType = isSuccess
    ? "toast-success"
    : isError
    ? "toast-error"
    : "toast-info";

  return (
    <div className="toast-container">
      <div className={`message-toast ${toastType}`}>
        <div className="toast-content">
          {isSuccess && <CheckCircle2 size={20} />}
          {isError && <AlertCircle size={20} />}
          {!isSuccess && !isError && <Info size={20} />}
          <span>{message}</span>
        </div>

        {onClose && (
          <button
            className="toast-close"
            onClick={onClose}
            aria-label="Close notification"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

export default Message;