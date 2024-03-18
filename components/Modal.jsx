import React, { useState } from 'react';

const Modal = ({ title ='Modal', isOpen, onClose, children }) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  const handleClose = () => {
    setIsVisible(false);
    onClose && onClose();
  };

  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-30">
          <div className="fixed inset-0 bg-gray-900 opacity-50" onClick={handleClose}></div>
          <div className="bg-white p-4 rounded shadow-lg w-full flex-grow max-w-md z-50 m-4 h-2/3">
            <div className="flex justify-between items-center ">
              <h2 className="text-lg font-semibold">{title}</h2>
              <button className="text-gray-500 hover:text-gray-700" onClick={handleClose}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="w-full h-full box-border overflow-hidden px-2 py-7">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
