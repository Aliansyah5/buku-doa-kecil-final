import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function ModalDialog({
  children,
  open,
  onClose,
  autoClose = false,
}) {
  const modalRef = useRef();

  useEffect(() => {
    const modalElement = modalRef.current;
    open && modalElement.showModal();
    let timeout = null;

    if (autoClose) {
      timeout = setTimeout(() => {
        onClose();
      }, 2500);
    }

    return () => {
      clearTimeout(timeout);
      modalElement?.close();
    };
  }, [open, autoClose, onClose]);

  return createPortal(
    <dialog
      onClose={onClose}
      className="modal bg-white/95 backdrop-blur-lg rounded-3xl overflow-hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl border border-emerald-100 max-w-md w-[90%] p-0"
      ref={modalRef}
    >
      <div className="relative">
        {/* Gradient header */}
        <div className="bg-gradient-to-r from-emerald-500 to-green-500 px-6 py-4">
          <div className="flex items-center justify-center h-8">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-white/70 rounded-full animate-pulse delay-100"></div>
              <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse delay-200"></div>
            </div>
          </div>
        </div>

        {/* Modal content with padding */}
        <div className="p-6">{children}</div>

        {/* Bottom decorative line */}
        <div className="flex items-center justify-center pb-4">
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-emerald-300 to-transparent"></div>
        </div>

        {/* Islamic corner decorations */}
        <div className="absolute top-12 left-3 opacity-20 pointer-events-none">
          <div className="w-3 h-3 border-l-2 border-t-2 border-emerald-200 rounded-tl-xl"></div>
        </div>
        <div className="absolute top-12 right-3 opacity-20 pointer-events-none">
          <div className="w-3 h-3 border-r-2 border-t-2 border-emerald-200 rounded-tr-xl"></div>
        </div>
      </div>
    </dialog>,
    document.getElementById("modal")
  );
}
