import React, { useState } from 'react';

const Modal = ({ title ='Modal', isOpen, onClose, children }) => {
  const handleClose = () => {
    onClose && onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-30">
          <div className="fixed inset-0 bg-gray-900 opacity-50" onClick={handleClose}></div>
          <div className="bg-slate-50 p-4 rounded shadow-lg w-full flex-grow max-w-lg z-50 m-4 h-3/4">
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
            <div className="w-full h-[90%]  overflow-scroll m-2 px-2 py-7 hidden-scrollbar">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
