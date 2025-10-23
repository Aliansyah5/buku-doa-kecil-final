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
      className="modal bg-white/95 backdrop-blur-lg rounded-3xl p-6 fixed top-1/8 mx-auto shadow-2xl border border-emerald-100 max-w-md w-full"
      ref={modalRef}
    >
      <div className="relative">
        {/* Islamic corner decorations */}
        <div className="absolute -top-4 -left-4 opacity-30">
          <div className="w-4 h-4 border-l-2 border-t-2 border-emerald-400 rounded-tl-2xl"></div>
        </div>
        <div className="absolute -top-4 -right-4 opacity-30">
          <div className="w-4 h-4 border-r-2 border-t-2 border-emerald-400 rounded-tr-2xl"></div>
        </div>

        {children}

        {/* Bottom decorative line */}
        <div className="flex items-center justify-center mt-4">
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-emerald-300 to-transparent"></div>
        </div>
      </div>
    </dialog>,
    document.getElementById("modal")
  );
}
