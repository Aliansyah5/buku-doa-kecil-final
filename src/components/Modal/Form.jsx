import { useRef, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { appContext } from "../../context/app-context";

export default function Form({
  heading,
  preText,
  inputObject,
  additionalButton = [],
}) {
  const inputRef = useRef();
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
          <p className="mb-4 text-gray-600 text-sm">{preText}</p>

          <input
            type="text"
            placeholder={inputObject.placeholder}
            className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl mb-4 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all duration-300 text-gray-800"
            ref={inputRef}
            defaultValue={inputObject.defaultValue || ""}
          />

          <div className="flex gap-2">
            {additionalButton.map((button, index) => (
              <button
                key={index}
                type="button"
                className={`cursor-pointer px-4 flex-1 font-bold py-3 rounded-xl transition-all duration-300 hover:shadow-md ${button.className}`}
                onClick={button.onClick}
              >
                {button.label}
              </button>
            ))}
            <button
              type="submit"
              className="cursor-pointer px-6 flex-1 font-bold py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
              onClick={() => {
                inputObject.onSubmit(inputRef.current.value);
                closeModal();
              }}
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
