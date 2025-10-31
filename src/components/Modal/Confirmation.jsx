import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { appContext } from "../../context/app-context";

export default function Confirmation({
  heading,
  confirmationObject,
  onConfirm,
  onCancel = "default",
  preText = null,
}) {
  const { closeModal } = useContext(appContext);

  return (
    <>
      <div className="relative">
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-300 shadow-md z-50"
        >
          <FontAwesomeIcon className="text-sm text-white" icon={faX} />
        </button>

        {/* Content */}
        <div className="pt-2">
          <h2 className="text-lg mb-3 font-bold text-gray-800">{heading}</h2>
          <p className="mb-3 text-gray-600 text-sm">{preText}</p>

          <div className="bg-emerald-50/50 rounded-xl p-4 mb-6 text-center border border-emerald-200">
            {confirmationObject.element}
          </div>

          <div className="flex gap-2">
            {onCancel && (
              <button
                type="button"
                className="cursor-pointer px-4 flex-1 font-bold py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all duration-300 hover:shadow-md"
                onClick={() => {
                  onCancel !== "default" && onCancel();
                  closeModal();
                }}
              >
                {confirmationObject.cancelText}
              </button>
            )}
            <button
              type="submit"
              className="cursor-pointer px-4 flex-1 font-bold py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105"
              onClick={() => {
                onConfirm();
                closeModal();
              }}
            >
              {confirmationObject.confirmText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
